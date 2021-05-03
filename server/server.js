require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/api/auth');
const forgotpassword = require('./routes/api/forgotpassword');
const ProtectedRoutes = require('./routes/api/protected');
const Emp = require('./routes/api/emp');
const Counter = require('./routes/api/counter');
const morgan = require('morgan');
const path = require('path');
var app = express();


app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


mongoose.Promise = global.Promise;
const db = require('./config/keys').mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

app.set('Secret', require('./config/keys').secretOrKey);

app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send(res.json("api works"))
});

app.use('/api', ProtectedRoutes);
app.use('/', auth);
app.use('/cm', express.static(path.join(__dirname, 'public')))
app.use('/api/emp', Emp);
app.use('/counter', Counter);
app.use('/', forgotpassword);

const port = 4080;
var ser = app.listen(port, () => {
	console.log("server running port", port);
});


