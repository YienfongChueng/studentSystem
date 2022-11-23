<template>
<div class="my-breadcrumd">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in crumbList" :key="item.name" >
        {{item.meta.title}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>
<script>
export default {
    data() {
        return  {
            crumbList: []
        }
    },
     watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
        
    },
    methods: {
        getBreadcrumb() {
            this.crumbList = this.$route.matched
        }
    },


}
</script>
<style lang="less" scoped>
.my-breadcrumd {
    height: 40px;
}
</style>