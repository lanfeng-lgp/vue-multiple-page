<template>
    <div>
        <router-view :key="key"></router-view>
        <router-view name="footer"></router-view>
    </div>  
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