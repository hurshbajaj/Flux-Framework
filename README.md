# WELCOME to Flux!--- (Built over ||node, express||)

main parent class Flux* (main stream) includes several base funcs, like random enhanced, arrPad, etc.
[creating instance of main stream not required...]

~ |||RECCOMENDED TO DESTRUCTURE THE VARIOUS STREAMS WHILE IMPORTING FOR CLARITY||| ~

for more of a directed use, create instance of one of its "streams", or sub-classes, for eg/ ServerLog{...}
initialization creates an express server/ server_
reccomended to take advantage of its organised frame,

 [Example Init]
 ```Javascript
 const express = require("express")
 const {checkDependencies, ...streams to be used} = require("./Flux.js");
 checkDependencies()

 const serverLog = new ServerLog($portForServer);
 const server = serverLog.server_;`
 //All funcs ideally given to servers are now handled by the serverLog instance [---stream]

# Routing System

1, You can use ackAll(#method, handler ~ req/res),
    will take in all #method reqs, like get/post, etc...
    once inside, you can handle the individual reqs using routeFlux(#url, handler),
    incase you want to handle redirects, use ackFlux(#urlArr, handler)
    ackFlux will automatically redirect all url reqs in urlArr to urlArr[0] or the first url in it, it will then
    proceed to run the handler

2, you can also use its mroe traditional formate of routing using:- ack(#method, urlArr, handler) 
    (not ackFlux!!! Cannot be used interchangebely)... only diff in ack from ackFlux is that you have to define an
    additional method argument.
!!! do not use restricted handlers within eachother without proper outer settings/handlers, for eg. routeFlux under ackFlux , or perhaps routeFlux / ackFlux under run() or defualt. The following should give you an idea of the possible combinations,

Ack -> route/ack flux [uneeded]
AckAll -> route/Ack flux
ackFlux -> routeFlux [Not compatible]
run/default -> route / Ack flux [Not compatible]

# reqLog

1,  to use, simply run [ServerLog Instance].initReqLog() and it will handle most of the reqLog funcs it offers automatucally...
    to find a certain req, use serverLog.fetchReq(#index; default set to latest), to see complete log use 
    serverLog.showReqLog(), and many more funcs!


