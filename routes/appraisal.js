var express = require('express');
var router = express.Router();
const AllAdd = require('../model/Curd/AllAdd');
const AllFind = require('../model/Curd/AllFind');
//学工部插入屏评比信息
router.post('/addAppraisal', async (req, res, next) => {
  if (req.userInfo[1].role === 'Controller') {
    const param = req.body;
    const add = new AllAdd();
    let options = param.options.join();
    const result = await add.addAppraisal([param.buildNumber, param.dormitoryNumber, param.violations, param.neatItems, param.score, options]);
    if (!result.err) {
      const data = await add.addResult();
      let status = statues(data);
      res.send({ status: status, data: data.results });
    } else {
      let status = statues(result);
      res.send({ status: false, data: status });
    }
  }
})
//按照宿舍算总分，显示导员
router.get('/search', async (req, res, next) => {
  const param = req.query;
  if (req.userInfo[1].role === 'Controller') {
    console.log(param);
    let invariable = [];
    if (param.type === 'findScore') {
      invariable = ['buildNumber', 'dormitoryNumber', 'score', 'instructName'];
    } else if (param.type === 'findAvg') {
      invariable = ['AVG', 'instructName', 'times']
    } else if (param.type === 'findApDe') {
      invariable = ['buildNumber', 'dormitoryNumber', 'OPTIONS', 'score', 'times']
    } else {
      res.send('wuquan');
    }
    const result = await AllFind[param.type]();
    let status = statues(result);
    res.send({ status: status, data: result.results, invariable: invariable });
  } else {
    res.send('wuquan');
  }
});
function statues(result) {
  return result.err  ? result.err : true;
};
module.exports = router;