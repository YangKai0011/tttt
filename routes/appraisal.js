var express = require('express');
var router = express.Router();
const AppraisalCurd = require('../model/AppraisalCurd');
//宿舍评比信息
router.post('/insertAppraisal', (req, res) => {
  const param = req.body;
  /* let violations = param.  + param. + param. + param.; */
  /* let neatItems = param. + param. + param. */
  /* let score = 100 - (violations + neatItems); */
  let paramArr = [param.buildNumber, param.dormitoryNumber, violations, neatItems, score, param.buildNumber, param.dormitoryNumber];
  AppraisalCurd.insertApprisal(paramArr).then(data(req, res));
});


/* router.get('/', (req, res, next) => {
  const param = req.query;
  if(param.role === 'Controller'){
    //到每个导员所管辖的年级专业算平均分

  }
}) */

function data(req, res) {
  return function (data) {
    if (!data.err) {
      const results = data.results;
      res.send(results);
    } else {
      res.send(data.err);
    }
  };
}
module.exports = router;