<template>
    <el-container class="layout-wrap">
        <el-header class="layout-header" height="100px"></el-header>
        <el-container>
            <el-aside width="230px" class="layout-aside">
                <el-menu default-active="2" background-color="transparent" :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>目录</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2" route="/">
                        <i class="el-icon-cloudy-and-sunny"></i>
                        <span slot="title">图集</span>
                    </el-menu-item>
                    <el-menu-item index="3" route="/echarts">
                        <i class="el-icon-lightning"></i>
                        <span slot="title">图表</span>
                    </el-menu-item>
                    <el-menu-item index="4" route="/table">
                        <i class="el-icon-lightning"></i>
                        <span slot="title">表单</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>记录</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1" route="/tab/table">表格</el-menu-item>
                            <el-menu-item index="5-2" route="/tab/ul">列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main class="layout-main">
                    <div class="layout-main-inner">
                        <router-view :key="key"></router-view>
                    </div>
                    <el-footer class="layout-footer" height="40px">
                        <span>Copyright © 2012 - {{thisYear}}. All Rights Reserved. XXXX有限公司&nbsp;沪ICP备1888888888号-1</span>
                    </el-footer>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import Vue from 'vue';
import { Container, Header, Aside, Main, Footer,Menu,Submenu,MenuItem,MenuItemGroup} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

export default {
    data() {
        let thisDate = new Date();
        return {
            thisYear: thisDate.getFullYear(),
            toHome:{
                path:'/',
            },
            toEchats:{
                path:'/Echarts',
            },
        }
    },
    computed: {
        key() {
            return this.$route.fullPath;
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath,1);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath,1);
      }
    },
    mounted() {},
};
</script>
<style lang="less">
@headerHeight: 100px;
@asideWidth: 230px;
@footerHeight: 40px;

.layout-wrap {
    .layout-header {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1006;
        width: 100%;
        background:#8fb1ff;
    }
    .layout-aside {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1005;
        padding-top: @headerHeight;
        height: 100%;
        background:#FFF;
        border-right: solid 1px #e6e6e6;
        user-select: none;
        .el-menu{
            border-right:none;
        }
    }
    .layout-main {
        margin: @headerHeight 0 0 @asideWidth;
        padding:0;
    }
    .layout-main-inner{
        min-height:calc(100vh - @headerHeight - @footerHeight);        
    }
    .layout-footer{
        font-size:12px;
        line-height:@footerHeight;
        text-align:center;
        color:#333;
        user-select:none;
    }
}
</style>