function wxConfig(appId, timestamp, nonceStr, signature, currentUrl,title,imgUrl){

  wx.config({
    debug : false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId : appId, //必填，公众号的唯一标识
    timestamp : timestamp, // 必填，生成签名的时间戳
    nonceStr : nonceStr, //必填，生成签名的随机串
    signature : signature, // 必填，签名，见附录1
    jsApiList : [ 'onMenuShareAppMessage', 'onMenuShareTimeline' ] //必填，需要使用的JS接口列表，所有JS接口列表 见附录2
  });
}



function wxShareFriendsCircle(appId, timestamp, nonceStr, signature, currentUrl, title, imgUrl){
  console.log('share friend');
  wxConfig(appId, timestamp, nonceStr, signature, currentUrl,title,imgUrl);
  wx.ready(function() {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    /*
    wx.checkJsApi({
          jsApiList : [ 'onMenuShareAppMessage' ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success : function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                alert(res.checkResult);
                alert(res.errMsg);
          }
    }); // end checkJsApi
     */
    wx.onMenuShareTimeline({
          title : title, // 分享标题
          link : currentUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl : imgUrl, // 分享图标
          success : function() {
                // 用户确认分享后执行的回调函数
          },
          cancel : function() {
                // 用户取消分享后执行的回调函数
          }
    }); // end onMenuShareTimeline
  }); // end ready

  wx.error(function(res) {
    console.log(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    alert('res');
  });
}
function wxShareFriends(appId, timestamp, nonceStr, signature, currentUrl, title,imgUrl, description){
  wxConfig(appId, timestamp, nonceStr, signature, currentUrl,title,imgUrl);

  wx.ready(function() {

    wx.onMenuShareAppMessage({
          title : title, // 分享标题
          desc : description, // 分享描述
          link : currentUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl : imgUrl, // 分享图标
          type : '', // 分享类型,music、video或link，不填默认为link
          dataUrl : '', // 如果type是music或video，则要提供数据链接，默认为空
          success : function() {
                // 用户确认分享后执行的回调函数
                // alert('share successful');
          },
          cancel : function() {
                // 用户取消分享后执行的回调函数
                // alert('share cancel');
          }
    }); // end onMenuShareAppMessage

  }); // end ready

  wx.error(function(res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    alert('res');
  });
}


//微信支付接口
var appId,timeStamp,nonceStr,wxpackage,signType,paySign;
function onBridgeReady(){
	//alert(wxpackage);
  WeixinJSBridge.invoke( 'getBrandWCPayRequest', {
      "appId":appId,     //公众号名称,由商户传入
      "timeStamp":timeStamp,         //时间戳,自1970年以来的秒数
      "nonceStr":nonceStr, //随机串
      "package":wxpackage,
      "signType":signType,         //微信签名方式：
      "paySign":paySign //微信签名
    },
    function(res){
		//alert(res.err_msg);
      if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        console.log('支付成功');
        //支付成功后跳转的页面
      }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
        console.log('支付取消');
      }else if(res.err_msg == "get_brand_wcpay_request:fail"){
        console.log('支付失败');
        WeixinJSBridge.call('closeWindow');
      } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
    });
}




function configWxShare(title, imgUrl, description){
  var currentUrl = decodeURIComponent(location.href.split('#')[0]);
      //var url = host+"/ky_api/wx/get_signature";
  //currentUrl = wxAuthCurrentUrl+"?currentUrl="+currentUrl;
  console.log(currentUrl);
  console.log(wxGetSignatureUrl);
  //currentUrl = encodeURIComponent(currentUrl);
  $.ajax({
    type : "POST",
    url :wxGetSignatureUrl,
    async: false,
    dataType: "json",
    data :{"currentUrl":currentUrl} ,
    success : function(data) {
       if(data.result=="success"){
          var data = data.data;
          console.log(data.appId);
          console.log(data.signature);
          console.log(data.timestamp);
          console.log(data.nonceStr);
          console.log(data.jsapi_ticket);
          console.log(data.url);
          var appId = data.appId;
          var signature = data.signature;
          var timestamp = data.timestamp;
          var nonceStr = data.nonceStr;

          var jsapi_ticket = data.jsapi_ticket;

          //var imgUrl = "http://www.keyucourse.com/logo/logo.png";

          //分享朋友圈
          //var title = "科羽学院-全国大数据、人工智能在线教育平台";


          wxShareFriendsCircle(appId, timestamp, nonceStr, signature, currentUrl, title, imgUrl);
          //发给朋友
          //var title = "科羽学院";
          //var description = "全国大数据、人工智能在线教育平台";
          wxShareFriends(appId, timestamp, nonceStr, signature, currentUrl, title,imgUrl, description);
       }
    }
  });
}

function getToken(){
  var token = '';
  $.ajax({
    type : "POST",
    url : getAccessToken,
    async: false,
    dataType: "text",
    success : function(data) {
      token = data;
    }
  });
  return token;
}

function configWxLogin(){
  var accesstoken = getToken();
  $.ajax({
    type : "POST",
    url : wxOfficialLoginUrl + accesstoken,
    async: false,
    dataType: "json",
    data :"{\"expire_seconds\": 604800, \"action_name\": \"QR_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": 5201314}}}",
    success : function(data) {
      createWxLogin(data);
    }
  });
}

function createWxLogin(wxQrCode){
  var ticket = wxQrCode.ticket;
  console.log(encodeURI(ticket))
  $.ajax({
    type : "GET",
    url : wxTicketLoginUrl + encodeURI(ticket),
    async: false,
    data :"",
    success : function(data) {
      wxQrCode = data
    }
  });
}
