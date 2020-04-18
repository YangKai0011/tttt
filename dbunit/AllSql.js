module.exports = {
    '学生信息管理': {
        fn: {
            find: ['findDormitory', 'findDistributed', 'findDetail'],
            add: ['addByInstruct', 'add'],
            del: ['deleteByStudentNumber'],
            update: ['update']
        },

        role: {
            Controller: {
                find: {
                    'findDormitory': 'studentNumber,studentName,grade,department,profession,class,phoneNumber,instructName,instructPhone,stubName,stubPhone',
                    'findDistributed': 'buildNumber,dormitoryNumber'
                }
            },
            Instructor: {
                find: {
                    'findDormitory': 'studentNumber,studentName,grade,department,profession,class,phoneNumber,fatherPhone,motherPhone',
                    'findDistributed': 'buildNumber,dormitoryNumber',
                    'findDetail': 'studentNumber,studentName,grade,department,profession,class,phoneNumber,buildNumber,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone,stubName,stubPhone'
                },
                del: ['deleteByStudentNumber'],
                update: ['update']
            },
            DeLeader: {
                find: {
                    'findDistributed': 'buildNumbher, dormitoryNumber'
                }
            },
            House: {
                find: {
                    'findDormitory': 'studentNumber,studentName,grade,department,profession,class,phoneNumber,instructName,instructPhone,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone',
                    'findDetail': 'grade, profession, dormitoryNumber, phoneNumber, instructName, instructPhone, photo'
                },
                add:{
                    'add': 'studentNumber,studentName,department,profession,grade,class,phoneNumber,instructName,instructPhone,buildNumber,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone,stubName,stubPhone,photo',
                }
            }
        }
    }
}