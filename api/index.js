import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import AppError from './utils/AppError.js';
import manejarErrores from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import cursoRoutes from './routes/curso.routes.js';

// Cargar las variables del archivo .env de la raíz
dotenv.config({
    path: fileURLToPath(new URL('../.env', import.meta.url))
});

const app = express();

// Puerto donde funcionará nuestro backend
const PORT = process.env.PORT || 3000;

// Origen permitido para el frontend
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Cabeceras de seguridad HTTP
app.use(helmet());

// Configuración CORS restringida al origen del frontend
app.use(cors({
    origin: corsOrigin,
    credentials: true
}));

// Registro de peticiones HTTP
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Permite recibir datos en formato JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de cursos
app.use('/api/cursos', cursoRoutes);

// Ruta de prueba para verificar que funciona la API
app.get('/api/health', (req, res) => {
    res.status(200).json({
        mensaje: 'API MiniAula funcionando correctamente'
    });
});

// Manejar rutas que no existen
app.use((req, res, next) => {
    next(new AppError('Ruta no encontrada', 404));
});

// Middleware centralizado de errores
app.use(manejarErrores);

// Iniciar el servidor si se ejecuta directamente
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
}

export default app;