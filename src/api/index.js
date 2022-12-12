import request  from "@/utils/request";
import qs from 'qs'

export function loginApi(data) {
    return request({
        method: 'post',
        url: '/login',
        data
    })
}

// 学生列表查询
export function getStudentList(params) {
    return request({
        method: 'get',
        url: '/students',
        params
    })
}

// 学生列表删除
export function deleteStudentById(id) {
    return request({
        method: 'delete',
        url: `/students/${id}`
    })
}

// 信息列表查询
export function getInfoList() {
    return request({
        method: 'get',
        url: '/info'
    })
}

// 信息新增
export function addInfo(data) {
    return request({
        method: 'post',
        url: '/info',
        data: qs.stringify(data)
    })
}

//  信息修改
export function updateInfo(data) {
    return request({
        method: 'put',
        url: '/info',
        data: qs.stringify(data)
    })
}

// 信息删除
export function deleteInfoById(id) {
    return request({
        method: 'delete',
        url: `/info/${id}`
    })
}

// 作业列表分页查询
export function getWorkList(params) {
    return request({
        method: 'get',
        url:'/works',
        params
    })
}


export function getDataview() {
    return request({
        method: 'get',
        url: 'dataview'
    })
}

// 旅游地图接口
export function gettravelData() {
    return request({
        method: 'get',
        url: '/travel'
    })
}