<template>
  <div>
    <div class="homeIndex">
      <div class="stepContainer" v-if="isPass">
        <div class="lists">
          <div class="list">
            <div class="name">姓&nbsp;&nbsp;&nbsp;名</div>
            <div class="value">{{ ownInfo.name }}</div>
          </div>
          <div class="list">
            <div class="name">身份证号</div>
            <div class="value">{{ ownInfo.idcard }}</div>
          </div>
        </div>
        <div class="idcardBox">
          <div class="title">二代身份证</div>
          <div class="idcardLists">
            <div class="list">
              <div class="listBg">
                <img :src="ownInfo.zm">
              </div>
              <div class="listTip">拍摄人像面</div>
            </div>
            <div class="list">
              <div class="listBg">
                <img :src="ownInfo.fm">
              </div>
              <div class="listTip">拍摄国徽面</div>
            </div>
          </div>
        </div>
        <div class="idcardBox">
          <div class="title">
            核验图
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <span class="tipBlur">核验成功</span>
          </div>
          <div class="idcardLists">
            <div class="list">
              <div class="listBg">
                <img :src="ownInfo.ownImg">
              </div>
            </div>
          </div>
        </div>
        <div class="nextStep">
          <el-button @click="save" class="blurBtn">保存</el-button>
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
  export default {
    name: 'homeIndex',
    components: {},
    data () {
      return {
        ownInfo: {
          name: sessionStorage.getItem('userName'),
          idcard: sessionStorage.getItem('userIdcard'),
          zm: '',
          fm: '',
          ownImg: '',
        },
        verifyToken: '',
        isPass: true
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
          url: '/pages/regist/index?roomOrderId=' + sessionStorage.getItem('userId') + '&ownerId=' + sessionStorage.getItem('ownerId')
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
    .step {
      padding: 46px 54px;
      border-bottom: 4px solid #F7F7F7;
      display: flex;
      width: calc(100vw - 108px);
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      .item_step {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;
        .step_title {
          display: inline-flex;
          align-items: center;
          span:first-of-type {
            width: 42px;
            height: 42px;
            line-height: 42px;
            background: #C1C1C1;
            font-size: 24px;
            color: #FFFFFF;
            border-radius: 100%;
            margin-right: 10px;
          }
          span:last-of-type {
            font-size: 24px;
            color: #999999;
          }
        }
        .step_icon {
          padding-right: 40px;
          img {
            width: 12px;
            height: 18px;
          }
        }
      }
      .activeStep {
        .step_title {
          span:first-of-type {
            background: #FBC025;
          }
          span:last-of-type {
            color: #FBC025;
          }
        }
      }
    }
    .stepContainer {
      .lists {
        padding-left: 35px;
        background-color: #ffffff;
        border-bottom: 4px solid #F7F7F7;
        .list {
          border-bottom: 1px solid #EEEEEE;
          padding: 60px 30px 37px 0;
          display: flex;
          width: calc(100% - 30px);
          align-items: center;
          justify-content: space-between;
          .name {
            font-size: 30px;
            color: #333333;
            font-weight: bold;
          }
          .value {
            font-size: 30px;
            color: #333333;
          }
        }
        .list:last-of-type {
          border-bottom: none;
        }
      }
      .idcardBox {
        background-color: #ffffff;
        padding-bottom: 60px;
        .title {
          padding: 60px 0 48px 35px;
          font-size: 30px;
          color: #333333;
          font-weight: bold;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: flex-start;
          .el-button.is-circle {
            font-size: 12px;
            margin: 0 10px 0 20px;
          }
          span {
            font-weight: 400;
            font-size: 22px;
          }
          .tipBlur {
            color: #67c23a;
          }
          .tipRed {
            color: #f56c6c;
          }
        }
        .idcardLists {
          display: flex;
          padding: 0 35px;
          align-items: center;
          justify-content: space-between;
          .list {
            width: 48%;
            .listBg {
              height: 200px;
              position: relative;
              width: 100%;
              .avatar-uploader {
                display: inline-block;
                width: 100%;
                height: 100%;
                /deep/ .el-upload {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
              input {
                border: none;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                outline: none;
                opacity: 0;
                z-index: 5;
              }
              img:first-of-type {
                display: block;
                width: 100%;
                height: 100%;
              }
              img:last-of-type {
                width: 64px;
                height: 65px;
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
              img:only-of-type {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .listTip {
              margin-top: 32px;
              font-size: 30px;
              color: #666666;
            }
          }
        }
      }
      .errorTip {
        padding: 80px 0;
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
