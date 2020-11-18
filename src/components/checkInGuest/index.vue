<template>
  <div>
    <!--<div class="checkInGuest">-->
      <!--<div class="dengjitishi">-->
        <!--根据公安要求，请如实填写入住人数，未按要求登记，一切后果由旅客本人承担！-->
      <!--</div>-->

      <!--<div v-if="status == 0">-->
        <!--&lt;!&ndash; 未登记 &ndash;&gt;-->
        <!--<div class="userdengji1" v-if="isOwner">-->
          <!--<div class="flexrow xingming">-->
            <!--<span>姓&nbsp;&nbsp;&nbsp;名</span>-->
            <!--<input placeholder="请输入您的姓名" v-model="guestUserList[0].name" maxlength="6" @input="nameInput" data-id="0">-->
          <!--</div>-->
          <!--<div class="flexrow xingming">-->
            <!--<label>手机号</label>-->
            <!--<input placeholder="请输入您的手机号"  placeholder-class='placeholder' maxlength="11" type='number' @input="phoneInput" data-id="0" v-model="guestUserList[0].mobile">-->
          <!--</div>-->
          <!--<div class="flexrow zhengjianhao">-->
            <!--<label>身份证</label>-->
            <!--<input placeholder="请输入您的身份证" placeholder-class='placeholder' maxlength="18" type='idcard' bindinput="idcardInput" data-id="0" v-model="guestUserList[0].idcard">-->
          <!--</div>-->

          <!--<div class="flexrow xingming">-->
            <!--<label>民&nbsp;&nbsp;&nbsp;族</label>-->
            <!--<picker bindchange="bindPickerChange" data-id="0" range="{{nationList}}" range-key="{{'name'}}" value='{{nationList[rangekey].code}}'>-->
              <!--<div class="picker nation">-->
                <!--&lt;!&ndash; {{nationList[rangekey].name}} &ndash;&gt;-->
                <!--{{guestUserList[0].nationName}}-->
          <!--</div>-->
            <!--</picker>-->
          <!--</div>-->

        <!--</div>-->
        <!--<div v-for="{{guestUserList}}" v-for-index="index" data-id='{{item.code}}'>-->
          <!--<div v-if="{{item.code!=0&&item.deleted!=true&&isOwner}}">-->
            <!--<div class="tongzhuren">-->
              <!--<div class="flexrow tongzhuren1">-->
                <!--<span decode="{{true}}" space="{{true}}">同住人</span>-->
                <!--<div class="vmdelete flexrow" bindtap="deleteUser" data-id="{{item.code}}">-->
                  <!--<image src="../../images/ic_ruzhudengji_delete.png"></image> 删除</div>-->
              <!--</div>-->
              <!--<div class="flexrow xingming">-->
                <!--<span decode="{{true}}" space="{{true}}">姓&nbsp;&nbsp;&nbsp;名</span>-->
                <!--<input placeholder="请输入您的姓名" placeholder-class='placeholder' maxlength="6" bindinput="nameInput" data-id="{{item.code}}" value="{{item.name}}"></input>-->
              <!--</div>-->
              <!--<div class="flexrow xingming">-->
                <!--<label>手机号</label>-->
                <!--<input class="txtmobile" type='number' placeholder="请输入您的手机号" placeholder-class='placeholder' bindinput="phoneInput" maxlength="11" data-id="{{item.code}}" value="{{item.mobile}}"></input>-->
              <!--</div>-->

              <!--<div class="flexrow zhengjianhao">-->
                <!--<label>身份证</label>-->
                <!--<input placeholder="请输入您的身份证" placeholder-class='placeholder' maxlength="18" type='idcard' bindinput="idcardInput" data-id="{{item.code}}" value="{{item.idcard}}">-->
                <!--</input>-->
              <!--</div>-->

              <!--<div class="flexrow xingming">-->
                <!--<label>民族</label>-->
                <!--<picker bindchange="bindPickerChange" data-id="{{item.code}}" range="{{nationList}}" range-key="{{'name'}}" value='{{nationList[rangekey].code}}'>-->
                  <!--<div class="picker nation">-->
                    <!--{{item.nationName}}-->
              <!--</div>-->
                <!--</picker>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

      <!--</div>-->
      <!--<div v-if="{{status==1}}" v-for="{{registerUserList}}" v-for-index="index" data-id='{{item.id}}'>-->
        <!--&lt;!&ndash; 登记过 &ndash;&gt;-->
        <!--<div class="jianju"></div>-->
        <!--<div class="yidengji flexrow">-->
          <!--<div v-if="{{item.identityCheckStatus=='PASS'}}">-->
            <!--<div class="yidengjishanchu flexcloumn" data-id="{{item.id}}">-->
              <!--<image src="../../images/ic_check.png"></image>-->
              <!--<label style="color:#FBC025">已核验</label>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--<div v-if="{{isOwner}}">-->
              <!--<div class="yidengjishanchu flexcloumn" bindtap="deleteGuestUser" data-id="{{item.id}}">-->
                <!--<image src="../../images/ic_delete.png"></image>-->
                <!--<label>删除</label>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div v-else>-->
              <!--<div class="yidengjishanchu flexcloumn" data-id="{{item.id}}">-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->

          <!--<div class="jianju3"></div>-->
          <!--<div class="yidengjiyonghu flexcloumn">-->
            <!--<div v-if="{{item.identityCheckStatus=='PASS'}}">-->
              <!--<div class="flexrow yidengjiming" data-id="{{item.id}}">-->
                <!--<label>{{item.name}}</label>-->
              <!--</div>-->
              <!--<div class="jianju4"></div>-->
              <!--<label class="yidengjishouji">{{item.mobile}}</label>-->
            <!--</div>-->
            <!--<div v-else>-->
              <!--<div v-if="{{isOwner}}">-->
                <!--<div class="flexrow yidengjiming" bindtap="updateUser" data-id="{{item.id}}">-->
                  <!--<label>{{item.name}}</label>-->
                  <!--<image src="../../images/ic_xiugai.png"> </image>-->
                <!--</div>-->
                <!--<div class="jianju4"></div>-->
                <!--<label class="yidengjishouji" bindtap="updateUser">{{item.mobile}}</label>-->
              <!--</div>-->
              <!--<div v-else>-->
                <!--<div class="flexrow yidengjiming" data-id="{{item.id}}">-->
                  <!--<label>{{item.name}}</label>-->

                <!--</div>-->
                <!--<div class="jianju4"></div>-->
                <!--<label class="yidengjishouji">{{item.mobile}}</label>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div v-if="{{item.identityCheckStatus=='PASS'}}">-->
            <!--<div class="flexrow">-->
              <!--<image src="../../images/ic_havechecked.png" class="yiheyan"> </image>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--&lt;!&ndash; <div class="paizhaoheyan flexrow"  data-id="{{item.id}}">-->
                <!--<image src="../../images/ic_photo.png"> </image>-->
               <!--<label>完善信息</label>-->
             <!--</div>&ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div v-if="{{status==1}}" v-for="{{guestUserList}}" v-for-index="index" data-id='{{item.code}}'>-->
        <!--<div v-if="{{item.deleted!=true}}">-->
          <!--<div class="tongzhuren">-->
            <!--<div class="flexrow tongzhuren1">-->
              <!--<span decode="{{true}}" space="{{true}}">同住人</span>-->
              <!--<div class="vmdelete flexrow" bindtap="deleteUser" data-id="{{item.code}}">-->
                <!--<image src="../../images/ic_ruzhudengji_delete.png"></image> 删除</div>-->
            <!--</div>-->
            <!--<div class="flexrow xingming">-->
              <!--<span decode="{{true}}" space="{{true}}">姓&nbsp;&nbsp;&nbsp;名</span>-->
              <!--<input placeholder="请输入您的姓名" placeholder-class='placeholder' maxlength="6" bindinput="nameInput" data-id="{{item.code}}" value="{{item.name}}"></input>-->
            <!--</div>-->
            <!--<div class="flexrow xingming">-->
              <!--<label>手机号</label>-->
              <!--<input class="txtmobile" type='number' placeholder="请输入您的手机号" placeholder-class='placeholder' bindinput="phoneInput" maxlength="11" data-id="{{item.code}}" value="{{item.mobile}}"></input>-->
            <!--</div>-->

            <!--<div class="flexrow zhengjianhao">-->
              <!--<label>身份证</label>-->
              <!--<input placeholder="请输入您的身份证" placeholder-class='placeholder' maxlength="18" type='idcard' bindinput="idcardInput" data-id="{{item.code}}" value="{{item.idcard}}">-->
              <!--</input>-->
            <!--</div>-->

            <!--<div class="flexrow xingming">-->
              <!--<label>民族</label>-->
              <!--<picker bindchange="bindPickerChange" data-id="{{item.code}}" range="{{nationList}}" range-key="{{'name'}}" value='{{nationList[rangekey].code}}'>-->
                <!--<div class="picker nation">-->
                  <!--{{item.nationName}}-->
              <!--</div>-->
              <!--</picker>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--&lt;!&ndash; 添加同住人 &ndash;&gt;-->
      <!--<div class="tianjia" bindtap="addGuestUser" v-if="{{isOwner}}">+ 添加同住人</div>-->

      <!--<div class="vmbottom">-->
        <!--<div class="ruzhutishi">-->
          <!--我们承诺您的信息仅用于本次入住，不会在未经您允许的情况下，将您的信息透露给任何第三方-->
        <!--</div>-->
        <!--<div class="wancheng" bindtap="bindHome">完成</div>-->
      <!--</div>-->
      <!--&lt;!&ndash; 弹窗 修改顾客信息 &ndash;&gt;-->
      <!--<div class="modal-mask" bindtap="hideModal" catchtouchmove="preventTouchMove" v-if="{{showUpdate}}" data-item='showUpdate'></div>-->
      <!--<div class="modal-dialog modal-content" v-if="{{showUpdate}}">-->
        <!--<div class="modal-header">修改顾客信息</div>-->
        <!--<div class="jianju5"></div>-->
        <!--<div class='flexrow modal-content-user'>-->
          <!--<label>姓名</label>-->
          <!--<input value="{{registerUserList[checkedIndex].name}}" bindinput="inputUpdateName"></input>-->
        <!--</div>-->
        <!--<div class="xian"></div>-->
        <!--<div class="jianju6"></div>-->
        <!--<div class='flexrow modal-content-user'>-->
          <!--<label>手机号</label>-->
          <!--<input value="{{registerUserList[checkedIndex].mobile}}" type='number' maxlength="11" bindinput="inputUpdateMobile"></input>-->
        <!--</div>-->
        <!--<div class="xian"></div>-->

        <!--<div class="modal-foot-confirm flexrow">-->
          <!--<div class="modal-foot-cancel" bindtap="hideModal" data-item='showUpdate'>取消</div>-->
          <!--<div class="modal-foot" bindtap="confirmUpdateUser" data-item='showUpdate'>确认</div>-->
        <!--</div>-->
      <!--</div>-->



      <!--&lt;!&ndash; 弹框 未全部完成核验 &ndash;&gt;-->
      <!--<div class="modal-mask" bindtap="hideModal" catchtouchmove="preventTouchMove" v-if="{{showVerification}}" data-item='showVerification'></div>-->
      <!--<div class="modal-dialog-heyan" v-if="{{showVerification}}">-->
        <!--<image src="../../images/img_police.png"></image>-->
        <!--<div class="gongantishi">-->
          <!--<span class="gongantishi-col">当前入住人未全部完成核验</span>-->
          <!--<span>，根据公安要求，请如实登记入住人数，未按要求登记，一切后果由旅客本人承担！</span>-->
        <!--</div>-->

        <!--<div class="modal-foot-confirm flexrow">-->
          <!--<div class="modal-foot-cancel" bindtap="hideModal" data-item='showVerification' bindtap="bindLater">稍后核验</div>-->
          <!--<div class="modal-foot" bindtap="hideModal" data-item='showVerification' bindtap="bindUrent">立即核验</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div style="position:fixed;top:999999999999999999999rpx;">-->
        <!--<canvas canvas-id='attendCanvasId' style="width:30px; height:30px;"></canvas>-->
      <!--</div>-->
    <!--</div>-->
    <div class="checkInGuest">
      <div class="tip">根据公安要求，请如实填写入住人数，未按要求登记，一切后果由旅客本人承担！</div>
      <div class="guestList">
        <div class="list" v-for="(item, index) in guestUserList">
          <!-- 为登记的、同住人登记的、已登记的-->
          <div class="guest_identityCheck" v-if="item.id && item.identityCheckStatus == 'PASS'">
            <!-- 已核验-->
            <div class="identityCheck_lists">
              <div class="identityCheck_list">
                <div class="list_left">
                  <img src="../../assets/ic_check.png" alt="">
                  <span>已核验</span>
                </div>
                <div class="list_right">
                  <div class="list_right_left">
                    <div class="name">{{ item.name }}</div>
                    <div class="phone">{{ item.mobile }}</div>
                  </div>
                  <div class="list_right_right">
                    <img class="check_img" src="../../assets/ic_have_checked.png" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="guest_registered" v-else-if="item.id && item.identityCheckStatus != 'PASS'">
            <!-- 已登记-->
            <div class="registered_lists">
              <div class="registered_list">
                <div class="list_left">
                  <img src="../../assets/ic_delete.png" alt="">
                  <span class="deleted">删除</span>
                </div>
                <div class="list_right">
                  <div class="list_right_left">
                    <div class="name">
                      {{ item.name }}
                      <el-button>
                        <img src="../../assets/ic_xiugai.png" alt="">
                      </el-button>
                    </div>
                    <div class="phone">{{ item.mobile }}</div>
                  </div>
                  <div class="list_right_right">
                    <el-button>
                      <img src="../../assets/ic-head-notlogin.png" alt="">
                      <span>拍照核验</span>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="guest_tip" v-if="index != 0 && !item.id">
            <div class="guest_tip_left">同住人</div>
            <el-button @click="deleteBtn(index)">
              <img src="../../assets/ic_ruzhudengji_delete.png" alt="">
              <span>删除</span>
            </el-button>
          </div>
          <div class="add_guest_lists" v-if="!item.id">
            <div class="add_guest_list">
              <span class="add_guest_list_left">姓&nbsp;&nbsp;&nbsp;名</span>
              <el-input placeholder="请输入您的姓名" v-model="item.name"></el-input>
            </div>
            <div class="add_guest_list">
              <span class="add_guest_list_left">手机号</span>
              <el-input placeholder="请输入您的手机号" v-model="item.mobile"></el-input>
            </div>
            <div class="add_guest_list">
              <span class="add_guest_list_left">身份证</span>
              <el-input placeholder="请输入您的身份证" v-model="item.idcard"></el-input>
            </div>
            <div class="add_guest_list">
              <span class="add_guest_list_left">民&nbsp;&nbsp;&nbsp;族</span>
              <div :id="'trigger'+index">{{ item.nationName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="add_guest_btns">
        <el-button @click="addGuest"><img src="../../assets/ic_add.png" alt=""><span>添加同住人</span></el-button>
      </div>
      <div class="guest_save">
        <div class="save_tip">我们承诺您的信息仅用于本次入住，不会在未经您允许的情况下，将您的信息透露给任何第三方</div>
        <div class="saveBtn">
          <el-button>完成</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex';
  export default {
    name: 'checkInGuest',
    components: {},
    data () {
      return {
        status: 0,
        showUpdate: false,
        showVerification: false,
        guestUserList: [
          {
            name: '',
            mobile: '',
            idcard: '',
            nationName: '汉族',
            nationCode: 0
          },
          {
            id: "776490366164537344",
            createTime: 1605171329000,
            createBy: "13621726825",
            updateTime: 1605171330000,
            updateBy: null,
            provideUserId: "710807269524119552",
            roomGroupId: "741357826433093632",
            roomId: "776485901906743296",
            roomOrderId: "776486741379911680",
            ownerId: null,
            orderNo: "776486741363134464",
            name: "小郑",
            mobile: "13621726825",
            idcard: "340824199304071857",
            nationCode: "0",
            nationName: "汉族",
            livePhoto: "https://temp-pic-1252821823.cos.ap-shanghai.myqcloud.com/20201112/c3549a06b81b4d159e1b448fd0228325.jpg",
            idcardPhoto: null,
            idcardImgObverse: "https://temp-pic-1252821823.cos.ap-shanghai.myqcloud.com/20201112/c3549a06b81b4d159e1b448fd0228325.jpg",
            idcardImgReverse: "https://temp-pic-1252821823.cos.ap-shanghai.myqcloud.com/20201112/c3549a06b81b4d159e1b448fd0228325.jpg",
            idtype: "IDCard",
            checkinTime: null,
            checkoutTime: null,
            identityCheckStatus: "PASS",
            identityCheckTime: 1605171330000,
            identityCheckIfo: "认证通过",
            liveStatus: "READY",
            lvyeInStatus: "NONE",
            lvyeInTime: null,
            lvyeOutStatus: "NONE",
            lvyeOutTime: null,
            status: "ENABLED",
            deleted: false,
          },
          {
            id: "776490366164537344",
            createTime: 1605171329000,
            createBy: "13621726825",
            updateTime: 1605171330000,
            updateBy: null,
            provideUserId: "710807269524119552",
            roomGroupId: "741357826433093632",
            roomId: "776485901906743296",
            roomOrderId: "776486741379911680",
            ownerId: null,
            orderNo: "776486741363134464",
            name: "小郑",
            mobile: "13621726825",
            idcard: "340824199304071857",
            nationCode: "0",
            nationName: "汉族",
            livePhoto: "https://temp-pic-1252821823.cos.ap-shanghai.myqcloud.com/20201112/c3549a06b81b4d159e1b448fd0228325.jpg",
            idcardPhoto: null,
            idcardImgObverse: "https://temp-pic-1252821823.cos.ap-shanghai.myqcloud.com/20201112/c3549a06b81b4d159e1b448fd0228325.jpg",
            idcardImgReverse: "https://temp-pic-1252821823.cos.ap-shanghai.myqcloud.com/20201112/c3549a06b81b4d159e1b448fd0228325.jpg",
            idtype: "IDCard",
            checkinTime: null,
            checkoutTime: null,
            identityCheckStatus: "NONE",
            identityCheckTime: 1605171330000,
            identityCheckIfo: "认证通过",
            liveStatus: "READY",
            lvyeInStatus: "NONE",
            lvyeInTime: null,
            lvyeOutStatus: "NONE",
            lvyeOutTime: null,
            status: "ENABLED",
            deleted: false,
          },
        ],
        registerUserList: [
          {
            code: "01",
            parentCode: null,
            name: "汉族",
            sortCode: null,
          },
          {
            code: "02",
            parentCode: null,
            name: "蒙古族",
            sortCode: null,
          }
        ],
        id: '',
        userInfo: {},
        checkedIndex: 0,
        isOwner: true
      }
    },
    methods: {
      ...mapActions([
        'goto', 'replaceto',
      ]),

      // 添加同住人
      addGuest() {
        this.guestUserList.push({
          name: '',
          mobile: '',
          idcard: '',
          nationName: '汉族',
          nationCode: 0
        })
      },

      // 删除
      deleteBtn(index) {
        this.guestUserList.splice(index, 1);
      },

    },

    mounted () {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .checkInGuest {
    padding-bottom: 265px;
    .tip {
      width: 100%;
      height: 58px;
      background: #fff2f4;
      color: #ff5870;
      font-size: 20px;
      transform: scale(.9);
      text-align: center;
      line-height: 58px;
    }
    .guestList {
      padding: 0 36px;
      .list {
        box-shadow: 0 0 18px 0 rgba(66,66,66,0.20);
        background-color: #fff;
        margin-bottom: 24px;
        .guest_identityCheck, .guest_registered {
          .identityCheck_lists, .registered_lists {
            .identityCheck_list, .registered_list {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 22px;
              background: #FFFFFF;
              border-radius: 8px;
              width: 100%;
              height: 156px;
              .list_left {
                background: #F7F7F7;
                border-radius: 8px 0 0 8px;
                width: 88px;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                img {
                  width: 40px;
                  height: 40px;
                }
                span {
                  font-size: 20px;
                  color: #FBC025;
                }
                .deleted {
                  color: #999999;
                }
              }
              .list_right {
                width: calc(100% - 88px);
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                .list_right_left {
                  padding-left: 46px;
                  text-align: left;
                  .name {
                    display: inline-flex;
                    align-items: center;
                    font-size: 30px;
                    color: #333333;
                    font-weight: bold;
                    margin-bottom: 12px;
                    .el-button {
                      outline: none;
                      border: none;
                      background: transparent;
                      /deep/ span {
                        img {
                          margin-left: 12px;
                          width: 25px;
                          height: 26px;
                        }
                      }
                    }
                  }
                  .phone {
                    font-size: 30px;
                    color: #888888;
                  }
                }
                .list_right_right {
                  padding-right: 42px;
                  .check_img {
                    width: 90px;
                    height: 90px;
                  }
                  .el-button {
                    outline: none;
                    background: #FBC025;
                    border-radius: 32px;
                    width: 188px;
                    height: 64px;
                    /deep/ span {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      img {
                        width: 28px;
                        height: 28px;
                        margin-right: 5px;
                      }
                      span {
                        font-size: 24px;
                        color: #FFFFFF;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .guest_tip {
          padding: 48px 34px 0 34px;
          font-size: 24px;
          color: #fbc025;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .el-button {
            height: 46px;
            background: #f7f7f7;
            border-radius: 11.5px;
            justify-content: center;
            padding: 2px 6px;
            img {
              width: 30px;
              height: 30px;
            }
            /deep/ span {
              color: #fbc025;
              font-size: 24px;
              display: inline-flex;
              align-items: center;
            }
          }
        }
        .add_guest_lists {
          .add_guest_list {
            padding: 52px 34px 0 34px;
            font-size: 30px;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 30px;
              color: #333;
              width: 20%;
              text-align: left;
            }
            /deep/ .el-input__inner {
              font-size: 30px;
              color: #333;
              text-align: right;
              background-color: transparent;
              border: none;
              outline: none;
              padding: 0;
            }
          }
          .add_guest_list:last-of-type {
            padding-bottom: 52px;
          }
        }
      }
    }
    .add_guest_btns {
      margin-top: 10px;
      padding: 0 36px;
      .el-button {
        background: #F7F7F7;
        border-radius: 4px;
        width: 100%;
        height: 84px;
        /deep/ span {
          display: inline-flex;
          align-items: center;
          font-size: 30px;
          color: #FBC025;
          img {
            margin-right: 28px;
          }
        }
      }
    }
    .guest_save {
      position: fixed;
      width: calc(100vw -64px) ;
      padding: 40px 32px;
      left: 0;
      bottom: 0;
      z-index: 100;
      background-color: #fff;
      .save_tip {
        font-size: 24px;
        color: #999999;
        margin-bottom: 32px;
        text-align: left;
      }
      .el-button {
        outline: none;
        border: none;
        background: #FBC025;
        border-radius: 4px;
        height: 80px;
        width: 100%;
        font-size: 32px;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
  }

</style>
