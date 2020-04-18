module.exports = {
    SelectHashTable = {
        'findDormitory': '按照宿舍号楼号查询',
        'findDistributed': '按照年级专业查询',
        'findDetail': '按照学号姓名查询'
    },

    Controller: {
       oper: { '学生住宿信息管理': ['查询', '宿舍平面图'] /* },  '导员信息维护': [] ,  '宿舍评比、奖惩': [] */},
       学生住宿信息管理:{
            find: {'findDormitory':['buildNumber','dormitoryNumber'], 'findDistributed':['grade','profession']},
       }
    },
    Instructor: {
        oper: {'学生住宿信息管理': ['查询','添加','修改']},
        学生住宿信息管理:{
            find: {'findDormitory':['buildNumber','dormitoryNumber'],'findDetail':['studentName','studentNumber'],'findDistributed':['grade','profession']}
        }
    },

    DeLeader:{
        oper: {'学生住宿信息管理': ['查询']},
        学生住宿信息管理:{
            find:{'findDistributed':['grade','profession']}
        }
    },

    House:{
        oper: {'学生住宿信息管理': ['查询']},
        学生住宿信息管理:{
            find:{'findDormitory':['dormitoryNumber'],'findStub':['grade','profession','department'],'findDetail':['studentName','studentNumber']}
        }
    },
}