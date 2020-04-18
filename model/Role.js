module.exports = {


    Controller: {
       oper: { '学生住宿信息管理': ['查询', '宿舍平面图显示'] /* },  '导员信息维护': [] ,  '宿舍评比、奖惩': [] */},
       学生住宿信息管理:{
            find: [{'findDormitory':['buildNumber','dormitoryNumber']}, {'findDistributed':['grade','profession']}],
       }
    },
    Instructor: {
        oper: {'学生住宿信息管理': ['查询','导入','单个添加','修改']},
        学生住宿信息管理:{
            find: [{'findDormitory':['buildNumber','buildNumber']},{'findDetail':['studentName','studentName']},{'findDistributed':['grade','profession']}]
        }
    },

    DeLeader:{
        oper: {'学生住宿信息管理': ['查询']},
        学生住宿信息管理:{
            find:[{}]
        }
    },

    House:{
        oper: {'学生住宿信息管理': ['查询']}
    }
}