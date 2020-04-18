const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const excel = require('../lib/excel-utils');
const readFile = require('../model/readFile');
const router = express.Router();
const AllSql = require('../dbunit/AllSql');
const AllFind = require('../model/Curd/AllFind');
const AllAdd = require('../model/Curd/AllAdd');
const AllDel = require('../model/Curd/AllDel');
const BaseSql = require('../lib/student/BaseSql');
const role = require('../model/Role');
//返回角色可做的操作
router.get('/side', (req, res) => {
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
});

router.get('/search', (req, res) => {
  switch (req.userInfo[1].role) {
    case 'Controller':
      res.send({ SelectOptions: role.Controller.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable });
      break;
    case 'Instructor':
      res.send({ SelectOptions: role.Instructor.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable });
      break;
    case 'DeLeader':
      res.send({ SelectOptions: role.DeLeader.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable });
      break;
    case 'House':
      res.send({ SelectOptions: role.House.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable });
      break;
  }
});

router.get('/operate', async (req, res, next) => {
  const param = req.query;
  console.log(param);
  if (req.userInfo[1].role === 'Controller') {
    if (param.type === 'findDormitory') {
      let column = null;
      if (param.buildNumber && param.dormitoryNumber && (param.buildNumber !== 'undefined' && param.dormitoryNumber !== 'undefined')) {
        column = 'and'
      } else if (param.buildNumber && !param.dormitoryNumber) {
        column = 'or';
        param.dormitoryNumber = 'undefined';
      } else if (!param.buildNumber && param.dormitoryNumber) {
        column = 'or';
        param.buildNumber = 'undefined';
      } else {
        column = 'or';
      }
      
      let field = AllSql.学生信息管理.role.Controller.find.findDormitory;
      let find = new AllFind(field, column, [param.buildNumber, param.dormitoryNumber]);
      const result = await find.findDormitory();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['studentNumber', 'studentName', 'grade', 'department', 'profession', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'stubName', 'stubPhone'] });
    } else {
      let column = null;
      if (param.grade && param.profession && (param.grade !== 'undefined' && param.profession !== 'undefined')) {
        column = 'and'
      } else if (param.grade && !param.profession) {
        column = 'or';
        param.profession = 'undefined';
      } else if (!param.grade && param.profession) {
        column = 'or';
        param.grade = 'undefined';
      } else {
        column = 'or';
      }
      let field = AllSql.学生信息管理.role.Controller.find.findDistributed;
      let find = new AllFind(field, column, [param.grade, param.profession]);
      const result = await find.findDistributed();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
    }
  } else if (req.userInfo[1].role === 'Instructor') {
    if (param.type === 'findDormitory') {
      let column = null;
      if (param.buildNumber && param.dormitoryNumber && (param.buildNumber !== 'undefined' && param.dormitoryNumber !== 'undefined')) {
        column = 'and'
      } else if (param.buildNumber && !param.dormitoryNumber) {
        column = 'or';
        param.dormitoryNumber = 'undefined';
      } else if (!param.buildNumber && param.dormitoryNumber) {
        column = 'or';
        param.buildNumber = 'undefined';
      } else {
        column = 'or';
      }
      /* parames(param.buildNumber,param.dormitoryNumber);
      console.log('9999999999999999');
      
      console.log(column);
      console.log(param); */
      
      
      let field = AllSql.学生信息管理.role.Instructor.find.findDormitory;
      let find = new AllFind(field, column, [param.buildNumber, param.dormitoryNumber]);
      const result = await find.findDormitory();
      let modify = ['studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'dormitoryLeader', 'LeaderPhone'];
      let invariable = ['studentNumber', 'studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'dormitoryLeader', 'LeaderPhone'];
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: invariable, modify: modify });
    } else if (param.type === 'findDetail') {
      let column = null;
      if (param.studentName && param.studentNumber && (param.studentName !== 'undefined' && param.studentNumber !== 'undefined')) {
        column = 'and'
      } else if (param.studentName && !param.studentNumber) {
        column = 'or';
        param.studentNumber = 'undefined';
      } else if (!param.studentName && param.studentNumber) {
        column = 'or';
        param.stubName = 'undefined';
      } else {
        column = 'or';
      }
      let field = AllSql.学生信息管理.role.Instructor.find.findDetail;
      let find = new AllFind(field, column, [param.studentName, param.studentNumber]);
      const result = await find.findDetail();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['studentNumber', 'studentName', 'grade', 'profession', 'class', 'phoneNumber', 'buildNumber', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone', 'stubName', 'stubPhone'] });
    } else {
      let field = AllSql.学生信息管理.role.Instructor.find.findDistributed;
      let find = new AllFind(field, 'and', [req.userInfo[1].positions.split(',')[0], req.userInfo[1].positions.split(',')[1], param.profession]);
      const result = await find.findDistributed();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
    }
  } else if (param.role === 'DeLeader') {
    let field = AllSql.学生信息管理.role.Instructor.find.findDistributed;
    let column = null;
    if (param.grade && param.profession && (param.grade !== 'undefined' && param.profession !== 'undefined')) {
      column = 'and'
    } else if (param.grade && !param.profession) {
      column = 'or';
      param.profession = 'undefined';
    } else if (!param.grade && param.profession) {
      column = 'or';
      param.grade = 'undefined';
    } else {
      column = 'or';
    }
    let find = new AllFind(field, column, [req.userInfo[1].positions, param.grade, param.profession]);
    const result = await find.findDistributed();
    let status = statues(result);
    res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
  } else if (param.role === 'House') {
    if (param.type === 'findDormitory') {
      let column = 'and';
      let field = AllSql.学生信息管理.role.House.find.findDormitory;
      let find = new AllFind(field, column, [req.userInfo[1].positions, param.dormitoryNumber]);
      const result = await find.findDormitory();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['studentNumber', 'studentName', 'grade', 'department', 'profession', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone'] });
    } else if (param.type === 'findStub') {
      let find = new AllFind();
      const result = await find.findStub(param, req.userInfo[1].positions);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['studentNumber', 'studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone'] });
    } else {
      let column = null;
      if (param.studentName && param.studentNumber && (param.studentName !== 'undefined' && param.studentNumber !== 'undefined')) {
        column = 'and'
      } else if (param.studentName && !param.studentNumber) {
        column = 'or';
        param.studentNumber = 'undefined';
      } else if (!param.studentName && param.studentNumber) {
        column = 'or';
        param.stubName = 'undefined';
      } else {
        column = 'or';
      }
      let field = AllSql.学生信息管理.role.House.find.findDetail;
      let find = new AllFind(field, column, [req.userInfo[1].positions, param.studentName, param.studentNumber]);
      const result = await find.findDetail();
      let photos = Object.values(results.results)[0].photo;
      const publicPath = path.resolve(__dirname, "../" + photos);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['grade', 'profession', 'dormitoryNumber', 'phoneNumber', 'instructName', 'instructPhone', 'photo'] });
      /* res.sendFile(publicPath); */
    }
  }
});

router.get('/instructMessage', (req, res, next) => {
  res.send({ status: '/instructInsert', behoove: ['studentName', 'department', 'profession', 'grade', 'class'], hiatus: ['phoneNumber', 'instructName', 'instructPhone', 'buildNumber', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone', 'stubName', 'stubPhone'], photo: 'photo' });
});

//导员单条插入信息
router.post('/instructInsert', multer({
  dest: 'public/img'
}).single('photo'), async function (req, res, next) {
  if (req.file.length === 0) {
    res.render("error", { message: "上传图片为空" });
    return;
  } else {
    let file = req.file;
    //获取文件扩展名
    let exts = file.originalname.split(".");
    let ext = exts[exts.length - 1]; //防止其余的点
    let number = Date.now();
    fs.renameSync(file.path, 'public\\img\\' + number + '.' + ext);
    const param = req.body;
    console.log(param);
    param.photo = 'public\\img\\' + number + '.' + ext;
    /* console.log(param.photo); */
    let add = new AllAdd([param.studentNumber, param.studentName, param.department, param.profession, param.grade, param.class, param.phoneNumber, param.instructName, param.instructPhone, param.buildNumber, param.dormitoryNumber, param.dormitoryLeader, param.LeaderPhone, param.fatherPhone, param.motherPhone, param.stubName, param.stubPhone, param.photo]);
    const result = await add.addMessage();
    res.send({ err: result.err, results: result.results });
  }
});

//导员批量导入信息
router.post('/insert', multer({
  dest: 'public/xlsx'
}).single('file'), function (req, res, next) {
  if (req.file.length === 0) {
    return res.json({ error: '上传文件不能为空' });
  } else {
    let file = req.file;
    fs.renameSync('./public/xlsx/' + file.filename, './public/xlsx/' + file.originalname);
    excel(file.originalname, function (data) {
      if (!data.err) {
        for (let i in data) {
          let arr = [];
          for (let j in Object.values(data[i])) {
            arr[j] = Object.values(data[i])[j];
          }
          let add = new AllAdd();
          const result = add.addByInstruct(arr, (err, results) => {
            if (err) {
              res.json(err);
            }
          });
        }
      } else {
        res.json(data.err);
      }
    });
  }
});

//删除
router.post('/delete', async function (req, res) {
  const param = req.body;
  let del = new AllDel();
  const result = await del.deleteByStudentNumber(param);
  res.send({ err: result.err, results: result.results });
});

//下载信息表
router.get('/download', (req, res, next) => {
  const param = req.query;
  if (param.type === 'excel') {
    readFile.readExcel('./public/files/学生信息登记表.xlsx', res);
  } else if (param.type === 'word') {
    readFile.readWord('./public/files/调宿信息登记表.docx', res);
  }

});

//导员修改信息
router.post('/update', async function (req, res) {
  const param = req.body;
  /* for (let i = 0; i < param.length; i++) {
    let sqlPinJie = null;
    let arrParam = [];
    let arrKey = Object.keys(param[i]);
    let index = arrKey.filter(item => item !== 'studentNumber');
    sqlPinJie = index[0] + '=?';
    arrParam[0] = Object.values(param[i])[1];
    for (let j = 1; j < index.length; j++) {
      if (index.length === 1) {
        break;
      } else {
        sqlPinJie += ',';
        sqlPinJie += index[j] + '=?';
        arrParam[j] = Object.values(param[i])[j + 1];
      }
    }
    arrParam.push(Object.values(param[i])[0]); */
  let sqlPinJie = null;
  let arrParam = [];
  let arrKey = Object.keys(param);
  let index = arrKey.filter(item => item !== 'studentNumber');
  sqlPinJie = index[0] + '=?';
  arrParam[0] = param.index[0];
  for(let i = 1; i < index.length; i++){
    if(index.length === 1){
      break;
    }else{
      sqlPinJie += ',';
        sqlPinJie += index[j] + '=?';
        arrParam[j] = Object.values(param)[j];
    }
  }
  arrParam.push(param.studentNumber)
  console.log(sqlPinJie);
  console.log(arrParam);
  let update = new BaseSql(sqlPinJie, arrParam);
  const result = await update.update();
  res.send({ err: result.err, results: result.results });
  /*   } */
});


function statues(result) {
  let status;
  return result.err !== null ? status = false : status = true;
};
/* return function parames(xx,yy){
  let column = null;
  if(xx && yy && (xx !== 'undefined' && yy !== 'undefined')){
    column = 'and';
  } else if(xx && !yy){
    column = 'or';
    yy = 'undefined';
  }else if(!xx && yy){
    column = 'or';
    xx = 'undefined';
  }else{
    column = 'or';
  }
} */
module.exports = router;
