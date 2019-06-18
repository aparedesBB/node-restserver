//PUERTO
process.env.PORT = process.env.PORT || 3000;

//AMBIENTE
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento del TOKEN
//60s 60m 24h 30d
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticación.
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;