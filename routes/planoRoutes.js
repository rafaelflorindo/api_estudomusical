const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', planoController.criarPlano);
router.get('/', planoController.listarPlanos);
router.delete('/:id', planoController.excluirPlano);
router.get('/:id', planoController.listarPlano);
router.get('/:id/tarefas', planoController.listarTarefas);
router.post('/:id/tarefas', planoController.criarTarefa);
router.put('/:id', planoController.atualizarPlano);

module.exports = router;


