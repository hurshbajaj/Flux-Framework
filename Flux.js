function checkDependencies(){
    if (!require.cache[require.resolve('express')]) {
        throw new Error('Flux fluctuated! "Express" required.');
    }
}

class Flux {
    static expStatus = '+++ Flux Exported';

    static fs = require('fs');

    constructor(){
        if(this.constructor === Flux){
            console.warn("To use further functionalities of Flux, resort to ---streams; Node/Express Required")
            throw new Error("Flux fluctuated! Instance cannot be made of mainstream...")
        }
    }

    static random(min, max, wholeNo = true, posNeg = 1) {
        let base = Math.random() * (max - min) + min;
        if (wholeNo) {
            base = Math.floor(base);
        }
        switch (posNeg) {
            case -1:
                base *= -1;
                break;
            case 0:
                if (Math.random() <= 0.5) {
                    base *= -1;
                }
        }

        return base;
    }

    

    static padArr(arr, targetLength,padVal_ = null, startEnd = 1) {
        try{
            if (startEnd < 0) {
                return arr.join("").padStart(targetLength, padVal_).split("");
            }
            else if (startEnd > 0) {
                return arr.join("").padEnd(targetLength, padVal_).split("");
            }
        }
        catch(err){
            throw new Error("Flux Fluctuated! ", err);
        }
        
        
    }

}

class ServerLog extends Flux{
    static serverCount = 0;

    static http = require("http");
    static express = require('express');
    static fs = require('fs')
    

    constructor(PORT = null, callback=()=>{}){
        super()

        this.reqLog = null;
        this.reqI = -1;
        this.serverCount++

        this.serverIndex = this.serverCount;

        this.server_ = ServerLog.express();
        if(PORT!=null){
            this.server_.listen(PORT, ()=>{
                console.log(`---Server Init [${PORT}]`)
                callback();
            })
            
        }

        this.baseReq = null;
    }

    listen(PORT = null, callback=()=>{}){
        this.server_.listen(PORT, ()=>{
            console.log(`---Server Init [${PORT}]`)
            callback();
        })
    }
    //server *rel

    ack(method="all", urlArr=[], handler=()=>{}){
        try{
            urlArr.forEach(url_ => {
                this.server_[method](url_, async (req, res)=>{
                    this.baseReq = req;
                    if(url_ == urlArr[0]){
                        await handler(req,res);
                    }
                    else{
                        res.redirect(urlArr[0])
                    }
                    
                })
            });
        }
        catch(err){
            throw new Error("Flux Fluctuated! ", err)
        } 
    }
    ackFlux( urlArr=[], handler=()=>{}){
        try{
            urlArr.forEach(url_ => {
                if(this.baseReq.url = url_){
                    if(url_ != urlArr[0]){
                        res.redirect(urlArr[0])
                    }
                    else{
                        handler()
                    }
                }
            })
        }
        catch(err){
            throw new Error("Flux Fluctuated! ", err)
        } 
    }

    routeFlux(url ,handler){
        try{
            if(this.baseReq.url == url){
                handler()
            }
        }catch(err){
            throw new Error("Flux Fluctuated! ", err)
        }
        
    }

    run(handler){
        this.server_.use((req, res, next)=>{
            handler(req, res)
            next()
        })
    } //app.use enhanced
    runForMethod(method, handler){
        this.server_.use((req, res, next)=>{
            this.baseReq = req;
            if(req.method == method.toUpperCase()){
                handler(req, res)
            }
            if(!res.headersSent){
                next()
            }
            
        })
    } //app.use enhanced



    default(handler){
        this.server_.use((req, res, next)=>{
            handler(req, res, next)
            
        })
    }//for eg. 404 pgs
    
    //---ReqLog

    updateReqLog(req, reqNature, rmIndex = this.reqI){
        try{
            if(reqNature > 0){
                this.reqI += 1; 
                this.reqLog.push({
                    index: this.reqI,
                    host: req.hostname,
                    ip:req.ip,
                    timeStamp_ISO: new Date(),
                    timestamp :Date.now()
                })
                

                
            }
            else if(reqNature < 0){
            
                this.reqLog=this.reqLog.filter(req=>req.index != rmIndex);
            
            }
        }catch(err){
            
            if(this.reqLog == null){
                throw new Error("---reqLog must be initialized first")
            }
            else{
                throw new Error("Flux Fluctuated! ", err)
            }
            
        }
        
    }
    showReqLog(){
        console.log(this.reqLog);
    }
    fetchLog(reqI_ = this.reqI) {
        try {
            const returnReq = this.reqLog.find(req => req.index === reqI_);
            if (!returnReq) {
                throw new Error("---Improper index requested");
            }
            return returnReq;
        } catch (err) {
            throw new Error("Flux fluctuated! " + err.message);
        }
    }
    
    eraseReqLog(){
        this.reqLog = [];
    }
    initReqLog() {
        this.reqLog = [];
        this.server_.use((req, res, next) => {
            // Record the initial request data and increment index
            this.updateReqLog(req, 1);
    
            // Capture `reqI` for this specific request
            const currentReqIndex = this.reqI;
    
            // Calculate response time once the response finishes
            res.on('finish', () => {
                const responseTime = Date.now() - this.reqLog[currentReqIndex].timestamp; // Calculate resTime
                this.reqLog[currentReqIndex].resTime = responseTime; // Directly add resTime to the reqLog entry
            });
            next();
        });
    }
    
    

    //fs/serverside calc *rel

    inFile(path, term) {
        return new Promise((resolve, reject) => {
            let words = '';
            let stream = fs.createReadStream(path, { encoding: 'utf8' });

            stream.on('data', chunk => {
                console.log(chunk);
                words += chunk;
            });
            stream.on('end', () => {
                words = words.split(" ");
                let returnVal = words.includes(term);
                resolve(returnVal);
            });
            stream.on('error', (err) => {
                reject(`Flux fluctuated! ${err}`);
            });

        });
    }
}

module.exports = {
    checkDependencies,
    Flux,
    ServerLog
};


//test section

function Test(){
    

    checkDependencies()
    const serverLog = new ServerLog(3000);

    serverLog.initReqLog()
        // Define a route using ack method
    serverLog.runForMethod("get", (req, res)=>{
        
        serverLog.ackFlux(["/", "/home", "/old-home"], ()=>{
            res.send("home!")
        })
        
    })

    serverLog.default((req, res)=>{ res.send("404");})
}

Test()