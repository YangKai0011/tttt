const pool = require('./operate');
let sql = [
`INSERT INTO departmentmajor VALUE('机械系','产品设计'),('机械系','机械设计制造及其自动化'),('机械系','中职升本');`,
`INSERT INTO departmentmajor VALUE('信息系','自动化'),('信息系','通信工程'),('信息系','电子信息工程'),('信息系','电气工程及其自动化'),('信息系','物联网工程');`,
`INSERT INTO departmentmajor VALUE('计算机系','计算机科学与技术'),('计算机系','软件工程');`,
`INSERT INTO departmentmajor VALUE('建筑系','环境设计'),('建筑系','建筑学');`,
`INSERT INTO departmentmajor VALUE('管理系','财务管理'),('管理系','工程管理'),('管理系','金融工程'),('管理系','物流工程'),('管理系','信息管理与信息系统');`,
`INSERT INTO departmentmajor VALUE('文法系','法学'),('文法系','英语'),('文法系','商务英语');`,
`INSERT INTO departmentmajor VALUE('建工系','土木工程'),('建工系','给排水科学与工程'),('建工系','水利水电工程'),('建工系','港口航道与海岸工程'),('建工系','船舶与海洋工程');`,
`INSERT INTO departmentmajor VALUE('化工系','化学工程与工艺'),('化工系','化学工程与工艺（制药）'),('化工系','过程装备与控制工程'),('化工系','过程装备与控制工程（新能源）');`,
`INSERT INTO departmentmajor VALUE('艺术系','动画'),('艺术系','动画专升本');`,
`INSERT  INTO student VALUE(1,'00000000', '张三', '计算机系', '软件工程', '大一', '软工1班','12545841251',  '李四', '12357895145',1, 515, '王五', '20201452012', '36254178521', '36254145281','ww','19181',NULL);`,
`INSERT INTO student VALUE(2,'00000001', '一一', '计算机系', '软件工程', '大二','软工1班' , '12545841231', '二二', '12354595145',1, 517, '三三', '35201452012', '31254178521', '36254145481','ww','19181',NULL);`,
`INSERT INTO student VALUE(3,'00000002', '独孤求败', '计算机系', '软件工程', '大一', '软工1班', '12545841051', '令狐冲', '02357895145', 1, 515,'岳不群', '10201452012', '96254178521', '31254145281','ww','19181',NULL);`,
`INSERT INTO student VALUE(4,'00000003', '韦小宝', '计算机系', '软件工程', '大一','软工1班', '15545840251', '婉儿', '12317895145',  1, 515,'建宁', '90201452012', '36254178520', '36254145081','ww','19181',NULL);`,
`INSERT INTO student VALUE(5,'00000004', '柯南', '机械系', '产品设计', '大二','机械3班' , '12545891251', '毛利兰', '12357895115', 2, 515,'工藤新一', '70201452012', '36259178521', '36254045281','qq','190181',NULL);`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(1, 515, 20, 20, 60,'吸烟');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(1, 517, 30, 20, 50,'饲养宠物');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(1, 519, 10, 20, 70,'斯拉软件');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(2, 319, 5, 10, 85,'斯拉软件');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(2, 317, 50, 20, 30,'斯拉软件，阳台');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(2, 315, 40, 20, 40,'斯拉软件');`,
`INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(2, 310, 20, 30, 50,'斯拉软件');`,
`INSERT INTO buildingmanagement VALUE(1,515,'储藏室',null);`,
`INSERT INTO buildingmanagement VALUE(1,517,'浴室',null);`,
`INSERT INTO buildingmanagement VALUE(1,313,NULL,null);`,
`INSERT INTO grademajor VALUE('大一');`,
`INSERT INTO grademajor VALUE('大二');`,
`INSERT INTO grademajor VALUE('大三');`,
`INSERT INTO grademajor VALUE('大四');`,
`INSERT INTO buildmajor VALUE(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20);`,
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

