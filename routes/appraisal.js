var express = require('express');
var router = express.Router();
const AllAdd = require('../model/Curd/AllAdd');
const AllFind = require('../model/Curd/AllFind');




//学工部插入屏评比信息
router.post('/addAppraisal', async (req, res, next) => {
  if (req.userInfo[1].role === 'Controller') {
    const param = req.body;
    console.log(param);
    const add = new AllAdd();
    const result = await add.addAppraisal([param.buildNumber, param.dormitoryNumber, param.violations, param.neatItems, param.score, param.options]);
    add.addResult();
    let status = statues(result);
    res.send({ status: status, result: result.results });
  }

})

//按照宿舍算总分，显示导员
router.get('/search', async (req, res, next) => {
  const param = req.query;
  if (req.userInfo[1].role === 'Controller') {
    if(param.type === 'findScore'){
      const result = await AllFind.findScore();
      let status = statues(result);
      res.send({ status: status, result: result.results });
    }else if(param.type === 'findAvg'){
      const result = await AllFind.findAvg();
      let status = statues(result);
      res.send({ status: status, result: result.results });
    }else if(param.type === 'findApDe'){
      const result = await AllFind.findApDe();
      let status = statues(result);
      res.send({ status: status, result: result.results });
    }
  }else{
    res.send('wuquan');
  }
});
function statues(result) {
  let status;
  return result.err !== null ? status = false : status = true;
};
module.exports = router;