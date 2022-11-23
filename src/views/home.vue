<template>
<div class="home">
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container class="main-container">
            <el-aside width="200px">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-main>
                    <Breadcrumb></Breadcrumb>
                    <div class="main-wrap">
                        <router-view></router-view>
                    </div>
                </el-main>
                <el-footer>
                    <Footer></Footer>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</div>
</template>
<script>
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Menu from '@/components/layout/menu'
import Breadcrumb from '@/components/layout/breadcrumb'

export default {
    components: {
        Header,Footer,Menu, Breadcrumb
    },
    data() {
        return  {

        }
    }
}
</script>
<style lang="less" scoped>
.home {
    .el-header, .el-footer{
        padding: 0;
    }
    .main-container {
        height: calc(100vh - 60px);
    }
    /deep/ .el-card__body {
        max-height: 600px;
        overflow: auto;
    }
}

</style>