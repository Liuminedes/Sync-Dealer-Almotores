import { sequelize } from '../models/index.js';

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa.');
    // ¡Sin sincronizar modelos aquí!
  } catch (error) {
    console.error('❌ Error en la conexión:', error.message);
  }
};
