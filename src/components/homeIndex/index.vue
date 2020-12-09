<template>
  <div>
    <div class="homeIndex" v-if="homeIndex">
      <div class="step">
        <div :class="activeClass >= 1  ? 'activeStep item_step' : 'item_step'">
          <div class="step_title">
            <span>1</span>
            <span>实名认证</span>
          </div>
          <div class="step_icon">
            <img src="../../assets/ic_arrow_right_grew.png" alt="" v-if="activeClass < 1">
            <img src="../../assets/ic_arrow_right_orange.png" alt="" v-else>
          </div>
        </div>
        <div :class="activeClass >= 2 ? 'activeStep item_step' : 'item_step'">
          <div class="step_title">
            <span>2</span>
            <span>实人认证</span>
          </div>
        </div>
      </div>
      <div class="stepContainer" v-if="activeClass == 1">
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
          <div class="title">拍摄您的二代身份证</div>
          <div class="idcardLists">
            <div class="list">
              <div class="listBg">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="importHeaders"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ownInfo.zm" :src="ownInfo.zm" class="avatar">
                  <img v-else src="../../assets/zhengmian.png" alt="">
                  <img src="../../assets/camera.png" alt="">
                </el-upload>
              </div>
              <div class="listTip">点击拍摄人像面</div>
            </div>
            <div class="list">
              <div class="listBg">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="importHeaders"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess_"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ownInfo.fm" :src="ownInfo.fm" class="avatar">
                  <img v-else src="../../assets/fanmian.png" alt="">
                  <img src="../../assets/camera.png" alt="">
                </el-upload>
              </div>
              <div class="listTip">点击拍摄国徽面</div>
            </div>
          </div>
        </div>
        <div class="nextStep">
          <el-button @click="nextStep" :class="(ownInfo.zm == '' || ownInfo.fm == '') ? 'disabledBtn' : ''" :disabled="ownInfo.zm == '' || ownInfo.fm == ''">下一步</el-button>
        </div>
      </div>
      <div class="stepContainer" v-else>
        <video
          ref="video"
          :width="videoWidth"
          :height="videoHeight"
          preload
          autoplay
          playsinline
          muted
          v-show="pause"
        >
        </video>

        <p :class="isPass ? 'tipBlur tip' : 'tipRed tip'">
          <el-button :type="isPass ? 'success' : 'danger'" :icon="isPass ? 'el-icon-check' : 'el-icon-close'" circle></el-button>
          {{ isPass ? '核验成功' : '核验失败，请重新核验' }}
        </p>
        <canvas ref="canvas" :width="videoWidth" :height="videoHeight"></canvas>
        <!--<img :src="ownInfo.ownImg" alt="" v-if="ownInfo.ownImg" class="ownImg">-->
        <div class="nextStep">
          <el-button @click="preStep">上一步</el-button>
          <el-button @click="resetBtn" class="blurBtn" v-if="!isPass">重新核验</el-button>
          <el-button @click="save" class="blurBtn" v-else>保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex';
  import { Indicator } from 'mint-ui';
  import httpTool from '../../tool/httpTool'
  import axios from 'axios'
  import qs from 'qs'
  export default {
    name: 'homeIndex',
    components: {},
    data () {
      return {
        activeClass: 1,
        importHeaders: {
          'X-auth-token': sessionStorage.getItem('tokenId') != 'null' ? sessionStorage.getItem('tokenId') : ' 24ecce49-eb1a-4e3d-ae69-86df9ba9d520'
        },
        ownInfo: {
          name: sessionStorage.getItem('userName'),
          idcard: sessionStorage.getItem('userIdcard'),
          zm: '',
          fm: '',
          ownImg: '',
        },
        isPass: false,    // 判断是否是真人
        videoWidth: 700,
        videoHeight: 400,
        pause: false,
        verifyToken: '',
        homeIndex: false
      }
    },
    computed: {
      uploadUrl(){
        return httpTool.httpUrlEnv() + sessionStorage.getItem('windowUrl')+'homestay-tenant/common/temp/pic'
      },
    },
    methods: {
      ...mapActions([
        'goto', 'replaceto', 'baiduToken'
      ]),

      // 下一步
      nextStep() {
        this.pause = true;
        this.initVideo();
        this.activeClass++;
      },

      // 上一步
      preStep() {
        this.activeClass--;
      },

      // 重新核验
      resetBtn() {
        this.pause = true;
        this.initVideo();
      },

      handleAvatarSuccess(res, file) {
        this.ownInfo.zm = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess_(res, file) {
        this.ownInfo.fm = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      // 拍摄
      idcardFun(event) {
        let imageBase = "";
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {
          imageBase = e.target.result.replace("data:image/jpeg;base64,","");
          let data = {
            access_token: '24.3cc2bca0406104f439f4045aca98102d.2592000.1609035658.282335-23051317',
            detect_direction:true,
            unified_valid_period:true,
            image: imageBase
          };
          axios.post('https://aip.baidubce.com/rest/2.0/ocr/v1/idcard', qs.stringify({data})).then(res => {
              console.log('res:', res);
              this.ownInfo.zm = res.data
          })
        }
//        setTimeout(() => {
//          wx.chooseImage({
//            count: 1,
//            sizeType: ['original', 'compressed'],
//            sourceType: ['album', 'camera'],
//            success (res) {
//              // tempFilePath可以作为img标签的src属性显示图片
//              const tempFilePaths = res.tempFilePaths;
//              console.log('tempFilePaths: ', tempFilePaths);
//            }
//          })
//        }, 400);

      },

      initVideo() {
        let that = this;
        that.video = document.getElementById("webcam");
        setTimeout(() => {
          navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

          if (navigator.getUserMedia) {
            navigator.getUserMedia({
//                audio: true,
                video: {
                  width: 1280,
                  height: 800
                }
              },
              function(stream) {
                let video = that.$refs.video;
                video.srcObject = stream;
                video.onloadedmetadata = function(e) {
                  video.play();
                };
                setTimeout(() => {
                  let canvas = that.$refs.canvas;
                  let context = canvas.getContext("2d");
                  context.drawImage(video, 0, 0, that.videoWidth, that.videoHeight);
                  that.ownInfo.ownImg = canvas.toDataURL("image/png");
                  that.pause = false;
                  video.pause();
                }, 3000)
              },
              function(err) {
                this.$toast({
                  message: "摄像头打开失败,请检查权限设置!",
                  position: "center",
                  duration: 2000
                });
              }
            )}

        }, 300);
      },

      // 保存事件
      save() {

      },

      // 获取百度token
      getBaiduToken() {
        this.baiduToken({
          roomOrderId: sessionStorage.getItem('roomOrderId') != 'null' ? sessionStorage.getItem('roomOrderId') : '776486741379911680',
          onsuccess: body => {
              if (body.data.errcode == 0) {
                this.verifyToken = body.data.data.verifyToken;
                sessionStorage.setItem('verifyToken', this.verifyToken);
                // 跳百度人脸认证界面
                this.goBaiduLink();
//                this.replaceto('/homeHome');
              }else {
                Indicator.close();
                this.$toast({
                  message: body.data.errmsg,
                  position: "center",
                  duration: 2000
                });
              }
          },
          onfail: body => {
            Indicator.close();
            this.$toast({
              message: body.data.errmsg,
              position: "center",
              duration: 2000
            });
          },
          onerror: body =>{
            Indicator.close();
            this.$toast({
              message: body.errmsg,
              position: "center",
              duration: 2000
            });
          }
        })
      },

      // 跳百度
      goBaiduLink() {
        Indicator.close();
        sessionStorage.setItem('ownerId_', sessionStorage.getItem('ownerId'));
        sessionStorage.removeItem('ownerId');
        let url = 'http://qa.fortrun.cn/onlinebooking/';
        window.location.href = "https://brain.baidu.com/face/print/?token="+this.verifyToken+"&successUrl="+url+"&failedUrl="+url
      },

    },

    mounted () {
      Indicator.open({
        text: '',
        spinnerType: 'fading-circle'
      });
      console.log("sessionStorage.getItem('ownerId')", sessionStorage.getItem('ownerId'));
      if (sessionStorage.getItem('ownerId') && sessionStorage.getItem('ownerId') != 'null') {
        this.getBaiduToken();
      }else {
        Indicator.close();
        this.replaceto('/homeHome');
      }
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
          text-align: left;
          font-size: 30px;
          color: #333333;
          font-weight: bold;
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
      .tip {
        margin: 50px auto;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button.is-circle {
          margin-right: 15px;
        }
      }
      .tipBlur {
        color: #67c23a;
      }
      .tipRed {
        color: #f56c6c;
      }
      .ownImg {
        display: block;
        width: 400px;
        height: 480px;
        margin: 0 auto;
        border-radius: 10px;
      }
    }
  }

</style>
