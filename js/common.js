
function getParam(paraName) {
　var url = document.location.toString();
　var arrObj = url.split("?");

　if(arrObj.length > 1) {
　　var arrPara = arrObj[1].split("&");
　　var arr;

　　for(var i = 0; i < arrPara.length; i++) {
　　　arr = arrPara[i].split("=");

　　　　if (arr != null && arr[0] == paraName) {
　　　　　return arr[1];
　　　　}
　　}
　　return "";
　}
　else {
　　return "";
　}
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function getUuid() {
   return (Date.parse(new Date())+"-"+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var kyUser = '';
function getKyUser(){
	
  if(kyUser!=''){
    return kyUser;
  }

  kyUser = '';
	$.ajax({
      type : "POST",
      url :wxGetSessionKyUserUrl,
      async: false,
      dataType: "json",
      data :{} ,
      success : function(data) {
         if(data.result=="success"){
           kyUser = data.kyUser;
         }
      }
    });
    return kyUser;
}
$(function(){
	configKyUser();
})

function configKyUser(){
  
   kyUser = getKyUser();
   if(kyUser!=''){
   	  $(".loginBtn").hide();
   		$("#alreadyLogin").show();
      // $("#kyUser").html('<img src="' + kyUser.headimgurl + '" style="width: 140px;">' + kyUser.nickName);
   		$("#kyUser").html(kyUser.nickName + '<img src="' + kyUser.headimgurl + '" style="width: 45px;border-radius: 50%;">');
   }else{
   	  $(".loginBtn").show();
   		$("#alreadyLogin").hide();
   }
   
}


var t;
function wxLoginByQrCode(){
  var uuid = getUuid();
  //$("#wxLoginQrCode").src=wxLoginQrCodeUrl+"?uuid="+uuid;
  $("#wxLoginQrCode").attr("src",wxLoginQrCodeUrl+"?uuid="+uuid);
  
  $("#exampleLoginCenter").modal("show");
  t = setInterval("autoLogin('"+uuid+"')", 1000);
}
var courseList = '';
function getPersonCourseList(){
  //getPersonCourseUrl
  if(courseList!=''){
    return courseList;
  }
  courseList = '';
  $.ajax({
      type : "POST",
      url :getPersonCourseUrl,
      async: false,
      dataType: "json",
      data :{} ,
      success : function(data) {
         courseList = data;
      }
    });
    return courseList;

}

function autoLogin(uuid){
    $.ajax({
          type : "POST",
          url :wxAutoLoginByUuidUrl,
          async: false,
          dataType: "json",
          data :{"uuid":uuid} ,
          success : function(data) {
             if(data.result=="success"){
               
                $("#agreement").html("登录成功");
                $("#exampleLoginCenter").modal("hide");
                clearInterval(t);
                configKyUser();         
             }
          }
    });
}



function timestampDateFormat(shijianchuo)
{
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d);
    //return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
function add0(m){return m<10?'0'+m:m }