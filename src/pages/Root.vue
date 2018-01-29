<template>
    <div class="wrap">
        <router-view></router-view>
    </div>
</template>

<script>
    import router from 'src/router'
    import store from 'src/vuex'
    import filters from 'filters'

    export default {
        router,
        store,
        filters,
        name: 'root',
        components: {},
        created () {
            this.$router.replace({
                path: 'help'
            })
        }
    }
</script>
