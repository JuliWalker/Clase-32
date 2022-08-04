import express  from "express";
import 'dotenv/config'
import morgan from "morgan";

const app = express();
const PORT = 8081

/** Middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Routes */
import info from './routes/info.js';
app.use('/info', info);


/** Server */
try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}