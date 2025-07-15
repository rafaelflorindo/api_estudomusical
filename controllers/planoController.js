const { Plano, Tarefa } = require('../models');

exports.criarPlano = async (req, res) => {
    const { nome, diaSemana } = req.body;
  try {
    const novoPlano = await Plano.create({ nome, diaSemana, UsuarioId: req.usuarioId });
    res.status(201).json(novoPlano);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar plano', detalhes: err });
  }
};

exports.listarPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll({
      where: { UsuarioId: req.usuarioId },
      include: [{ model: Tarefa }]
    });
    res.json(planos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar planos', detalhes: err });
  }
};

exports.listarPlano = async (req, res) => {
    try {
      const plano = await Plano.findByPk(req.params.id);
      if (!plano) {
        return res.status(404).json({ erro: 'Plano não encontrado' });
      }
      return res.json(plano);
    } catch (error) {
      console.error('Erro ao buscar plano:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  };

exports.excluirPlano = async (req, res) => {
  const { id } = req.params;
  try {
    const deletado = await Plano.destroy({ where: { id, UsuarioId: req.usuarioId } });
    if (deletado) {
      res.json({ mensagem: 'Plano excluído com sucesso' });
    } else {
      res.status(404).json({ erro: 'Plano não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir plano', detalhes: err });
  }
};

exports.listarTarefas = async (req, res) => {
    const planoId = req.params.id;
  
    try {
      const plano = await Plano.findOne({
        where: { id: planoId, UsuarioId: req.usuarioId },
      });
  
      if (!plano) {
        return res.status(404).json({ erro: 'Plano não encontrado ou não pertence ao usuário.' });
      }
  
      const tarefas = await Tarefa.findAll({
        where: { planoId },
        order: [['createdAt', 'ASC']],
      });
  
      res.json(tarefas);
    } catch (err) {
      console.error('Erro ao listar tarefas:', err);
      res.status(500).json({ erro: 'Erro ao buscar tarefas', detalhes: err });
    }
  };
  
  exports.criarTarefa = async (req, res) => {
    const planoId = req.params.id;
    const { nome } = req.body;
  
    if (!nome) {
      return res.status(400).json({ erro: 'Nome da tarefa é obrigatório.' });
    }
  
    try {
      const plano = await Plano.findOne({
        where: { id: planoId, UsuarioId: req.usuarioId },
      });
  
      if (!plano) {
        return res.status(404).json({ erro: 'Plano não encontrado ou não pertence ao usuário.' });
      }
  
      const novaTarefa = await Tarefa.create({ nome, planoId });
      res.status(201).json(novaTarefa);
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
      res.status(500).json({ erro: 'Erro ao criar tarefa', detalhes: err });
    }
  };
  