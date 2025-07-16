const { Tarefa, Plano } = require('../models');

exports.adicionarTarefa = async (req, res) => {
  const { planoId, descricao } = req.body;

  try {
    const plano = await Plano.findOne({ where: { id: planoId, UsuarioId: req.usuarioId } });
    if (!plano) return res.status(404).json({ erro: 'Plano não encontrado' });

    const novaTarefa = await Tarefa.create({ descricao, PlanoId: planoId });
    res.status(201).json(novaTarefa);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar tarefa', detalhes: err });
  }
};

exports.marcarConcluida = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await Tarefa.findByPk(id, {
      include: { model: Plano }
    });

    if (!tarefa || tarefa.Plano.UsuarioId !== req.usuarioId) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    tarefa.concluida = !tarefa.concluida;
    await tarefa.save();
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar tarefa', detalhes: err });
  }
};

exports.deletarTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await Tarefa.findByPk(id, {
      include: { model: Plano }
    });

    if (!tarefa || tarefa.Plano.UsuarioId !== req.usuarioId) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    await tarefa.destroy();
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir tarefa', detalhes: err });
  }
};
exports.atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { concluida, descricao } = req.body; // agora aceita 'descricao'
  const usuarioId = req.usuarioId;

  try {
    const tarefa = await Tarefa.findByPk(id, {
      include: [{ model: Plano }],
    });

    if (!tarefa || tarefa.Plano.UsuarioId !== usuarioId) {
      return res.status(404).json({ erro: 'Tarefa não encontrada ou não pertence ao usuário.' });
    }

    if (concluida !== undefined) tarefa.concluida = concluida;
    if (descricao !== undefined && descricao.trim() !== '') tarefa.descricao = descricao;

    await tarefa.save();

    return res.json(tarefa);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};
