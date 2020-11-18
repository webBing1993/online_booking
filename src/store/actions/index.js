import qs from 'qs'
import axios from 'axios'
import router from '../../router/index.js'
import httpTool from '../../tool/httpTool.js'

const actions = {

  goto: (ctx, param) => {
    if (typeof param === 'number') {
       router.go(param)
    } else {
      router.push(param)
    }
  },
  replaceto: (ctx, param) => {
    router.replace(param)
    // console.log('router:',router)
  },


  request: (ctx, param) => {
    ctx.dispatch ('showLoading', true);
    axios({
      url: httpTool.httpUrlEnv() + sessionStorage.getItem('windowUrl') + 'homestay-tenant' + param.url,
      method: param.method || 'GET',
      baseURL: '/',
      headers: {},
      params: param.params || null,
      data: param.body || null,
      timeout: param.timeout || 120000,
    }).then(response => {
      console.log("response",response);
      if (response.data.code == 0) {
        param.onSuccess && param.onSuccess(response)
      }else {
        ctx.dispatch ('showToast', {text: response.body.msg || response.data.errmsg, time: 2000});
        param.onFail && param.onFail(response)
        param.onFail && param.onFail(response)
      }
      ctx.dispatch ('showLoading', false);
    }).catch(
      error => {
        ctx.dispatch ('showLoading', false);
        if(error){
          console.log("error",error);
          console.log('error.response',error.response);
          if (error.response) {

          }else {
          }
          param.onError && param.onError(error);
        }

      }
    )
  },

  resource: (ctx, param) => {
    ctx.dispatch ('showLoading', true);
    axios({
      url: httpTool.httpUrlEnv() + sessionStorage.getItem('windowUrl') + 'homestay-tenant' + param.url,
      method: param.method || 'GET',
      baseURL: '/',
      headers: param.headers || {
        'X-auth-token': localStorage.getItem('tokenCode'),
        'content-Type': 'application/json'
      },
      params: qs.stringify(param.params) || null,
      data: qs.stringify(param.body) || null,
      timeout: param.timeout || 180000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: param.emulateJSON ? param.emulateJSON : true,
    }).then(response => {
      console.log("response",response);
      if (response.data.code == 0 || response.data.errcode == 0) {
        param.onSuccess && param.onSuccess(response)
      }else {
        ctx.dispatch ('showToast', {text: response.body.msg || response.data.errmsg, time: 2000});
        param.onFail && param.onFail(response)
      }
      ctx.dispatch ('showLoading', false);
    }).catch(
      error => {
        ctx.dispatch ('showLoading', false);
        if(error){
          console.log("error",error);
          if (error.response) {

          }else {

          }
          param.onError && param.onError(error);
        }

      }
    )
  },

  // 获取验证码
  getCode (ctx,param){
    ctx.dispatch('request',{
      url: '/auth/sms',
      method: 'POST',
      body: param.data,
      headers: {
        'content-Type': 'application/json'
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      },
      onError:(body, headers) => {
        param.onerror ? param.onerror(body, headers) : null
      },
    })
  },

  // 登录
  loginEntry (ctx,param){
    ctx.dispatch('request',{
      url: '/auth/sms/login',
      method: 'POST',
      body: param.data,
      headers: {
        'content-Type': 'application/json'
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      },
      onError:(body, headers) => {
        param.onerror ? param.onerror(body, headers) : null
      },
    })
  },

  // 首页权限
  getAllConfig(ctx, param) {
    ctx.dispatch('resource', {
      url: '/permission/getByUserId',
      method: 'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
      onFail: body => {
        param.onfail ? param.onfail(body) : null
      },
      onError:(body, headers) => {
        param.onerror ? param.onerror(body, headers) : null
      },
    })
  },

  //查看是否对接PMS
  getPmsFlag(ctx, param) {
    ctx.dispatch('resource', {
      url: '/ecard/orders/get/pmsFlag',
      method: 'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
      onFail:(body, headers) => {
        param.onfail ? param.onfail(body, headers) : null
      },
      onError:(body, headers) => {
        param.onerror ? param.onerror(body, headers) : null
      },
    })
  },

  // 获取预订单列表
  getQueryByPage (ctx, param) {
    ctx.dispatch('resource', {
      url: '/ecard/orders/queryByPage',
      method: 'POST',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      },
      onFail:(body, headers) => {
        param.onfail ? param.onfail(body, headers) : null
      },
      onError:(body, headers) => {
        param.onerror ? param.onerror(body, headers) : null
      },
    })
  },

};
export default {
  actions: actions
}
