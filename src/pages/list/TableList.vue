<template>
    <div class="table-list">
        <template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

export default {
    name: 'tableList',
    components: {},
    data() {
        return {
            tableData:[]
        }
    },
    watch: {

    },
    computed: {

    },
    filters: {

    },
    methods: {

    },
    created(){
        for (var i = 1; i <= 15; i++) {
            this.tableData.push({
              date: ('2016-05-'+i),
              name: '王小虎',
              address: `上海市宝山区张苗街区 ${parseInt(Math.random()*3000)} 弄`
            });
        }
    },
    mounted() {
        console.log('startTable')

    }
};
</script>
<style lang="less">
.table-list {}
</style>