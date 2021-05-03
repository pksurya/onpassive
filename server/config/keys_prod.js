module.exports = {
    //mongoURI: 'mongodb://admin:dritalconnect@127.0.0.1:27017/farmer?authSource=admin&authMode=scram-sha1',// process.env.MONGO_URI,
    mongoURI: "mongodb://" +
    process.env.MONGO_DB_USERNAME +
    ":" +
    process.env.MONGO_DB_PASSWORD +
    "@" +
    process.env.MONGO_DB_HOST +
    (process.env.MONGO_DB_PORT
      ? ":" + process.env.MONGO_DB_PORT + "/"
      : "/") +
    process.env.MONGO_DB_DATABASE +
    process.env.MONGO_DB_PARAMETERS,
    secretOrKey: process.env.SECRET_OR_KEY,
    uploadsPath: process.env.UPLOAD_PATH
  };