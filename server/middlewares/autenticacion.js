const jwt = require('jsonwebtoken');

//Verificar token.
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//Verificar el rol del usuario.
let verificaAdminRole = (req, res, next) => {
    let rol = req.usuario.role;

    if (rol != 'ADMIN_ROLE') {
        return res.status(403).json({
            ok: false,
            err: {
                message: 'No puedes realizar la accción solicitada.'
            }
        });
    }
    next();
};

module.exports = {
    verificaToken,
    verificaAdminRole
};