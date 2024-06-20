import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import purchaseRoutes from './routes/purchases.js';
import { authenticate } from './middlewares/authMiddleware.js';
import errorHandler from './middlewares/errorHandlingMiddleware.js';
import sequelize from './config/db.js';

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para analizar JSON
app.use(bodyParser.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api/products', authenticate, productRoutes);
app.use('/api/purchases', authenticate, purchaseRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Sincronizar modelos con la base de datos y luego iniciar el servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

