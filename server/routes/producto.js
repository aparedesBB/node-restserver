const express = require('express');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let app = express();
const _ = require('underscore');
let Producto = require('../models/producto');
let Categoria = require('../models/categoria');

//Obtener productos.
app.get('/producto', verificaToken, (req, res) => {
    Producto.find({ disponible: true })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        });
});

//Obtener un producto en específico.
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado.'
                }
            });
        }
        res.status(201).json({
            ok: true,
            producto
        });
    });
});

//Buscar productos.
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex }).populate('categoria', 'nombre').exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos
        });
    });
});

//Crear un producto.
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto
        });
    });



});

//Actualizar un producto.
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let edProducto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    };

    Producto.findByIdAndUpdate(id, edProducto, { new: true }, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado.'
                }
            });
        }
        res.json({
            ok: true,
            producto
        });
    });
});

//Eliminar un producto.
app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado.'
                }
            });
        }
        res.json({
            ok: true,
            producto,
            message: 'Producto eliminado.'
        });
    });
});

module.exports = app;