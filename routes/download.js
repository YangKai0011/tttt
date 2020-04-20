var express = require('express');
var router = express.Router();
const readFile = require('../model/readFile');

//下载信息表
router.get('/', (req, res, next) => {
    const param = req.query;
    if (param.excel) {
      if(param.excel !== '学生信息登记表'){
        res.json({status:false,msg:'无此表'})
      }else{
        readFile.readExcel('./public/files/学生信息登记表.xlsx', res);
      }
      
    }else if (param.word) {
      if(param.word !== '调宿信息登记表'){
        res.json({status:false,msg:'无此表'})
      }else{
        readFile.readWord('./public/files/调宿信息登记表.docx', res);
      }
     
    }
  });
  
module.exports = router;