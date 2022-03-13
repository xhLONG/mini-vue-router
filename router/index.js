// import VueRouter from 'vue-router';
import VueRouter from '../vue-router';
import Vue from 'vue';

import Home from '../views/Home';
import Setting from '../views/Setting';

const routes = [
    {
        path: '/',
        component: Home,
    },{
        path: '/index',
        component: Home,
        children: [{
            path: 'a',
            component: {
                render: h => h('p', 'aa'),
            }
        }]
    },{
        path: '/setting',
        component: Setting,
    }
];

let router = new VueRouter({
    routes,
    mode: 'hash',
})

// 这里的钩子会依次执行，并且只有执行完前一个才会执行下一个。所以执行完这两个钩子需要3000ms
// router.beforeEach((to, from, next) => {
//     setTimeout(() => {
//         console.log('1---beforeEach');
//         next();
//     }, 1000);
// })
// router.beforeEach((to, from, next) => {
//     setTimeout(() => {
//         console.log('2---beforeEach');
//         next();
//     }, 2000);
// })

Vue.use(VueRouter);

export default router;

