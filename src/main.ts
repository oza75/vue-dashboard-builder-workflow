import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import VueDashboard from '@/dashboard/src';
import VueDashboard from 'vue-dashboard-builder';
import ProductEntity from './entities/ProductEntity';
import 'vue-dashboard-builder/dist/css/generator.min.css';
// import '@/dashboard/dist/css/generator.min.css';
import SupplierEntity from '@/entities/SupplierEntity';
import CategoryEntity from '@/entities/CategoryEntity';
import User from '@/entities/User';
import Order from '@/entities/Order';
import UserEntity from '@/entities/UserEntity';

Vue.config.productionTip = false;
Vue.use(VueDashboard, {
  router, // give it the router then it can add routes
  entities: [
    new UserEntity()
  ], // Add your entities here
  config: {
    updateMethod: 'POST',
    baseUrl: 'http://lof.test/api/admin',
    responseResolver: {
      data: (res: any) => res.data.data
    },
    loginForm: {
      title: 'Login',
      buttonText: 'Login',
      url: '/login',
      retrieveAccessToken: (res: any) => res.data.access_token,
      fields: [
        {
          label: 'Téléphone',
          name: 'phone',
          type: 'tel'
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password'
        }]
    }
    // Specify where your data can be fetched
    // override the other default configuration here
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
