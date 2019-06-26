const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es requerido.']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

categoriaSchema.methods.toJSON = function() {
    let cat = this;
    let catObject = cat.toObject();
    delete catObject.password;

    return catObject;
};

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} ya está registrado.' });

module.exports = mongoose.model('Categoria', categoriaSchema);