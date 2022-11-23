<template>
    <div class="student-list">
        <el-card class="card-wrap">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input size="small" v-model="formInline.name" placeholder="请输入学生姓名查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  size="small" @click="query">查询</el-button>
                    <el-button size="small" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
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
                        <span v-else-if="item.value === 'state' ">
                            {{ $utils.filterEunmusLabel(row[item.value],STUDENT_STATE)}}
                        </span>                    
                        <span v-else>{{ row[item.value] ? row[item.value] : '--' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
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
        </el-card>
    </div>
</template>
<script>
import { studentColumn } from '@/utils/tableColumn.js'
import { STUDENT_STATE , SEX } from '@/utils/constant.js'
import { getStudentList, deleteStudentById } from  '@/api'
export default {
    data() {
        return {
            formInline: {
                name: ''
            },
            tableData: [],
            pageData: [],
            columnArr: studentColumn,
            STUDENT_STATE: STUDENT_STATE,
            SEX: SEX,
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    },
    
    mounted() {
        this.getTableData()
    },
    methods: {
        query() {
            this.getTableData()
        },
        reset() {
            this.formInline = {
                name: ''
            }
            this.getTableData()
        },
        handlePageData() {
            if (this.formInline.name) {
                this.currentPage = 1
            }
             this.pageData =  this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
        getTableData() {
            getStudentList(this.formInline).then(res => {
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
                deleteStudentById(row.id).then(res => {
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