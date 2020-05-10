var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const allowCors = require('./lib/allow-cors'); //跨域许可
const tokenUtil = require('./lib/token-units');
const role = require('./model/Role');

var indexRouter = require('./routes/index');
var accentRouter = require('./routes/accent');
const appraisalRouter = require('./routes/appraisal');
const downloadRouter = require('./routes/download');
const majorRouter = require('./routes/major');
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
  let token =  req.headers['authorization'];/* 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYWNjZW50IjoiaW5zdHJ1Y3QiLCJyb2xlIjoiSW5zdHJ1Y3RvciIsInBvc2l0aW9ucyI6Iuiuoeeul-acuuezuyzlpKfkuIAiLCJpYXQiOjE1ODkwNDA2MDcsImV4cCI6MTU4OTEyNzAwN30.8qH0bWYttdtFgRYuJtNu0t_mC53dUrNQkYoL3QlU-t0' */;
  if(token){
    req.userInfo = tokenUtil.checkToken(token);
    console.log(req.userInfo);
    
   /*  console.log(req.userInfo[1].role); */
   /*  console.log(req.userInfo[1].positions.split(',')[0]);
    console.log(req.userInfo[1].positions.split(',')[1]); */
    return next();
  }else{
    res.json({ status: false });
  }
});
app.get('/side',(req, res)=>{
  
  switch (req.userInfo[1].role) {
    case 'Controller':
      res.send(role.Controller.oper);
      break;
    case 'Instructor':
      res.send(role.Instructor.oper);
      break;
    case 'DeLeader':
      res.send(role.DeLeader.oper);
      break;
    case 'House':
      res.send(role.House.oper);
      break;
  }
})
app.get('/nav', (req, res)=>{
  RoleHashTable={
    'Controller': '学工部',
    'Instructor': '导员',
    'House': '宿管员',
    'DeLeader': '系领导',
    'Student': '学生'
  }
  if(req.userInfo[1].role === 'House'){
    let descripe = '号楼';
    res.send({role:RoleHashTable[req.userInfo[1].role],position:req.userInfo[1].positions + descripe});
  }else{
    res.send({role:RoleHashTable[req.userInfo[1].role],position:req.userInfo[1].positions});
  }
});
app.use('/students', indexRouter);
app.use('/appraisal', appraisalRouter);
app.use('/major', majorRouter);
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
