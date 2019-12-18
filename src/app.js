const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// views imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const aboutUsRouter = require('./routes/aboutus');

// api imports 
const houseRouter = require('./routes/api/houseapi');
const marketPriceRouter = require('./routes/api/marketpriceapi');
const powerPlantRouter = require('./routes/api/powerplantapi');
const regionRouter = require('./routes/api/regionapi');

// db schema imports
require('./schemas/houseschema')
require('./schemas/marketpriceschema')
require('./schemas/powerplantschema')
require('./schemas/regionschema')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// views routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/aboutus', aboutUsRouter);

// api routing
app.use('/api/house', houseRouter);
app.use('/api/marketprice', marketPriceRouter);
app.use('/api/powerplant', powerPlantRouter);
app.use('/api/region', regionRouter);


// connect to db
mongoose.connect('mongodb://localhost/GLE_DB', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
  console.log("Successful connection to db established");    
}).catch(err => {
  console.log('Error...', err);
  process.exit();
});

// run simulation
// let Simulation = require('./simulation/model/simulation.js')
// this.simulation = new Simulation();
// this.simulation.runSimulation();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;