const express = require('express');
const cors = require('cors');
const db = require('./models');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/planos', require('./routes/planoRoutes'));
app.use('/api/tarefas', require('./routes/tarefaRoutes'));



// Teste conexão com banco e sync
db.sequelize.sync().then(() => {
  console.log('Banco sincronizado com Sequelize');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch((err) => {
  console.error('Erro ao conectar com o banco:', err);
});
