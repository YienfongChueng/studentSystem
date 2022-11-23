import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: 'Index',
        hidden: true,
        meta: {auth: '',icon: '',title: '首页'},
        component: () => import('@/views/Login')
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        meta: {auth: '',icon: '',title: '登陆'},
        component: () => import('@/views/Login')
    },
    
    {
        path: '/student',
        name: 'student',
        hidden: false,
        meta: {auth: '',icon: 'fa fa-users',title: '学生管理'},
        redirect: '/student/student-list',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/student/student-list',
                name: 'studentList',
                hidden: false,
                meta: {auth: '', icon: 'fa fa-th-list', title: '学生列表'},
                component: () => import('@/views/student/studentList'),
            },
            {
                path: '/student/info-list',
                name: 'infoList',
                hidden: false,
                meta: {auth: '', icon: 'fa fa fa-th-list', title: '信息列表'},
                component: () => import('@/views/student/infoList'),
            },
            {
                path: '/student/work-list',
                name: 'workList',
                hidden: false,
                meta: {auth: '', icon: 'fa fa-th-list', title: '作业列表'},
                component: () => import('@/views/student/workList'),
            },
        ]
    },
    {
        path: '/data-analysis',
        name: 'dataAnalysis',
        hidden: false,
        meta: {auth: '',icon: 'fa fa-area-chart',title: '数据分析'},
        redirect: '/data-analysis/data-view',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/data-analysis/data-view',
                name: 'dataView',
                hidden: false,
                meta: {auth: '', icon: 'fa fa-line-chart', title: '数据概览'},
                component: () => import('@/views/dataAnalysis/dataView'),
            },
            {
                path: '/data-analysis/map-view',
                name: 'mapView',
                hidden: false,
                meta: {auth: '', icon: 'fa fa-line-chart', title: '地图概览'},
                component: () => import('@/views/dataAnalysis/mapView'),
            },
            {
                path: '/data-analysis/travel-map',
                name: 'travelMap',
                hidden: false,
                meta: {auth: '', icon: 'fa fa-line-chart', title: '旅游地图'},
                component: () => import('@/views/dataAnalysis/travelMap'),
            },
            {
                path: '/data-analysis/score-map',
                name: 'scoreMap',
                hidden: false,
                meta: {auth: '', icon: 'fa fa-line-chart', title: '分数地图'},
                component: () => import('@/views/dataAnalysis/scoreMap'),
            },
        ]
    },
    {
        path: '/users',
        name: 'users',
        hidden:false,
        meta: {auth: '',icon: 'fa fa-user-circle-o',title: '用户中心'},
        redirect: '/users/auth-manage',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/users/auth-manage',
                name: 'authManage',
                hidden: false,
                meta: {auth: '',icon: 'fa fa-key', title: '权限管理'},
                component: () => import('@/views/userCenter/authManage')
            }
        ]
    },
    {
        path: '*',
        name: 'NotFound',
        hidden: true,
        meta: {auth: '',icon: '',title: '404'},
        component: () => import('@/views/NotFound')
    }
]

export default new Router({
    routes,
    mode: 'history'
})