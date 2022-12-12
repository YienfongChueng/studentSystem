<template>
<div class="menu">
    <el-menu
      router
      class="el-menu-vertical-demo"
      background-color="rgba(34, 50, 92, 1)"
      text-color="#fff"
      active-text-color="rgba(70, 133, 255, 0.35)">
      <template v-for="(item,index) in menu" >
        <el-submenu v-if="!item.hidden" :index="item.name + index" :key="item.name + index" >
            <template slot="title" >
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
            </template>
            <el-menu-item-group v-for="(child, index) in item.children" :key="child.name + index">
                <el-menu-item :index="child.path">
                    <i :class="child.meta.icon"></i>
                    {{child.meta.title}}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
      </template>
     
    </el-menu>
</div>
</template>
<script>
export default {
    data() {
        return {
            menu: ''
        }
    },
    created() {
        this.menu = this.$router.options.routes
        console.log(this.menu)
    },

}
</script>
<style lang="less" scoped>
.menu{
    height: 100%;
    border: 0;
    .el-menu {
        width: 100%;
        height: 100%;
        border: 0;
        .fa {
            margin-right: 10px;
            color: #fff;
        }
    }
    .el-submenu .el-menu-item  {
        max-width: 200px;
    }
    .el-submenu /deep/ .el-menu-item:hover {
        background: rgba(37, 124, 221,0.5) !important;
    }
    .el-submenu /deep/ .el-submenu__title:hover {
         background: rgba(37, 124, 221,0.5) !important;
    }
}

</style>