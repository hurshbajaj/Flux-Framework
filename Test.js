const {checkDependencies, Flux, ServerLog} = require("./Flux.js")
const express = require("express")
const fs = require("fs")
    

checkDependencies()
const serverLog = new ServerLog(9000);

serverLog.initReqLog()
    
serverLog.ackAll("get", (req, res)=>{
    serverLog.ackFlux("/routeFlux", ()=>{
        res.send("routeFlux!")
    })
    serverLog.ackFlux("/routeFlux2", ()=>{
        res.send("routeFlux!22")
    })
    serverLog.ackFlux(["/ack", "/ack2"], ()=>{
        res.send("ack!")
    })
        
})

serverLog.default((req, res)=>{ res.send("404");})


