<template>
    <div class="page-404">
        <img :src="imageNull" alt="">
    </div>
</template>
<script>
import imgNoFoundSrc from '@/assets/images/404.png';
export default {
    name: 'page-404',
    components: {
    },
    data() {
        return {
            imageNull:imgNoFoundSrc
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

    }
};
</script>
<style lang="less">
    .page-404{
        padding-top: 10%;
        text-align: center;
    }
</style>