const express = require('express');
const multer = require('multer');
const fs = require('fs');
const excel = require('../lib/excel-utils');
const router = express.Router();
const AllSql = require('../dbunit/AllSql');
const AllFind = require('../model/Curd/AllFind');
const AllAdd = require('../model/Curd/AllAdd');
const AllDel = require('../model/Curd/AllDel');
const AllUpdate = require('../model/Curd/AllUpdate');
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
  let column = null;
  let field = null;
  let arr = [];
  let modify = [];
  let invariable = [];
  if (req.userInfo[1].role === 'Controller') {
    if (param.type === 'findDormitory') {
      param.buildNumber !== undefined && param.dormitoryNumber !== undefined ? column = 'and' : column = 'or';
      field = AllSql.学生信息管理.role.Controller.find[param.type];
      arr = [param.buildNumber, param.dormitoryNumber];
      invariable = ['studentNumber', 'studentName', 'grade', 'department', 'profession', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'stubName', 'stubPhone'];
    } else if (param.type === 'findDistributedC') {
      arr = [param.instructName]
      invariable = ['buildNumber', 'dormitoryNumber'];
    } else if (param.type === 'findDistributed') {
      param.grade !== undefined && param.profession !== undefined ? column = 'and' : column = 'or';
      field = AllSql.学生信息管理.role.Controller.find[param.type];
      arr = [param.grade, param.profession];
      invariable = ['buildNumber', 'dormitoryNumber'];
    } else {
      res.send('wuquan');
    }

    const result = await AllFind[param.type](field, column, arr);
    let status = statues(result);
    res.send({ status: status, data: result.results, invariable: invariable, modify: modify });




  } else if (req.userInfo[1].role === 'Instructor') {
    if (param.type === 'findDormitory') {
      param.buildNumber !== undefined && param.dormitoryNumber !== undefined ? column = 'and' : column = 'or';
      field = AllSql.学生信息管理.role.Instructor.find[param.type];
      arr = [param.buildNumber, param.dormitoryNumber];
      modify = ['studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'dormitoryLeader', 'LeaderPhone'];
      invariable = ['studentNumber', 'studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'fatherPhone', 'motherPhone', 'dormitoryLeader', 'LeaderPhone'];
    } else if (param.type === 'findDetail') {
      param.studentName !== undefined && param.studentNumber !== undefined ? column = 'and' : column = 'or';
      field = AllSql.学生信息管理.role.Instructor.find[param.type];
      arr = [param.studentName, param.studentNumber];
      invariable = ['studentNumber', 'studentName', 'grade', 'profession', 'class', 'phoneNumber', 'buildNumber', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone', 'stubName', 'stubPhone'];
    } else if (param.type === 'findDistributed') {
      field = AllSql.学生信息管理.role.Instructor.find[param.type];
      column = 'and';
      arr = [req.userInfo[1].positions.split(',')[0], req.userInfo[1].positions.split(',')[1], param.profession];
      invariable = ['buildNumber', 'dormitoryNumber'];
    } else {
      res.end('wuquan');
    }
    const result = await AllFind[param.type](field, column, arr);
    let status = statues(result);
    res.send({ status: status, data: result.results, invariable: invariable, modify: modify });

  } else if (req.userInfo[1].role === 'DeLeader') {
    if (param.type === 'findDistributed') {
      field = AllSql.学生信息管理.role.Instructor.find[param.type];
      column = null;
      param.grade !== undefined && param.profession !== undefined ? column = 'and' : column = 'or';
      arr = [req.userInfo[1].positions, param.grade, param.profession];
      const result = await AllFind.findDistributed(field, column, arr);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['buildNumber', 'dormitoryNumber'] });
    }
  } else if (req.userInfo[1].role === 'House') {
    if (param.type === 'findDormitory') {
      column = 'and';
      field = AllSql.学生信息管理.role.House.find[param.type];
      arr = [req.userInfo[1].positions, param.dormitoryNumber]
      invariable = ['studentNumber', 'studentName', 'grade', 'department', 'profession', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone'];
    } else if (param.type === 'findStub') {
      const result = await AllFind.findStub({ grade: param.grade, profession: param.profession, department: param.department }, req.userInfo[1].positions);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: ['studentNumber', 'studentName', 'department', 'profession', 'grade', 'class', 'phoneNumber', 'instructName', 'instructPhone', 'dormitoryNumber', 'dormitoryLeader', 'LeaderPhone', 'fatherPhone', 'motherPhone'] });
    } else if (param.type === 'findDetail') {
      param.studentName !== undefined && param.studentNumber !== undefined ? column = 'and' : column = 'or';
      field = AllSql.学生信息管理.role.House.find[param.type];
      arr = [req.userInfo[1].positions, param.studentName, param.studentNumber];
      invariable = ['grade', 'profession', 'dormitoryNumber', 'phoneNumber', 'instructName', 'instructPhone'];
    } else {
      res.send('wuquan');
    }
    if (param.type !== 'findStub') {
      const result = await AllFind[param.type](field, column, arr);
      let status = statues(result);
      res.send({ status: status, data: result.results, invariable: invariable, modify: modify });
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
  if (req.userInfo[1].role === 'Instructor') {
    const param = req.body;
    let add = new AllAdd();
    const result = await add.addMessage([param.studentNumber, param.studentName, param.department, param.profession, param.grade, param.class, param.phoneNumber, param.instructName, param.instructPhone, param.buildNumber, param.dormitoryNumber, param.dormitoryLeader, param.LeaderPhone, param.fatherPhone, param.motherPhone, param.stubName, param.stubPhone]);
    let status = statues(result);
    res.send({ status: status, results: result.results });
  } else {
    res.send({ status: false, msg: '没有权限' });
  }

});

//导员批量导入信息
router.post('/insert', multer({
  dest: 'public/xlsx'
}).single('file'), function (req, res, next) {
  if (req.userInfo[1].role === 'Instructor') {
    let num = [];
    if (req.file.length === 0) {
      return res.json({ error: '上传文件不能为空' });
    } else {
      let file = req.file;
      fs.renameSync('./public/xlsx/' + file.filename, './public/xlsx/' + file.originalname);
      excel(file.originalname, async function (data) {
        if (!data.err) {
          for (let i in data) {
            let arr = [];
            for (let j in Object.values(data[i])) {
              arr[j] = Object.values(data[i])[j];
            }
            let add = new AllAdd();
            const v = await add.addByInstruct(arr);
            if (v.err !== null) {
              num.push(v.err.sql);
            } else {
              continue;
            }
          }
          let Sarr = [];
          let obj1 = [];
          for (let i = 0; i < num.length; i++) {
            let obj = {};
            Sarr = num[i].split("(")[2].split("'");
            obj.studentNumber = Sarr[1];
            obj.studentName = Sarr[3];
            obj1.push(obj);
          }
          res.send({ status: '添加失败', msg: obj1 });
        } else {
          res.json(data.err);
        }
      });


    }
  } else {
    res.send({ status: false, msg: '没有权限' });
  }

});

//删除
router.post('/delete', async function (req, res) {
  if (req.userInfo[1].role === 'Instructor') {
    const param = req.body;
    let del = new AllDel();
    const result = await del.deleteByStudentNumber(param);
    let status = statues(result);
    res.send({ status: status, data: result.results });
  } else {
    res.send({ status: false, msg: '没有权限' });
  }

});


//导员修改信息
router.post('/update', async function (req, res) {
  if (req.userInfo[1].role === 'Instructor') {
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
    const result = await AllUpdate.update(sqlPinJie, arrParam);
    let status = statues(result)
    res.send({ status: status, data: result.results.affectedRows });
  } else {
    res.send({ status: false, msg: '没有权限' });
  }

});


function statues(result) {
  let status;
  return result.err !== null ? status = false : status = true;
};


module.exports = router;
