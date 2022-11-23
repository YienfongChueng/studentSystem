<template>
    <div class="work-list">
        <el-card class="card-wrap">
             <!-- table -->
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    v-for="(item,index) in columnArr" :key="index"
                    :prop="item.value"
                    :label="item.label"
                    :width="item.width">
                    <template v-slot= "{ row }">
                        <span v-if="item.value === 'completed' ">
                            {{ $utils.filterEunmusLabel(row[item.value],COMPLETED_STATUS)}}
                        </span>
                        <span v-else>{{ row[item.value] ? row[item.value] : '--' }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10,20,50,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { worksColumn } from '@/utils/tableColumn.js'
import { COMPLETED_STATUS } from '@/utils/constant.js'
import { getWorkList } from  '@/api'
export default {
     data() {
        return {
            tableData: [],
            pageData: [],
            columnArr: worksColumn,
            COMPLETED_STATUS: COMPLETED_STATUS,
            currentPage: 1,
            pageSize: 10,
            total: 0,
        }
    },
    
    mounted() {
        this.getTableData()
    },
    methods: {
        getTableData() {
            const params = {
                page: this.currentPage,
                size: this.pageSize
            }
            getWorkList(params).then(res => {
                this.tableData = res.data
                this.total = res.total
            })
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