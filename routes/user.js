
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { generateToken, verifyToken } = require('../auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao registrar usuário.');
    } else {
      res.status(201).send('Usuário registrado com sucesso.');
    }
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao tentar fazer login.');
    }

    if (result.length > 0) {
      console.log(result);
      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = generateToken(user);
        res.status(200).send({ auth: true, token: token });
      } else {
        res.status(401).send('Credenciais inválidas.');
      }
    } else {
      res.status(404).send('Usuário não encontrado.');
    }
  });
});

router.get('/logout', verifyToken, (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

router.get('/protected', verifyToken, (req, res) => {
  res.status(200).send('Acesso concedido.');
});

router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao excluir usuário.");
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send("ID do usuário não encontrado.");
      } else {
        res.status(200).send("Usuário excluído com sucesso.");
      }
    }
  });
});

module.exports = router;
