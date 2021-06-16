<template>
    <div class="tab-list">
        <div class="top">
            <el-tabs type="card" v-model="tabName">
              <el-tab-pane name="table">
                <span slot="label"><router-link to="/tab/table"><i class="el-icon-notebook-1"></i> 我的表格</router-link></span>
              </el-tab-pane>
              <el-tab-pane name="ul">
                <span slot="label"><router-link :to="{name:'UlList'}"><i class="el-icon-notebook-2"></i> 我的列表</router-link></span>
              </el-tab-pane>
            </el-tabs>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {Tabs,TabPane} from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane);

export default {
    name: 'tabList',
    components: {
    },
    data() {
        return {
            tabName:''
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
    mounted() {
        if(this.$route.fullPath.indexOf("ul") > -1){
            this.tabName = 'ul'
        }else{
            this.tabName = 'table';
        }
    }
};
</script>
<style lang="less">
    .tab-list{
        .el-tabs__header{
            margin-bottom: 0;
        }
        .el-tabs__item{
            a,a:link,a:visited{
                color:#999;
                text-decoration: none;
            }
            a:hover,a:active{
                color:#409EFF;
            }
            &.is-active{
                color:#409EFF;
                background:#FFF;
                a{
                    color:#409EFF;                    
                }
            }
        }
    }
</style>