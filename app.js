var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const allowCors = require('./lib/allow-cors'); //跨域许可
const tokenUtil = require('./lib/token-units');


var indexRouter = require('./routes/index');
var accentRouter = require('./routes/accent');
const appraisalRouter = require('./routes/appraisal');
const sideRouter = require('./routes/side');
const downloadRouter = require('./routes/download');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCors); //跨域中间件
//路由
app.use('/user', accentRouter);
app.use('/download', downloadRouter);
app.use((req, res, next)=>{
  let token = /*  req.headers['authorization']; */'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYWNjZW50IjoiaW5zdHJ1Y3QiLCJyb2xlIjoiSW5zdHJ1Y3RvciIsInBvc2l0aW9ucyI6Iuiuoeeul-acuuezuyzlpKfkuIAiLCJpYXQiOjE1ODczMDY5MjcsImV4cCI6MTU4NzM5MzMyN30.qHghVKPFHtv9q0KGGRUKyMs09csIRCbWYghOKTjC8rw';
  if(token){
    req.userInfo = tokenUtil.checkToken(token);
    console.log(req.userInfo);
    
    console.log(req.userInfo[1].role);
    console.log('111111111111111');
   /*  console.log(req.userInfo[1].positions.split(',')[0]);
    console.log(req.userInfo[1].positions.split(',')[1]); */
    return next();
  }else{
    res.json({ status: false });
  }
});
app.use('/students', indexRouter);
app.use('/side', sideRouter);

app.use('/appraisal', appraisalRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
