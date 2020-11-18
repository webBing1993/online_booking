<template>
  <div>
    <div class="login">
      <div class="bg">
        <img src="../../assets/bg_login.png" alt="">
      </div>
      <div class="login_container">
        <div class="title">网约房系统住客端</div>
        <div class="login_lists">
          <div class="list">
            <input name="phone" type="tel" min="1" id="input_id" placeholder="请输入手机号" v-model="phone" maxlength="11"/>
            <el-button :plain="true" v-if="btntxt != '获取验证码' && btntxt != '重新获取'" class="btns btning">{{btntxt}}</el-button>
            <el-button :plain="true" @click="sendcode" :class="btntxt == '获取验证码' || btntxt == '重新获取' ? 'btns' : 'btns btning'" v-else>{{btntxt}}</el-button>
          </div>
          <div class="list">
            <input type="text" placeholder="请输入验证码" v-model="code" maxlength="6"/>
          </div>
        </div>
        <div class="login_btns">
          <el-button :loading="loginLoading" @click="login" class="loginBtn">登录</el-button>
          <!--<el-button class="phoneBtn"><img src="../../assets/ic_wechat.png" alt=""><span>使用微信手机号登录</span></el-button>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex';
  export default {
    name: 'login',
    components: {},
    data () {
      return {
        disabled:false,
        time:0,
        btntxt: "获取验证码",
        code: '',
        phone: '',
        loginLoading: false
      }
    },
    methods: {
      ...mapActions([
        'goto', 'getCode', 'loginEntry'
      ]),

      //验证手机号码部分
      sendcode(){
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
        if(this.phone == ''){
          this.$message('请输入手机号码');
        }else if(!reg.test(this.phone)){
          this.$message.error('手机格式不正确');
        }else{
          this.time = 60;
          this.disabled = true;
          this.getCode({
            data: {
              phoneNumber: this.phone
            },
            onsuccess: body => {
              console.log('body.data', body.data);
              if (body.data.code == 0) {
                if (body.data.data == '' || body.data.data == null) {
                  this.phoneCode = 1;
                  this.timer();
                }else {

                }
              }else {
              }
            },
            onfail: body => {

            }
          })
        }
      },

      timer() {
        if (this.time > 0) {
          this.time--;
          this.btntxt = this.time+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time = 0;
          this.btntxt = "重新获取";
          this.disabled = false;
        }
      },

      // 登录
      login(){
        let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
        if(this.phone == ''){
          this.$message('请输入手机号码');
        }else if(!reg.test(this.phone)){
          this.$message.error('手机格式不正确');
          if (this.code == '') {
            this.$message('请输入验证码');
          }else if (this.code.length > 6) {
            this.$message('请输入６位数验证码');
          }
        }else {
          if (this.code == '') {
            this.$message('请输入验证码');
          } else if (this.code.length != 6) {
            this.$message('请输入６位数验证码');
          } else {
            this.loginLoading = true;
            this.loginEntry({
              data: {
                phoneNumber: this.phone,
                smsCode: this.code
              },
              onsuccess: body => {
                console.log('body:',body);
                if (body.data.code == 0 && body.data.data) {

                }
              },
              onfail: body => {
              },
              onerror: body => {
              }
            })
          }
        }
      },

    },

    mounted () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .login {
    position: relative;
    .bg {
      width: 100vw;
      height: 100vh;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .login_container {
      position: absolute;
      left: 0;
      top: 110px;
      width: 100%;
      .title {
        font-size: 40px;
        color: #FFFFFF;
        font-weight: bold;
      }
      .login_lists {
        margin-top: 84px;
        padding: 0 100px;
        .list {
          border-bottom: 1px solid #EEEEEE;
          padding: 24px 0;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          input {
            background-color: transparent;
            outline: none;
            border: none;
            font-size: 30px;
            color: #fff;
          }
          input:-moz-placeholder {
            color: #fff;
            opacity: .86;
          }
          input:-ms-input-placeholder {
            color: #fff;
            opacity: .86;
          }
          input::-moz-placeholder {
            color: #fff;
            opacity: .86;
          }
          input::-webkit-input-placeholder {
            color: #fff;
            opacity: .86;
          }
          .el-button {
            background-color: transparent;
            color: #fff;
            font-size: 30px;
            opacity: .86;
            -webkit-tap-highlight-color: transparent;
            border: none;
          }
          .btning {

          }
        }
      }
      .login_btns {
        margin-top: 111px;
        padding: 0 100px;
        .el-button {
          width: 100%;
          border-radius: 50px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          /deep/ span {
            display: inline-flex;
            align-items: center;
          }
        }
        .loginBtn {
          background: #FBC025;
          color: #FFFFFF;
        }
        .phoneBtn {
          color: #666666;
          background: #fff;
          margin-top: 32px;
          img {
            width: 32px;
            height: 32px;
            margin-right: 12px;
          }
        }
      }
    }
  }

</style>
