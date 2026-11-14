import express from 'express';

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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});