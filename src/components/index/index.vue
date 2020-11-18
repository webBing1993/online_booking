<template>
  <div>
    <div class="index">
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <div class="footer_tabs">
            <div class="footer_tab" @click="handleClick('first')">
              <img src="../../assets/ic-home.png" alt="" v-if="activeName=='first'">
              <img src="../../assets/ic-home2.png" alt="" v-else>
              <span>首页</span>
            </div>
            <div class="footer_tab" @click="handleClick('second')">
              <img src="../../assets/ic-me.png" alt="" v-if="activeName=='second'">
              <img src="../../assets/ic-me2.png" alt="" v-else>
              <span>我的</span>
            </div>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex';
  export default {
    name: 'index',
    components: {},
    data () {
      return {
        activeName: 'first'
      }
    },
    methods: {
      ...mapActions([
        'goto', 'replaceto',
      ]),

      handleClick(tab) {
        this.activeName = tab;
        if (tab == 'first') {
//          this.replaceto('/homeIndex');
          this.replaceto('/checkInGuest');
        }else {
          this.replaceto('/me');
        }
      },
    },

    mounted () {
      this.handleClick('first')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .index {
    .el-container {
      .el-main {
        /*min-height: calc(100vh - 120px);*/
        padding: 0 0 120px;
      }
      .el-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 120px !important;
        background: #FEFFFF;
        box-shadow: 0 -1px 4px 0 rgba(222,222,222,0.28);
        padding: 0;
        .footer_tabs {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          .footer_tab {
            display: inline-flex;
            align-items: center;
            width: 50%;
            justify-content: center;
            height: 100%;
            cursor: pointer;
            img {
              width: 48px;
              height: 48px;
            }
            span {
              font-size: 24px;
              color: #888888;
            }
          }
        }
      }
    }
  }

</style>
