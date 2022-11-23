<template>
<div class="header">
   <div class="logo">
       xxx后台系统
   </div>
   <div class="user-info">
       <span>欢迎 {{userName}}</span>
   </div>
</div>
</template>
<script>
import { getToken } from  '@/utils/auth'
export default {
    data() {
        return {
            userName: ''
        }
    },
    created() {
        this.userName = getToken('username') || '--'
    },

}

</script>
<style lang="less" scoped>
.header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #409EFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing:border-box;
    .logo {
        font-size: 30px;
        color: #fff;
    }
    .user-info {
        font-size: 14px;
        color: #fff;
    }
}
</style>