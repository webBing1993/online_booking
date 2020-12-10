<template>
  <div>
    <div class="homeIndex">
      <div class="stepContainer" v-if="isPass">
        <div class="successTip">
          <p>{{ secTime }}s后自动退出核验界面</p>
          <i class="el-icon-success"></i>
          恭喜{{ ownInfo.idcard_ocr_result.name }}{{ ownInfo.idcard_ocr_result.gender == '女' ? '女士' : '先生' }}核验成功
        </div>
        <div class="origin_img">
          <img :src="ownInfo.idcard_ocr_result.img" alt="">
        </div>
        <div class="nextStep">
          <el-button @click="save" class="blurBtn">确定</el-button>
        </div>
      </div>
      <div class="stepContainer" v-else>
        <div class="errorTip">
          <i class="el-icon-error"></i>
          核验失败，请重新核验
        </div>
        <div class="nextStep">
          <el-button @click="resetBtn" class="blurBtn">重新核验</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex';
  import { Indicator } from 'mint-ui';
  import  "weixin-js-sdk";
  export default {
    name: 'homeIndex',
    components: {},
    data () {
      return {
        ownInfo: {
          idcard_ocr_result: {
            "gender": "女",
            "name": "孙小小",
            img: ''
          }
        },
        verifyToken: '',
        isPass: true,
        secTime: 10
      }
    },
    methods: {
      ...mapActions([
        'goto', 'replaceto', 'getResult'
      ]),

      // 重新核验
      resetBtn() {
          sessionStorage.setItem('ownerId', sessionStorage.getItem('ownerId_'));
          this.goBaiduLink();
      },

      // 跳百度
      goBaiduLink() {
        sessionStorage.setItem('ownerId_', sessionStorage.getItem('ownerId'));
        sessionStorage.removeItem('ownerId');
        let url = 'http://qa.fortrun.cn/onlinebooking/';
        window.location.href = "https://brain.baidu.com/face/print/?token="+this.verifyToken+"&successUrl="+url+"&failedUrl="+url
      },

      // 保存
      save() {
        // 需要提交数据
        wx.miniProgram.navigateTo({
//          url: '/pages/regist/index?roomOrderId=' + sessionStorage.getItem('userId') + '&ownerId=' + sessionStorage.getItem('ownerId')
          url: '/pages/user/login'
        })
      },

      // 查询接口
      getTokenResult() {
        this.getResult({
          data: {
            verify_token: this.verifyToken
          },
          onsuccess: body => {
            Indicator.close();
            console.log('body:', body);
            if (body) {

            }
            this.timer();
          },
          onfail: body => {
            console.log(222, body);
            Indicator.close();
            this.$toast({
              message: body.error_msg,
              position: "center",
              duration: 2000
            });
          },
          onerror: body => {
            console.log(111, body);
            Indicator.close();
            this.$toast({
              message: body.error_msg,
              position: "center",
              duration: 2000
            });
          }
        })

      },

      // 时间倒计时
      timer() {
        if (this.secTime > 0) {
          this.secTime--;
          setTimeout(this.timer, 1000);
        } else{
          this.secTime = 0;
          this.save();
        }
      },

    },

    mounted () {
      Indicator.open({
        text: '',
        spinnerType: 'fading-circle'
      });
      this.verifyToken = sessionStorage.getItem('verifyToken');
        // 接收百度认证后的结果
      this.getTokenResult();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .homeIndex {
    .stepContainer {
      .successTip {
        padding: 100px 0;
        text-align: center;
        font-size: 32px;
        color: #67c23a;
        position: relative;
        p {
          position: absolute;
          right: 30px;
          top: 30px;
          font-size: 24px;
          color: #999999;
        }
      }
      .origin_img {
        width: 60vw;
        height: 600px;
        margin: 0 auto;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .errorTip {
        padding: 100px 0;
        text-align: center;
        font-size: 32px;
        color: #f56c6c;
      }
      .nextStep {
        background-color: #fff;
        padding: 46px 36px;
        width: calc(100vw - 72px);
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-button {
          border: none;
          outline: none;
          width: 50%;
          background: #FBC025;
          border-radius: 4px;
          height: 80px;
          font-size: 32px;
          color: #FFFFFF;
          font-weight: bold;
        }
        .el-button:only-child {
          width: 100%;
        }
        .blurBtn {
          background-color: #67c23a;
        }
        .disabledBtn {
          background: #999999;
        }
      }
    }
  }

</style>
