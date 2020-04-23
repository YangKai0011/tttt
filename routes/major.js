const express = require('express');
const router = express.Router();
const AllFind = require('../model/Curd/AllFind');
const AllAdd = require('../model/Curd/AllAdd');
const AllDel = require('../model/Curd/AllDel');
const AllUpdate = require('../model/Curd/AllUpdate');
router.get('/', async (req, res) => {
    const param = req.type;
    if (req.userInfo[1].role === 'Controller') {
        if (param.type === 'findBuMe') {
            let invariable = ['buildNumber', 'dormitoryNumber', 'application'];
            const result = await AllFind.findBuMe();
            let status;
            if (result.err === null) {
                status = true;
            } else {
                status = false;
            }
            res.send({ status: status, data: result.results, invariable:invariable});
        }
    }
});
router.get('getData',(req, res)=>{
    const param = req.query;
    let arr = ['体育总会','学工部','维修','邮局','医务室','外保','库房','内保','宿舍办公室','食堂办公室','国护','保卫处','后勤'];
    const result = arr.filter(item => item.includes(param.data));
    res.send({data:result});
});

//宿舍楼栋,楼层的管理
router.post('/addBuildingMa', (req, res) => {
    if (req.userInfo[1].role === 'Controller') {
      const param = req.body;
      const add = new AllAdd();
      add.addBuildingMa([param.buildNumber, param.dormitoryNumber, param.application]);
    } else {
      res.send('wuquan')
    }
  });
  //学工部修改用途
router.post('/updateMajor', async (req, res) => {
    if (req.userInfo[1].role === 'Controller') {
      const param = req.body;
      const result = await AllUpdate.updateMajor(param);
      let status;
      if (result.err === null) {
          status = true;
      } else {
          status = false;
      }
      res.send({ status: status, data: result.results.affectedRows});
    } else {
      res.send({ status: status, msg: '没有权限' });
    }
  });
  //删除宿舍用途
router.post('/deleteMajor', async (req, res) => {
    if (req.userInfo[1].role === 'Controller') {
      const param = req.body;
      let del = new AllDel();
      const result = await del.deleteMajor(param);
      let status;
      if (result.err === null) {
          status = true;
      } else {
          status = false;
      }
      res.send({ status: status, data: result.results.affectedRows});
    } else {
      res.send({ status: status, msg: '没有权限' });
    }
  });
  
module.exports = router;