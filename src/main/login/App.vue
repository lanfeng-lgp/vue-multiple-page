<template>
    <router-view :key="key"></router-view>    
</template>
<script>
export default {
    computed: {
        key() {
            return this.$route.fullPath;
        }
    }
};
</script>
/**
 * 路径 http://localhost:8081/login.html#/
 */