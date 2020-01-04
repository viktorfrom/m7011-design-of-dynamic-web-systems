const createError = require('http-errors');
const express = require('express');
const session = require('express-session');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/dbconfig.js');
const passport = require('passport');

// views imports
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const aboutUsRouter = require('./routes/aboutus');

// api imports 
const housesRouter = require('./routes/api/houseapi');
const marketPricesRouter = require('./routes/api/marketpriceapi');
const powerPlantsRouter = require('./routes/api/powerplantapi');
const regionsRouter = require('./routes/api/regionapi');
const usersRouter = require('./routes/api/userapi');

// dbschema imports
require('./schemas/houseschema')
require('./schemas/marketpriceschema')
require('./schemas/powerplantschema')
require('./schemas/regionschema')
require('./schemas/userschema')
const app = express();

// passport config
require('./config/passport')(passport);

// db config
mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
  console.log("Successful connection to db established");    
}).catch(err => {
  console.log('Error...', err);
  process.exit();
});

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

// express body parser
app.use(express.urlencoded({ extended: true }));

// express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// views routing
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/aboutus', aboutUsRouter);

// api routing
app.use('/api/house', housesRouter);
app.use('/api/marketprice', marketPricesRouter);
app.use('/api/powerplant', powerPlantsRouter);
app.use('/api/region', regionsRouter);
app.use('/api/user', usersRouter);

// run simulation
let Simulation = require('./simulation/model/simulation.js')
this.simulation = new Simulation();
this.simulation.runSimulation();


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
  res.render('error', { error: err });
});


module.exports = app;