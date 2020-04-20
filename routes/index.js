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
      res.send({ SelectOptions: role.Controller.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable, role: req.userInfo[1].role });
      break;
    case 'Instructor':
      res.send({ SelectOptions: role.Instructor.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable, role: req.userInfo[1].role });
      break;
    case 'DeLeader':
      res.send({ SelectOptions: role.DeLeader.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable, role: req.userInfo[1].role });
      break;
    case 'House':
      res.send({ SelectOptions: role.House.学生住宿信息管理.find, SelectHashTable: role.SelectHashTable, role: req.userInfo[1].role });
      break;
  }
});

router.get('/operate', async (req, res, next) => {
  const param = req.query;
  console.log(param);
  if (req.userInfo[1].role === 'Controller' && param.role === 'Controller') {
    if (param.type === 'findDormitory') {
      let num = parames(param.buildNumber, param.dormitoryNumber);
      let column = num[0]; param.buildNumber = num[1]; param.dormitoryNumber = num[2];
      let field = AllSql.学生信息管理.role.Controller.find.findDormitory;
      let find = new AllFind(field, column, [param.buildNumber, param.dormitoryNumber]);
      const result = await find.findDormitory();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['studentNumber', 'studentName', 'grade', 'department', 'profession', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'stubName', 'stubPhone'] });
    } else if (param.instructName && param.type === 'findDistributedC') {
      let find = new AllFind();
      const result = await find.findDistributedC(param);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
    } else {
      let num = parames(param.grade, param.profession);
      let column = num[0]; param.grade = num[1]; param.profession = num[2];
      let field = AllSql.学生信息管理.role.Controller.find.findDistributed;
      let find = new AllFind(field, column, [param.grade, param.profession]);
      const result = await find.findDistributed();
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
    }
  } else if (req.userInfo[1].role === 'Instructor' && param.role === 'Instructor') {
    if (param.type === 'findDormitory') {
      let num = parames(param.buildNumber, param.dormitoryNumber);
      let column = num[0]; param.buildNumber = num[1]; param.dormitoryNumber = num[2];
      let field = AllSql.学生信息管理.role.Instructor.find.findDormitory;
      let find = new AllFind(field, column, [param.buildNumber, param.dormitoryNumber]);
      const result = await find.findDormitory();
      let modify = ['studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'dormitoryLeader', 'LeaderPhone'];
      let invariable = ['studentNumber', 'studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'dormitoryLeader', 'LeaderPhone'];
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: invariable, modify: modify });
    } else if (param.type === 'findDetail') {
      let num = parames(param.studentName, param.studentNumber);
      let column = num[0]; param.studentName = num[1]; param.studentNumber = num[2];
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
  } else if (param.role === 'DeLeader' && req.userInfo[1].role === 'DeLeader') {
    let field = AllSql.学生信息管理.role.Instructor.find.findDistributed;
    let num = parames(param.grade, param.profession);
    let column = num[0]; param.grade = num[1]; param.profession = num[2];
    let find = new AllFind(field, column, [req.userInfo[1].positions, param.grade, param.profession]);
    const result = await find.findDistributed();
    let status = statues(result);
    res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
  } else if (param.role === 'House' && req.userInfo[1].role === 'House' === 'House') {
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
      let num = parames(param.studentName, param.studentNumber);
      let column = num[0]; param.studentName = num[1]; param.studentNumber = num[2];
      let field = AllSql.学生信息管理.role.House.find.findDetail;
      let find = new AllFind(field, column, [req.userInfo[1].positions, param.studentName, param.studentNumber]);
      const result = await find.findDetail();
      let photos = Object.values(results.results)[0].photo;
      const publicPath = path.resolve(__dirname, "../" + photos);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['grade', 'profession', 'dormitoryNumber', 'phoneNumber', 'instructName', 'instructPhone', 'photo'] });
      /* res.sendFile(publicPath); */
    }
  } else {
    res.send('wuquan')
  }
});

router.get('/instructMessage', (req, res, next) => {
  res.send({ behoove: ['studentName', 'department', 'profession', 'grade', 'class'], hiatus: ['phoneNumber', 'instructName', 'instructPhone', 'buildNumber', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone', 'stubName', 'stubPhone'], photo: 'photo' });
});

//导员单条插入信息
router.post('/instructInsert', async (req, res, next) => {
  const param = req.body;
  console.log(param);
  let add = new AllAdd();
  const result = await add.addMessage([param.studentNumber, param.studentName, param.department, param.profession, param.grade, param.class, param.phoneNumber, param.instructName, param.instructPhone, param.buildNumber, param.dormitoryNumber, param.dormitoryLeader, param.LeaderPhone, param.fatherPhone, param.motherPhone, param.stubName, param.stubPhone]);
  let status = null;
  if (result.err === null) { status = true; } else { status = false }
  res.send({ status: status, results: result.results });
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
          add.addByInstruct(arr, (err, results) => {
            if (err) {
              let str = err;
              let start = str.indexOf('values') + 7;

              res.json({ status: '添加失败', msg: str.slice(start, start + 14) });
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
  let status = statues(result);
  res.send({ status: status, results: result.results });
});


//导员修改信息
router.post('/update', async function (req, res) {
  const param = req.body;
  let sqlPinJie = null;
  let arrParam = [];
  let arrKey = Object.keys(param);
  let index = arrKey.filter(item => item !== 'studentNumber');
  sqlPinJie = index[0] + '=?';
  arrParam[0] = Object.values(param)[1];
  for (let i = 1; i < index.length; i++) {
    if (index.length === 1) {
      break;
    } else {
      sqlPinJie += ',';
      sqlPinJie += index[i] + '=?';
      arrParam[i] = Object.values(param)[i + 1];
    }
  }
  arrParam.push(param.studentNumber)
  console.log(sqlPinJie);
  console.log(arrParam);
  let update = new BaseSql(sqlPinJie, null, arrParam);
  const result = await update.update();
  let status = statues(result)
  res.send({ status: status, results: result.results.affectedRows });
  /*   } */
});


function statues(result) {
  let status;
  return result.err !== null ? status = false : status = true;
};

//对数据进行处理
function parames(param_1, param_2) {
  let column = null;
  if (param_1 && param_2 && (param_1 !== 'undefined' && param_2 !== 'undefined')) {
    column = 'and'
  } else if (param_1 && !param_2) {
    column = 'or';
    param_2 = 'undefined';
  } else if (!param_1 && param_2) {
    column = 'or';
    param_1 = 'undefined';
  } else {
    column = 'or';
  }
  return [column, param_1, param_2];
}
module.exports = router;
