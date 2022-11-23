<template>
    <div class="info-list">
        <el-card class="card-wrap">
            <el-row>
                <el-button size="small" @click="handleAdd" type="primary" icon="el-icon-plus">新增</el-button>
            </el-row>
             <!-- table -->
            <el-table
                :data="pageData"
                style="width: 100%">
                <el-table-column
                    v-for="(item,index) in columnArr" :key="index"
                    :prop="item.value"
                    :label="item.label"
                    :width="item.width">
                    <template v-slot= "{ row }">
                        <span v-if="item.value === 'sex' ">
                            {{ $utils.filterEunmusLabel(row[item.value],SEX)}}
                        </span>
                        <span v-else>{{ row[item.value] ? row[item.value] : '--' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                        <el-button size="small" @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

            <!-- 弹窗 -->
            <el-dialog 
                :title="dialogTitle" 
                :visible.sync="infoDialogVisible" 
                @close="handleCancel"
                width="600px">
                <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="姓名" prop="name" >
                        <el-input v-model="info.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input  v-model="info.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="info.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="父亲" >
                        <el-input v-model="info.father" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="母亲" >
                        <el-input v-model="info.mather" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="入校时间" prop="time">
                        <el-date-picker 
                            type="date" 
                            placeholder="选择日期" 
                            v-model="info.time" 
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="家庭地址" prop="address">
                        <el-input v-model="info.address" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="info.phone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">保存</el-button>
                </div>
            </el-dialog>

        </el-card>
    </div>
</template>
<script>
import { infoColumn } from '@/utils/tableColumn.js'
import { SEX } from '@/utils/constant.js'
import { phoneRule, ageRule } from '@/utils/validate.js'
import { getInfoList, addInfo, updateInfo, deleteInfoById } from  '@/api'
export default {
     data() {
        return {
            tableData: [],
            pageData: [],
            columnArr: infoColumn,
            SEX: SEX,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            infoDialogVisible: false,
            info: {
                sex: 1
            },
            rules: {
                name: [{required: true, message: '请输入学生姓名', trigger: 'blur' }],
                age: [{required: true, validator: ageRule, trigger: 'blur' }],
                sex: [{required: true, message: '请输入学生性别', trigger: 'blur' }],
                time: [{required: true, message: '请选择入校时间', trigger: 'blur' }],
                address: [{required: true, message: '请输入家庭地址', trigger: 'blur' }],
                phone: [{required: true,validator: phoneRule, trigger: 'blur' }],
            },
            dialogTitle: '新增学生信息'
        }
    },
    
    mounted() {
        this.getTableData()
    },
    methods: {
        handlePageData() {
             this.pageData =  this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
        getTableData() {
            getInfoList().then(res => {
                this.tableData = res.data
                this.total = this.tableData.length
                // 前端分页
                this.handlePageData()
            })
        },
        handleDelete(row) {
             this.$confirm(`确定要删除${row.name}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteInfoById(row.id).then(res => {
                    this.getTableData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleCancel() {
            this.info = {
                sex: 1
            }
            this.$refs['ruleForm'].resetFields();
            this.infoDialogVisible = false
        },
        handleSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                 if (!valid) {
                     this.$message.warning('请检查表单内容')
                     return false
                 }
                 if (this.info.id) {
                     // 修改
                     updateInfo(this.info).then(res => {
                         this.$message.success('修改学生信息成功')
                         this.infoDialogVisible = false
                         this.getTableData()
                     })
                 } else {
                     // 新增
                     addInfo(this.info).then(res => {
                         this.$message.success('新增学生信息成功')
                         this.infoDialogVisible = false
                         this.getTableData()
                     })
                 }
            })
        },
        handleAdd() {
            this.infoDialogVisible = true
            this.dialogTitle = "新增学生信息"

        },
        handleEdit(row) {
            this.infoDialogVisible = true
            this.dialogTitle = "修改学生信息"
            this.info = { ...row }
        },
        handleSizeChange(val) {
            this.currentPage = 1
            this.pageSize = val
            this.getTableData()

        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getTableData()
        }
    }
}
</script>
<style lang="less" scoped>
</style>