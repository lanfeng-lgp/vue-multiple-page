<template>
    <div class="home">
        <el-image style="width: 100px; height: 100px" :src="imgClickSrc" :preview-src-list="srcList"></el-image>
        <el-button @click="onPreview">预览图片</el-button>
        <div class="clr-fff">
            <el-image-viewer v-show="showViewer" :on-close="closeViewer" :url-list="srcList"></el-image-viewer>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button,Image } from 'element-ui';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
Vue.use(Image);
Vue.use(Button);

export default {
    name: 'home',
    components: {
        ElImageViewer
    },
    data() {
        return {
            showViewer: false, // 显示查看器
            imgClickSrc:require("@/assets/logo.png"),
            srcList:[require("@/assets/images/a1.jpeg"),require("@/assets/images/a2.jpeg"),require("@/assets/images/a3.jpeg"),require("@/assets/images/a4.jpeg")]
        }
    },
    watch: {

    },
    computed: {

    },
    filters: {

    },
    methods: {
        onPreview() {
          this.showViewer = true
        },
        // 关闭查看器
        closeViewer() {
          this.showViewer = false
        }

    },
    mounted() {
        let postUrl = './src/assets/json/data1.json';
        let postData = {};
        this.$http.ajax("Get",postUrl,postData,function(result){
            console.log(result);
        },function(err){
            console.log(err)
        },true)
    }
}
</script>
<style lang="less">
    .page-demo{
        
    }
</style>