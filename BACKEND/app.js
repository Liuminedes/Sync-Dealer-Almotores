const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => res.send('Sync Dealer API funcionando 🚗'));

// Conexión y sync
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos MySQL');
    return sequelize.sync({ alter: true }); // usar { force: true } para wipe
  })
  .then(() => {
    console.log('✅ Modelos sincronizados');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando la base de datos:', err);
  });
