import express from "express";
import 'dotenv/config'
import morgan from "morgan";
import os from "os"

/** Routes */
import info from './routes/info.js';
import cluster from "cluster";

const app = express();
const PORT = 8081
const MODO_CLUSTER = process.argv[2] === "CLUSTER"

if (MODO_CLUSTER && cluster.isMaster) {
    const cantidadCPUs = os.cpus().length
    console.log("Master")
    for (let i = 0; i < cantidadCPUs; i++) {
        cluster.fork()
    }
} else {
    /** Middlewares */
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ROUTES
    app.use('/info', info);


    /** Server */
    try {
        app.listen(PORT);
        console.log(`Server on port ${PORT}...`)
    } catch (error) {
        console.log('Error de conexión con el servidor...', error)
    }
}

