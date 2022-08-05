import { Router } from "express";
import compression from "compression";
import logger from "../winston/logger.js"

const router = Router();

// esto deberia esta solo en la ruta /zip pero no logro que funcione si lo pongo directamente ahi router.get('/zip',compression(), (req,res)=>
router.use(compression())

const dirActual = process.cwd()
const IDprocess = process.pid
const versionNode = process.version
const procesTitle = process.title
const sistOper = process.platform
const memory = process.memoryUsage()

const obj = { "dirActual": dirActual, "IDprocess": IDprocess, "versionNode": versionNode, "procesTitle": procesTitle, "sistOper": sistOper, "memory": memory }

router.get('/zip', (req, res) => {
    try {
        logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`)
        // repito el objeto 10.000 veces solo para checkear el efecto del "compression"
        // con 100000 repeticiones se nota que baja el size de 33.9 MB a 149 KB y el tiempo de carga pasa de 2.6 min a 1.1 min
        const objMult = JSON.stringify(obj).repeat(1000)
        res.json(objMult);
    } catch (error) {
        logger.error(error)
    }
});

router.get('/nozip', (req, res) => {
    try {
        logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`)
        const objMult = JSON.stringify(obj).repeat(1000)
        res.json(objMult);
    } catch (error) {
        logger.error(error)
    }
});

// armo una ruta /sumar para probar los loggers
router.get('/sumar', (req, res) => {
    try {
        logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`)
        const { num1, num2 } = req.query
        if (!isNAN(num1) && !isNAN(num2)) {
            logger.info("parametros ingresados son correctos")
            res.send(`La suma es: ${parseInt(num1) + parseInt(num2)}`)
        } else {
            logger.error("Parametros ingresados son incorrectos")
            res.send("Parametros ingresados son incorrectos")
        }
    } catch (error) {
        logger.error(error)
    }
});

router.get('*', (req, res) => {
    logger.warn(`La URL ${req.url} no es valida`)
    res.send("esta ruta no es valida")
});

// hago otra ruta sin el repeat para probar artillery y hacer las pruebas de rendimiento.
router.get('/artillery', (req, res) => {
    try {
        logger.info(`Un usuario ingreso a la ruta: ${req.url} con metodo GET`)
        console.log(obj)
        res.json(obj);
    } catch (error) {
        logger.error(error)
    }
});



export default router;