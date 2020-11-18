<template>
  <div>
    <!--<wxlogin :appid="appId" scope="'snsapi_login'" theme="'black'" state="STATE" :redirect_uri='recirect_uri'></wxlogin>-->
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex';
  import wxlogin from 'vue-wxlogin';

  export default {
    name: 'blockPage',
    components: {
      wxlogin
    },
    data () {
      return {
        appId: null,
        recirect_uri: ''
      }
    },
    methods: {
      ...mapActions([
        'goto', 'replaceto'
      ]),

    },

    mounted () {
      // 需要判断是否登录过了
      this.replaceto('/index');
//      let tokenCode = localStorage.getItem('tokenCode') ? localStorage.getItem('tokenCode') : '';
//      if (tokenCode != '') {
//          this.replaceto('/index');
//      }else {
//          this.replaceto('/login');
//      }
//      this.appId = this.$store.state.store.state.appid;

      console.log('进来了');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
