function courseIntroduction(){
	window.location.href=host+"/course.html?id="+getParam("id");
}
function courseMulu(){
    window.location.href=host+"/courseList.html?id="+getParam("id");
}
var kyChapterList;
function getCourseDetail(){
	var course='';
	var courseId = getParam("id");
	$.ajax({
      type : "POST",
      url :courseDetailUrl,
      async: false,
      dataType: "json",
      data :{"courseId":courseId} ,
      success : function(data) {
         course = data;
         kyChapterList = course.kyChapterList;
      }
	});
	return course;
}
function configCourseDetailUI(course){
	$(".courseName").html(course.name);
	$("#brief").html(course.brief);
	$("#details").html(course.details);
	$("#payPrice").html("￥"+course.price);
	$("#originalPrice").html("￥"+course.originalPrice);
	var expiration = timestampDateFormat(course.expiration);
	$("#expiration").html("限时优惠 截止至"+expiration);

	var difficulty = course.difficulty;
	var difficultyTxt = "初级";
	if(difficulty==2){
		difficultyTxt = "中级";
	}else if(difficulty==3){
		difficultyTxt = "高级";
	}
	var infosHtml = '<span>难度&nbsp;&nbsp;'+difficultyTxt+'</span>'+
					'<span>时长&nbsp;&nbsp;'+course.hour+':'+course.minute+':'+course.second+'</span>'+
					'<span>学习人数&nbsp;&nbsp;'+course.studentNum+'</span>'+
					'<span>好评度&nbsp;&nbsp;100%</span>';
    $("#infos").html(infosHtml);
    var teacher = getTeacher(course.teacherId);
    $("#teacherName").html(teacher.factName);
    $("#courseContent").html(course.content);
}

function getTeacher(teacherId){
	var teacher = '';
	$.ajax({
      type : "POST",
      url :teacherDetailUrl,
      async: false,
      dataType: "json",
      data :{"teacherId":teacherId} ,
      success : function(data) {
         teacher = data;
      }
	});

	return teacher;
}

var courseIsPayInterval;

function interValCourseIsPay(courseId){	
  courseIsPayInterval = setInterval("courseIsPay('"+courseId+"')", 1000);
}
function courseIsPay(courseId){
	
	$.ajax({
      type : "POST",
      url :getPersonCourseUrl,
      async: false,
      dataType: "json",
      data :{} ,
      success : function(data) {
         courseList = data;
         for(var i=0; i<courseList.length; i++){
			var cs = courseList[i];
			//已经报名该课程
			if(course.id == cs.id){
				$("#payOrStartStudy").html("开始学习");
				$("#paySuccess").html("支付成功");
				clearInterval(courseIsPayInterval);
			}
		}

      }
    });
}

function configIsPayOrStudyUI(course){
	kyUser = getKyUser();
		//当前课程是否支付
		var currentCourseIsPay = 0;
		//如果用户没有登录
		$("#payOrStartStudy").html("付款学习");
		//如果用户登录了
		if(kyUser!=''){
			//获取用户下边所有的课程
			$("#wxpayImg").attr("src", wxPayQrCodeUrl+"?courseId="+course.id);
			$("#aliPayImg").attr("src",aliPayQrCodeUrl+"?courseId="+course.id);
			courseList = getPersonCourseList();
			for(var i=0; i<courseList.length; i++){
				var cs = courseList[i];
				//已经报名该课程
				if(course.id == cs.id){
					$("#payOrStartStudy").html("开始学习");
					currentCourseIsPay = 1;
					break;
				}
			}
		}


		$("#payOrStartStudy").click(function(){
			//如果用户没有登录，则先让用户登录再付款
			if(kyUser==''){
				//$("#exampleLoginCenter").modal("show");
				wxLoginByQrCode();
			}
			//如果用户已经登录
			else{
				//如果没有支付
				if(currentCourseIsPay==0){
					$("#payModal").modal("show");
					//开启支付监听
					interValCourseIsPay(course.id);
				}
				//如果支付
				else{
					playVideoByModal(course);
					//$("#videoPlayModal").modal("show");
					
				}

			}
		});

		$("#tryPlay").click(function(){
			playVideoByModal(course);
		});
         


}
//视频播放
function playVideoByModal(course){
 	$('#example_video_1').bind('contextmenu',function() { return false; });
 	configCourseVideoModal(course);
	$("#videoPlayModal").modal("show");
}
//配置视频播放
var nextVideoId='';
var kyChapterCurrentIndex = '';
var kySectionCurrentIndex = '';
var kyChapter = '';
function configCourseVideoModal(course){
	kyChapterList = course.kyChapterList;
	kyChapter = kyChapterList[0];
	var sectionList = kyChapter.kySectionList;
	section = sectionList[0];
	kyChapterCurrentIndex = 0;
	kySectionCurrentIndex = 0;
	//nextVideoId = section.videoId;
	//播放课程
	playNextCourseFun();
	//下一节
	section = sectionList[1];
    if(section!= undefined){
       $("#nextSectionTitle").html(section.name);
       nextVideoId = section.videoId;
    }else{
    	//获取下一章节
    	kyChapter = kyChapterList[1];
    	kyChapterCurrentIndex = 1;
    	kySectionCurrentIndex = 0;
    	if(kyChapter!=undefined){
    		sectionList = kyChapter.kySectionList;
    		section = sectionList[0];
    		$("#nextSectionTitle").html(section.name);
    	}
    }
	
}
function playNextCourseFun(){
	//首先判断视频是否是付费
	var isFree = section.isFree;
	var videoId = section.videoId;
	var video = getVideoDetail(videoId);
	$("#chapter").html(kyChapter.name);
	$(".sectionTitle").html(section.name);
	//$("#playVideoSource").attr("src",video.mp4Name);
	document.getElementById("example_video_1").src=video.mp4Name;
 	document.getElementById("example_video_1").play();
}
function getVideoDetail(videoId){
	var video = '';
	$.ajax({
      type : "POST",
      url :getVideoDetailUrl,
      async: false,
      dataType: "json",
      data :{"id":videoId} ,
      success : function(data) {
         video = data;
      }
	});

	return video;


}

