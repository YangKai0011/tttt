const pool = require('./operate');
let sql = [`INSERT  INTO student VALUES(1,'00000000', '张三', '计算机系', '软件工程', '大一', '软工1班','12545841251',  '李四', '12357895145',1, 515, '王五', '20201452012', '36254178521', '36254145281','ww','19181',NULL);`,
`INSERT INTO student VALUES(2,'00000001', '一一', '计算机系', '软件工程', '大二','软工1班' , '12545841231', '二二', '12354595145',1, 517, '三三', '35201452012', '31254178521', '36254145481','ww','19181',NULL);`,
`INSERT INTO student VALUES(3,'00000002', '独孤求败', '计算机系', '软件工程', '大一', '软工1班', '12545841051', '令狐冲', '02357895145', 1, 515,'岳不群', '10201452012', '96254178521', '31254145281','ww','19181',NULL);`,
`INSERT INTO student VALUES(4,'00000003', '韦小宝', '计算机系', '软件工程', '大一','软工1班', '15545840251', '婉儿', '12317895145',  1, 515,'建宁', '90201452012', '36254178520', '36254145081','ww','19181',NULL);`,
`INSERT INTO student VALUES(5,'00000004', '柯南', '警察系', '刑侦', '大二','刑侦3班' , '12545891251', '毛利兰', '12357895115', 2, 515,'工藤新一', '70201452012', '36259178521', '36254045281','qq','190181',NULL);`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(1, 515, 20, 20, 60,'吸烟');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(1, 517, 30, 20, 50,'饲养宠物');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(1, 519, 10, 20, 70,'斯拉软件');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(2, 319, 5, 10, 85,'斯拉软件');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(2, 317, 50, 20, 30,'斯拉软件，阳台');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(2, 315, 40, 20, 40,'斯拉软件');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violationssc, neatItemssc, score,optiones) VALUES(2, 310, 20, 30, 50,'斯拉软件');`
];
 function insertData() {
    for (let i = 0; i < sql.length; i++) {
        pool.query(sql[i], function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        });
    }

}
insertData();

