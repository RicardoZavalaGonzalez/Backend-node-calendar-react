const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

// req=request (lo que la persona solicita)
// res=response (lo que el servidor contesta)
const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Busca si un usuario existe
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            // si existe regresa el error de la existencia del correo electrónico
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta en uso por otro usuario'
            });
        }
        usuario = new Usuario(req.body);
        /* Encriptar contraseña, necesita un numero para las vueltas del encriptado
        por defecto son 10 */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // Guarda el usuario
        await usuario.save();
        // Genera JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
};

const loginUsuario = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        // Confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}

const revalidarToken = async (req, res = response) => {
    const uid = req.uid;
    const name = req.name;
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        token, uid, name
    });
}

module.exports = {
    crearUsuario, loginUsuario, revalidarToken
}