import winston from "winston";
import dotenv from 'dotenv';
dotenv.config()

function loggerProd(){
    const loggerProd = winston.createLogger({
        transports:[
            new winston.transports.File({filename:'warn.log',level:'warn'}),
            new winston.transports.File({filename:'error.log',level:'error'})
        ]
    })
    return loggerProd
}


function loggerDev(){
    const loggerDev = winston.createLogger({
        transports:[
            new winston.transports.Console({level:'info'})
        ]
    })
    return loggerDev
}


let logger = null
if(process.env.NODE_ENV === "PROD"){
    logger = loggerProd()
} else {
    logger = loggerDev()
}

export default logger