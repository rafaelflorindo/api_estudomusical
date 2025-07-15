const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: hash });
    res.status(201).json({ mensagem: 'Usuário registrado', id: novoUsuario.id });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao registrar usuário', detalhes: err });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: 'Senha inválida' });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, usuario: { id: usuario.id, nome: usuario.nome } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhes: err });
  }
};
