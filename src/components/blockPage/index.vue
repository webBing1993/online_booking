<template>
  <div>

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
      }
    },
    methods: {
      ...mapActions([
        'goto', 'replaceto'
      ]),

    },

    mounted () {
      // 这里接收判断小程序那边跳转过来的参数判断
      this.replaceto('/homeIndex');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


</style>
