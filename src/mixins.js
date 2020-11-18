import Vue from 'vue'
import apiTool from './tool/httpTool.js'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

Vue.mixin({
  data(){
    return{
        httpUrlEnv: '',
    }
  },
  computed:{
      ...mapState([
      ]),

  },
  methods: {

      //时间格式处理
      datetimeparse (timestamp, format, prefix) {
          if (typeof timestamp =='string'){
              timestamp=Number(timestamp)
          }
          //转换时区
          let currentZoneTime = new Date (timestamp);
          let currentTimestamp = currentZoneTime.getTime ();
          let offsetZone = currentZoneTime.getTimezoneOffset () / 60;//如果offsetZone>0是西区，西区晚
          let offset = null;
          //客户端时间与服务器时间保持一致，固定北京时间东八区。
          offset = offsetZone + 8;
          currentTimestamp = currentTimestamp + offset * 3600 * 1000

          let newtimestamp = null;
          if (currentTimestamp) {
              if (currentTimestamp.toString ().length === 13) {
                  newtimestamp = currentTimestamp.toString ()
              } else if (currentTimestamp.toString ().length === 10) {
                  newtimestamp = currentTimestamp + '000'
              } else {
                  newtimestamp = null
              }
          } else {
              newtimestamp = null
          }
          let dateobj = newtimestamp ? new Date (parseInt (newtimestamp)) : new Date ()
          let YYYY = dateobj.getFullYear ()
          let MM = dateobj.getMonth () > 8 ? dateobj.getMonth () + 1 : '0' + (dateobj.getMonth () + 1)
          let DD = dateobj.getDate () > 9 ? dateobj.getDate () : '0' + dateobj.getDate ()
          let HH = dateobj.getHours () > 9 ? dateobj.getHours () : '0' + dateobj.getHours ()
          let mm = dateobj.getMinutes () > 9 ? dateobj.getMinutes () : '0' + dateobj.getMinutes ()
          let ss = dateobj.getSeconds () > 9 ? dateobj.getSeconds () : '0' + dateobj.getSeconds ()
          let output = '';
          let separator = '/'
          if (format) {
              separator = format.match (/-/) ? '-' : '/'
              output += format.match (/yy/i) ? YYYY : ''
              output += format.match (/MM/) ? (output.length ? separator : '') + MM : ''
              output += format.match (/dd/i) ? (output.length ? separator : '') + DD : ''
              output += format.match (/hh/i) ? (output.length ? ' ' : '') + HH : ''
              output += format.match (/mm/) ? (output.length ? ':' : '') + mm : ''
              output += format.match (/ss/i) ? (output.length ? ':' : '') + ss : ''
          } else {
              output += YYYY + separator + MM + separator + DD
          }
          output = prefix ? (prefix + output) : output

          return newtimestamp ? output : ''
      },

      idnumber: id => {
        return id.replace(id.slice(3, 14), '***********')
      },

      timeFetch () {
        var todayZero = new Date ();
        var todayEleven = new Date ();
        var today = {};
        todayZero.setHours (0);
        todayZero.setMinutes (0);
        todayZero.setSeconds (0);
        todayEleven.setHours (23);
        todayEleven.setMinutes (59);
        todayEleven.setSeconds (59);
        console.log ('今天零点：' + todayZero.getTime ());
        console.log ('23:59：' + todayEleven.getTime ());
        return today = {todayStart: todayZero.getTime (), todayEnd: todayEleven.getTime ()}
      },

      bodyScroll(event){
        event.preventDefault();
      },

      getWeekDay(date) {
        let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let myDate = new Date(date);
        console.log('getWeekDay' + myDate);
        return weekDay[myDate.getDay()];
      },

      getNumberOfDays (startTime, endTime) {
        let runTime = parseInt(endTime - startTime) / 1000;
        let day = Math.ceil(runTime / 86400);
        return day
      },

  },
  mounted () {
    let httpUrl = apiTool.httpUrlEnv();
    if (httpUrl.indexOf('key_channel')) {
      httpUrl = httpUrl.split('key_channel')[0];
    }
    this.httpUrlEnv = httpUrl;
  },
});
