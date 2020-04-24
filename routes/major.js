const express = require('express');
const router = express.Router();
const AllFind = require('../model/Curd/AllFind');
const AllAdd = require('../model/Curd/AllAdd');
const AllDel = require('../model/Curd/AllDel');
const AllUpdate = require('../model/Curd/AllUpdate');
const path = require('path');
const fs = require('fs'); 
router.get('/', async (req, res) => {
    const param = req.query;
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
        }else if (param.type = 'imgBuildNumber') {
          const publicPath = path.resolve(__dirname, "../public/img/" + param.buildNumber + '.png');
          console.log(publicPath);
          console.log('11111111');
          fs.readFile(publicPath,(err,data)=>{
            if(err){
              res.send({msg:'读取错误'});
            }else{
              console.log(data);
              const basestr = new Buffer(data).toString('base64');
              console.log(basestr);
              res.send(basestr);
            }
           
          })
     /*      res.send({url:publicPath}); */
         
          
          
          
         

          /* fs.writeFileSync('copy.jpg', base64str); */
          /* res.sendFile(publicPath); */
        }
    }
});
router.get('/getData',(req, res)=>{
    const param = req.query;
    console.log(param);
    
    let arr = ['体育总会','学工部','维修','邮局','医务室','外保','库房','内保','宿舍办公室','食堂办公室','国护','保卫处','后勤'];
    const result = arr.filter(item => item.includes(param.data));
    res.send({data:result});
});

//宿舍楼栋,楼层的管理
router.post('/addBuildingMa',async (req, res) => {
    if (req.userInfo[1].role === 'Controller') {
      const param = req.body;
      console.log(param);
      const add = new AllAdd();
      const result = await add.addBuildingMa([param.buildNumber, param.dormitoryNumber, param.application,param.department]);
      let status;
      if (result.err === null) {
          status = true;
      } else {
          status = false;
      }
      res.send({ status: status, data: result.results.affectedRows});
    } else {
      res.send('wuquan')
    }
  });
  //学工部修改用途
router.post('/updateMajor', async (req, res) => {
    if (req.userInfo[1].role === 'Controller') {
      const param = req.body;
      console.log(param);
      
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
      console.log(param);
      
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