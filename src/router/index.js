import Vue from 'vue'
import Router from 'vue-router'
import Pages from 'pages'

Vue.use(Router)

const router = new Router({
    component: Pages.Root,
    routes: [
        {
            path: '/help',
            component: Pages.Help
        },
        {
            path: '/test',
            component: Pages.Test
        }
    ],
    mode: 'history'
})

export default router
