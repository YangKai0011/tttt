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
const update = require('../lib/student/update');
const role = require('../model/Role');

/* router.get('/', (req, res, next) => {
  const param = req.query;
  switch (param.role) {
    case 'Controller':
      res.send(AllSql.学生信息管理.role.Controller);
      break;
    case 'Instructor':
      res.send(AllSql.学生信息管理.role.Instructor);
      break;
    case 'DeLeader':
      res.send(AllSql.学生信息管理.role.DeLeader);get
      break;
  }
}); */

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
      res.send({SelectOptions:role.Controller.学生住宿信息管理.find,SelectHashTable:role.SelectHashTable});
      break;
    case 'Instructor':
      res.send({SelectOptions:role.Instructor.学生住宿信息管理.find,SelectHashTable:role.SelectHashTable});
      break;
    case 'DeLeader':
      res.send({SelectOptions:role.DeLeader.学生住宿信息管理.find,SelectHashTable:role.SelectHashTable});
      break;
    case 'House':
      res.send({SelectOptions:role.House.学生住宿信息管理.find,SelectHashTable:role.SelectHashTable});
      break;
  }
});

router.get('/operate', async (req, res, next) => {
  const param = req.query;
  console.log(param);
  if (param.role === 'Controller') {
    if (param.buildNumber || param.dormitoryNumber) {
      let column = param.dormitoryNumber !== 'undefined' && param.buildNumber !== 'undefined' ? 'and' : 'or';
      let field = AllSql.学生信息管理.role.Controller.find.findDormitory;
      let find = new AllFind(field, column, [param.buildNumber, param.dormitoryNumber]);
      const results = await find.findDormitory();
      res.send({ err: results.err, results: results.results });
    } else {
      let column = param.grade !== 'undefined' && param.profession !== 'undefined' ? 'and' : 'or';
      let field = AllSql.学生信息管理.role.Controller.find.findDistributed;
      let find = new AllFind(field, column, [param.grade, param.profession]);
      const results = await find.findDistributed();
      res.send({ err: results.err, results: results.results });
    }
  } else if (param.role === 'Instructor') {
    if (param.buildNumber || param.dormitoryNumber) {
      let column = param.buildNumber !== 'undefined' && param.dormitoryNumber !== 'undefined' ? 'and' : 'or';
      let field = AllSql.学生信息管理.role.Instructor.find.findDormitory;
      let find = new AllFind(field, column, [param.buildNumber, param.dormitoryNumber]);
      const results = await find.findDormitory();
      let modify = ['grade', 'profession', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'buildNumber', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone'];
      let invariable = ['studentNumber', 'studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone']
      res.send({ err: results.err, results: results.results, invariable: invariable, modify: modify });
    } else if (param.studentName || param.studentNumber) {
      let column = param.studentName !== 'undefined' && param.studentNumber !== 'undefined' ? 'and' : 'or';
      let field = AllSql.学生信息管理.role.Instructor.find.findDetail;
      let find = new AllFind(field, column, [param.studentName, param.studentNumber]);
      const results = await find.findDetail();
      res.send({ err: results.err, results: results.results });
    } else {
      let column = param.positions !== 'undefined' && param.profession !== 'undefined' ? 'and' : 'or';
      let field = AllSql.学生信息管理.role.Instructor.find.findDistributed;
      //TODO
      let find = new AllFind(field, column, [param.position, param.positions, param.profession]);
      const results = await find.findDistributed();
      res.send({ err: results.err, results: results.results });
    }
  } else if (param.role === 'DeLeader') {
    let column = param.positions !== 'undefined' && param.profession !== 'undefined' ? 'and' : 'or';
    let field = AllSql.学生信息管理.role.Instructor.find.findDistributed;
    //TODO
    let find = new AllFind(field, column, [param.positions, param.grade, param.profession]);
    const results = await find.findDistributed();
    res.send({ err: results.err, results: results.results });
  } else if (param.role === 'House') {
    if (param.dormitoryNumber) {
      let column = param.dormitoryNumber === 'undefined' ? 'or' : 'and';
      let field = AllSql.学生信息管理.role.House.find.findDormitory;
      let find = new AllFind(field, column, [param.positions, param.dormitoryNumber]);
      const results = await find.findDormitory();
      res.send({ err: results.err, results: results.results });
    } else if (param.grade || param.profession || param.department) {
      let find = new AllFind();
      const results = await find.findStub(param);
      res.send({ err: results.err, results: results.results });
    } else {
      let column = param.studentName !== 'undefined' && param.studentNumber !== 'undefined' ? 'and' : 'or';
      let field = AllSql.学生信息管理.role.House.find.findDetail;
      let find = new AllFind(field, column, [param.positions, param.studentName, param.studentNumber]);
      const results = await find.findDetail();
      let photos = Object.values(results.results)[0].photo;
      const publicPath = path.resolve(__dirname, "../" + photos);
      res.send({ err: results.err, results: results.results });
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
  for (let i = 0; i < param.length; i++) {
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
    arrParam.push(Object.values(param[i])[0]);
    let $update = new update(sqlPinJie, arrParam);
    const result = await $update.update();
    res.send({ err: result.err, results: result.results });
  }
});
module.exports = router;
