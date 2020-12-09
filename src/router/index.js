import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'blockPage',
      component: resolve => require(['../components/blockPage/index'],resolve),
    },
    {
      path: '/homeIndex',
      name: 'homeIndex',
      component: resolve => require(['../components/homeIndex/index.vue'], resolve),
      meta: {
        title: '入住登记'
      },
    },
    {
      path: '/homeHome',
      name: 'homeHome',
      component: resolve => require(['../components/homeIndex/home.vue'], resolve),
      meta: {
        title: '入住登记'
      },
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (from.name != null || from.name != 'login') {
    router.onError((error) => {
      console.log("error.response", error.response);
      if (error.response) {

      }else {
        const pattern = /Loading chunk (\d)+ failed/g;
        const isChunkLoadFailed = error.message.match(pattern);
        if (isChunkLoadFailed) {
          // router.push('/');
          // Vue.prototype.$toast({
          //   message: "版本升级，请重新登录",
          //   iconClass: 'icon ',
          // });
          // // window.location.href = url;
          // setTimeout(() => {
          //   jsObj.LogOut();
          // }, 1000)
        }
      }
      return;
    });
    next();
  }else {
    // router.onError((error) => {
    //   Vue.prototype.$toast({
    //     message: '网络断开连接',
    //     iconClass: 'icon ',
    //   });
    //   return;
    // });
    next();
  }
});



export default router
