module.exports = {    
    //after auth
    //mongoURI: 'mongodb://admin:dritalconnect@127.0.0.1:27017/chatman?authSource=admin&authMode=scram-sha1',//working on server
    mongoURI: 'mongodb://admin:dritalconnect@206.189.134.245/onpassive?authSource=admin',//working on local
    // mongoURI: "mongodb://" +
    // process.env.MONGO_DB_USERNAME +
    // ":" +
    // process.env.MONGO_DB_PASSWORD +
    // "@" +
    // process.env.MONGO_DB_HOST +
    // (process.env.MONGO_DB_PORT
    //   ? ":" + process.env.MONGO_DB_PORT + "/"
    //   : "/") +
    // process.env.MONGO_DB_DATABASE +
    // process.env.MONGO_DB_PARAMETERS,
    secretOrKey: process.env.SECRET_OR_KEY,
    uploadsPath: process.env.UPLOAD_PATH
  };