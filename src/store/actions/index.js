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
    // ctx.dispatch ('showLoading', true);
    axios({
      url: httpTool.httpUrlEnv() + sessionStorage.getItem('windowUrl') + 'homestay-tenant' + param.url,
      method: param.method || 'GET',
      baseURL: '/',
      headers: param.headers || {
        'X-auth-token': sessionStorage.getItem('tokenId') != 'null' ? sessionStorage.getItem('tokenId') : ' 152031ea-2453-420d-a105-a2e34a73c7db',
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
        // ctx.dispatch ('showToast', {text: response.body.msg || response.data.errmsg, time: 2000});
        param.onFail && param.onFail(response)
      }
      // ctx.dispatch ('showLoading', false);
    }).catch(
      error => {
        // ctx.dispatch ('showLoading', false);
        if(error){
          console.log("error",error);
          param.onError && param.onError(error);
        }

      }
    )
  },
  resource_: (ctx, param) => {
    let url = '';
    if (sessionStorage.getItem('windowUrl') == '/q/master/') {
      url = httpTool.httpUrlEnv() + 'baiduApi' + param.url;
    }else {
      url = 'https://aip.baidubce.com'+param.url;
    }
    axios({
      url: url,
      method: param.method || 'GET',
      baseURL: '/',
      data: param.body,
      timeout: param.timeout || 180000,
      credentials: false,
      emulateHTTP: false,
      emulateJSON: param.emulateJSON ? param.emulateJSON : true,
    }).then(response => {
      console.log("response",response);
      if (response.error_code == 0) {
        param.onSuccess && param.onSuccess(response)
      }else {
        param.onFail && param.onFail(response)
      }
    }).catch(
      error => {
        if(error){
          console.log("error",error);
          param.onError && param.onError(error);
        }

      }
    )
  },

  // 获取百度token
  baiduToken (ctx, param) {
    ctx.dispatch('resource', {
      url: '/order/'+param.roomOrderId+'/guest/check/verifyToken',
      method: 'PUT',
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

  // 查询接口
  getResult(ctx, param) {
    ctx.dispatch('resource_', {
      url: '/rpc/2.0/brain/solution/faceprint/result/detail',
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
