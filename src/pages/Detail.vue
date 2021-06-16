<template>
    <div class="Detail">
        <p>params:{{routerPData}}</p>
        <p>query:{{routerQData}}</p>
    </div>
</template>
<script>

export default {
    name: 'Detail',
    components: {
    },
    data() {
        return {
        }
    },
    watch: {

    },
    computed: {
        routerPData(){
            let data = {};
            data = this.$route.params;
            return JSON.stringify(data);
        },
        routerQData(){
            let data = {};
            data = this.$route.query;
            return JSON.stringify(data);
        }

    },
    filters: {

    },
    methods: {

    },
    mounted() {
        console.log(this.$route);
        console.log(this)
    }
};
</script>
<style lang="less">
    .Detail{
        
    }
</style>