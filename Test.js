const {checkDependencies, Flux, ServerLog} = require("./Flux.js")
const express = require("express")
const fs = require("fs")
    

checkDependencies()
const serverLog = new ServerLog(9000);

serverLog.initReqLog()
    // Define a route using ack method
serverLog.ack("get","/", (req, res)=>{
    serverLog.showReqLog();
    res.send("Req Log Shown")
})
serverLog.ackAll("get", (req, res)=>{
    serverLog.routeFlux("/routeFlux", ()=>{
        res.send("routeFlux!")
    })
    serverLog.routeFlux("/routeFlux2", ()=>{
        res.send("routeFlux!22")
    })
    serverLog.ackFlux(["/ack", "/ack2"], ()=>{
        res.send("ack!")
    })
        
})

serverLog.default((req, res)=>{ res.send("404");})


