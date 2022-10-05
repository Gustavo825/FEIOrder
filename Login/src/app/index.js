import Vue from 'vue';
import App from './App.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter( {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
    ]
}); 

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
