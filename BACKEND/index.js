import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import roleRoutes from './routes/role.routes.js'; // 👈 Nuevo
import branchRoutes from './routes/branch.routes.js'; // 👈 Nuevo

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes); // ✅ NUEVA
app.use('/api/branches', branchRoutes); // ✅ NUEVA

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
