var express = require('express');
var router = express.Router();
const AllAdd = require('../model/Curd/AllAdd');
const AllFind = require('../model/Curd/AllFind');
//获取插入的评比字段
router.get('/addMessage', (req, res, next) => {
  res.send({ behoove: ['buildNumber', 'dormitoryNumber', 'violationssc', 'neatItemssc', 'score', 'optiones'] })
})
//学工部插入屏评比信息
router.post('/addAppraiasl', async (req, res, next) => {
  if (req.userInfo[1].role === 'Controller') {
    const param = req.body;
    console.log(param);
    const add = new AllAdd();
    const result = await add.addAppraisal([param.buildNumber, param.dormitoryNumber, param.violationssc, param.neatItemssc, param.score, param.optiones]);
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
      const find = new AllFind();
      const result = await find.findScore();
      let status = statues(result);
      res.send({ status: status, result: result.results });
    }else if(param.type === 'findAvg'){
      const find = new AllFind();
      const result = await find.findAvg();
      let status = statues(result);
      res.send({ status: status, result: result.results });
    }else if(param.type === 'findApDe'){
      const find = new AllFind();
      const result = await find.findApDe();
      let status = statues(result);
      res.send({ status: status, result: result.results });
    }
    
  }
});
function statues(result) {
  let status;
  return result.err !== null ? status = false : status = true;
};
module.exports = router;