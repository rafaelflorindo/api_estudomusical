const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', tarefaController.adicionarTarefa);
router.patch('/:id/concluir', tarefaController.marcarConcluida);
router.delete('/:id', tarefaController.deletarTarefa);
router.put('/:id', tarefaController.atualizarTarefa);

module.exports = router;
