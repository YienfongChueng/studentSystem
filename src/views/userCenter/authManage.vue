<template>
  <div>
    <el-tree
      :data="menus"
      show-checkbox
      node-key="name"
      :props="defaultProps"
      ref="tree">
    </el-tree>
    <el-button @click="getCheckedNodes">通过node获取</el-button>
  </div>
</template>
<script>
export default {
    data() {
        return {
            menus: [],
            defaultProps: {
                label: 'label',
                children: 'children'
            }
        }
    },
    created() {
        this.menus = [...this.$router.options.routes]
        this.menus = this.dealData(this.menus)
        // 权限管理和动态路由的思路：
        // 根据不同的用户登录上来,返回对应的路由权限菜单
        // 一般可以通过树形控件达到权限的精准控制，根据不同角色，勾选不同的菜单权限，将菜单数据提交给后端进行保存
        // 后端保存之后，在用户进行登录的时候就会查询该用户或该角色所拥有的菜单数据，最终进行动态的渲染展示。
        // 动态添加路由使用router.addRoutes(vue-router3.x版本方法,已废弃)方法,后续使用router.addRoute进行动态路由添加
    },
    methods: {
        dealData(list) {
            return list.filter(d => !d.hidden).map(item => {
                    item.label = item.meta.title || item.name
                    if(item.children && item.children.length > 0) {
                        this.dealData(item.children)
                    }
                    return item
            })

        },
        getCheckedNodes() {
            let arr = this.$refs.tree.getCheckedNodes()
            console.log(arr)
        }
    }
}
</script>