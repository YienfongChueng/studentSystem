export function nameRule (rule, value, callback) {
    // 4-10位昵称
    let reg = /^([a-zA-Z0-9]{4,10})$/
    if(value === '') {
        callback(new Error('请输入用户名'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位用户名'))
    } else {
        callback()
    }
}

export function passwordRule (rule, value, callback) {
    //  6-12位密码需要包含大小写字母和数字以及特殊符号
    let reg = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入6-12位密码需要包含大小写字母和数字以及特殊符号'))
    }else {
        callback()
    }
}

export function phoneRule(rule, value, callback) {
    let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if(value === '') {
        callback(new Error('请输入手机号码'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
    } else {
        callback()
    }
    
}

export function ageRule(rule, value, callback) {
    let reg = /^(?:[1-9][0-9]?|1[01][0-9]|99)$/
    if(value === '') {
        callback(new Error('请输入年龄'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入大于0小于99的年龄'))
    } else {
        callback()
    }

}