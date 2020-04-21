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
    if(result.err === null){
        const data = await add.addResult();
        let status = statues(data);
        let invariable = ['buildNumber', 'dormitoryNumber','score', 'instructName','grade','profession','checkDate'];
        res.send({ status: status, data: data.results,invariable: invariable});
    }else{
      let status = statues(result);
      res.send({ status: status, data: result.results });
    }
   
  }

})

//按照宿舍算总分，显示导员
router.get('/search', async (req, res, next) => {
  const param = req.query;
  if (req.userInfo[1].role === 'Controller') {
    console.log(param);
    
    if(param.type === 'findScore'){
      const result = await AllFind.findScore();
      let invariable = ['buildNumber', 'dormitoryNumber','score','instructName'];
      let status = statues(result);
      res.send({ status: status, data: result.results,invariable:invariable });
    }else if(param.type === 'findAvg'){
      const result = await AllFind.findAvg();
      let invariable = ['AVG(score)' ,'instructName']
      let status = statues(result);
      res.send({ status: status, data: result.results,invariable:invariable });
    }else if(param.type === 'findApDe'){
      const result = await AllFind.findApDe();
      let invariable = ['buildNumber', 'dormitoryNumber', 'options', 'score']
      let status = statues(result);
      res.send({ status: status, data: result.results,invariable:invariable});
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