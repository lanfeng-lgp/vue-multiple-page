/**
 * http配置
 */
import axios from 'axios';

// 引入axios以及element ui中的loading和message组件
import { Loading, Message } from 'element-ui'

// 超时时间
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true;  // 携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/*
  测试、生产环境
  process.env.NODE_ENV=="production"
 */
axios.defaults.baseURL = '';

/*
  开发环境
  process.env.NODE_ENV=="development"
*/
if(process.env.NODE_ENV=="development"){
  axios.defaults.baseURL = '';
}


/*
  封装请求方法
 */
function ajaxMethod(postType,postUrl,postData,successBack,errorBack,showLoading){
    let params = {},data = {};
    postType = postType.toUpperCase();
    if(postType == "GET"){
      params = postData;
    }else if(postType == "POST"){
      data = postData;
    }
    let showLoadingFlag = null;
    if(showLoading){
      showLoadingFlag = Loading.service({fullscreen: true, text: "请稍等，请求加载中......",background:'rgba(0,0,0,0.5)',customClass:'fixed-loading-style'});
    }      
    axios({
      method:postType,
      url:postUrl,
      params:params,
      data:data
    }).then(function(result){
      if(showLoading){
        showLoadingFlag.close();
      }
      let resultData;
      try{
        resultData = JSON.parse(result.data);
      }catch(e){
        resultData = result.data;
      }
      successBack && successBack(resultData);
      showLoadingFlag = null;
    }).catch(function (error) {
      if(showLoading){
        showLoadingFlag.close();
      }
      if(typeof errorBack == 'boolean' && errorBack){
        Message.error({message: '网络请求异常！'})
      }else if(typeof errorBack == 'function'){
        errorBack && errorBack(error);
      }
      showLoadingFlag = null;
    });
}
axios.ajax = ajaxMethod;

export default axios;