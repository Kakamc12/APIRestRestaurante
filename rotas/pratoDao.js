const express = require('express');
const router = express.Router();
const url = require('url');
const queryString = require('querystring');
const mysql = require('./mysql').pool;
const { response } = require('../app');

// http://localhost:3000/api.restaurante/prato-dao/getId?id=1
router.get('/getId', (req, res, next) => {
    const reqUrl = url.parse(req.url); // URL da requisição
    const queryParams = queryString.parse(reqUrl.query);
    const id = queryParams.id;

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error,
                response: null
            });
        }

        conn.query(
            'SELECT * FROM prato WHERE id = ?;',
            [id],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                return res.status(200).send({
                    response: resultado
                });
            }
        );
    });
});

// http://localhost:3000/api.restaurante/prato-dao/create
/*
{
    "nome": "Batata Frita",
    "categoria": "Entrada",
    "preco": "10.00"
}
{
    "nome": "Bife à Parmegiana",
    "categoria": "Prato Principal",
    "preco": "42.90"
},
{
    "nome": "Suco de Laranja",
    "categoria": "Bebida",
    "preco": "9.00"
},
{
    "nome": "Pudim de Leite",
    "categoria": "Sobremesa",
    "preco": "14.00"
},
{
    "nome": "Salmão Grelhado",
    "categoria": "Prato Principal",
    "preco": "58.00"
}
*/
router.post('/create', (req, res, next) => {
    const { nome, categoria, preco } = req.body;
    const prato = { nome, categoria, preco };

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error,
                response: null
            });
        }

        conn.query(
            'INSERT INTO prato (nome, categoria, preco) VALUES (?, ?, ?)',
            [prato.nome, prato.categoria, prato.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    response: 'Prato cadastrado com sucesso!',
                    'ID do prato cadastrado: ': resultado.insertedId
                });
            }
        );
    });
});

// http://localhost:3000/api.restaurante/prato-dao/getAll
router.get('/getAll', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error,
                response: null
            });
        }

        conn.query(
            'SELECT * FROM prato',
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                return res.status(200).send({
                    response: resultado
                });
            }
        );
    });
});

// http://localhost:3000/api.restaurante/prato-dao/update
/*
{
    "id_prato": 2,
    "nome": "Bife à Milanesa",
    "categoria": "Prato Principal",
    "preco": "35.90"
}
    
*/
router.post('/update', (req, res, next) => {
    const { id_prato, nome, categoria, preco } = req.body;
    const prato = { id_prato, nome, categoria, preco };

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error,
                response: null
            });
        }

        conn.query(
            'UPDATE prato SET nome = ?, categoria = ?, preco = ? WHERE id = ?',
            [prato.nome, prato.categoria, prato.preco, prato.id_prato],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    response: 'Prato atualizado com sucesso!',
                    'Dados do prato atualizado: ': prato
                });
            }
        );
    });
});

// http://localhost:3000/api.restaurante/prato-dao/delete
/*
{
    "id_prato": 1
}
*/
router.post('/delete', (req, res, next) => {
    const { id_prato } = req.body;
    const prato = { id_prato };

    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error,
                response: null
            });
        }

        conn.query(
            'DELETE FROM prato WHERE id = ?',
            [prato.id_prato],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    response: 'Prato deletado com sucesso!',
                    'Dados do prato excluído: ': prato
                });
            }
        );
    });
});

module.exports = router;