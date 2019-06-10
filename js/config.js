var host = 'http://www.keyucourse.com';
var qiniuPicBuckertUrl = 'http://pic.keyucourse.com';
//授权接口
var wxAuthUrl = host+"/ky_api/wx/wx_auto_url";
//朋友圈分享获取ginature接口
var wxGetSignatureUrl = host+"/ky_api/wx/get_signature";
//微信支付接口
var wxPayOrderUrl = host+"/ky_api/wx/pay";
//微信授权回调接口
var wxAuthCallBackUrl = host+"/ky_api/wx/auth_call_back";
//微信判断当前页面是否微信授权登录
var wxGetSessionKyUserUrl = host+"/ky_api/ky_user/get_session_user";
//微信确认登录wxConfirmLoginUrl
var wxConfirmLoginUrl = host+"/ky_api/ky_user/confirm_login";
//微信登录二维码地址
var wxLoginQrCodeUrl = host+"/ky_api/qr_code/wx_login";
//查询微信是否登录
var wxAutoLoginByUuidUrl = host+"/ky_api/ky_user/auto_login_by_uuid";
//轮播图接口
var bannerListUrl = host+"/ky_api/banner/list";
//获取菜单列表接口
var categoryListUrl = host+"/ky_api/category/list";
//获取菜单列表对应的课程接口
var categoryCourseUrl = host+"/ky_api/category/course_list";
//授权目录
var wxAuthCurrentUrl = host+"/ky_api/wx/auth_url";
//课程目录
var courseDetailUrl =  host+"/ky_api/course/detail";
//教师
var teacherDetailUrl = host+"/ky_api/teacher/detail";
//学员反馈
var feedbackListUrl = host+"/ky_api/course/feedback_list";
//微信二维码接口
var wxPayQrCodeUrl = host+"/ky_api/qr_code/wx_generate";
//支付宝二维码接口
var aliPayQrCodeUrl = host + "/ky_api/qr_code/ali_generate";
//获取个人所有课程
var getPersonCourseUrl = host+"/ky_api/ky_user/my_course_list";
//获取视频详情
var getVideoDetailUrl = host+"/ky_api/video/getVideoDetail";
//获取推荐课程
var getRecommandUrl = host+"/ky_api/course/recommand";
//获取access_token
var getAccessToken = host+"/ky_api/wx/access_token";