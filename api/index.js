import express from 'express';
import AppError from './utils/AppError.js';
import manejarErrores from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import cursoRoutes from './routes/curso.routes.js';
import inscripcionRoutes from './routes/inscripcion.routes.js';

const app = express();

// Puerto donde funcionará nuestro backend
const PORT = process.env.PORT || 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de cursos
app.use('/api/cursos', cursoRoutes);

// Rutas de inscripciones
app.use('/api/inscripciones', inscripcionRoutes);

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