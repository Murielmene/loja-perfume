const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5500",
    ],
  })
);

// Rota de cadastro
app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;


    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Erro ao criptografar senha' });
        
        const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
        db.query(sql, [nome, email, hash], (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            console.log(err);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro no login' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

        const user = results[0];

        bcrypt.compare(senha, user.senha, (err, match) => {
            if (err) return res.status(500).json({ error: 'Erro ao verificar senha' });
            if (!match) return res.status(401).json({ error: 'Senha incorreta' });

            res.json({ message: 'Login realizado com sucesso!' });
        });
    });
});

// Sobe servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});