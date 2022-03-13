<template>
    <div>
        <router-link to="/index">首页</router-link>
        |
        <router-link to="/setting">设置</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    create(){
        console.log(this.$router);
        console.log(this.$route);
    }
}
</script>

<style>

</style>