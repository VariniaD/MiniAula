import express from 'express';
import AppError from './utils/AppError.js';
import manejarErrores from './middlewares/error.middleware.js';

const app = express();

// Puerto donde funcionará nuestro backend
const PORT = process.env.PORT || 3000;

// Permite recibir datos en formato JSON
app.use(express.json());

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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});