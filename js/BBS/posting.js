$(function(){

	$.ajax({
        url : 'http://localhost:8080/home-web/sessionUserName.do',
        type : 'post',
        dataType : 'json',
        success : function(data){
          if(data.username == null){
          	$('.header_username em').html('用户名');
          	$('.user_name span').html('用户名');

          }else{
          	$('.header_username em').html(data.username);
          	$.ajax({
          		url : 'findBBSUser.do',
          		type : 'post',
		        success : function(data){
		        	if(data == "null"){
		        		$('#mark').css('display','block');
		        		$('.popup').css('display','block');
		        		$('.popup p').find('img').attr('title','点击图片更换验证码').attr('src',"token.do" + '?d=' + Math.random());
		        	}else{
		        		$('.user_name span').html(data);
          				$('.user_channel').css('display','inline-block');
          				$('.user_login').css('display','none');
		        	}
		        },
		        error : function(err){
		        	console.log(err.status);
		        }
          	});
          }
        },
        error : function(err){
          console.log(err.status);
        }
    });
	$('.post_type_footer p').eq(1).delegate('input','blur',function(){
		$.ajax({
			url : 'againToken.do',
			data : {token : $(this).val()},
        	type : 'post',
			success : function(data){
				if(data == 1){
					$('.post_type_footer p').eq(1).find('i').css('display','inline-block');
					$('.post_type_footer p').eq(1).find('em').css('display','none');
				}else{
					$('.post_type_footer p').eq(1).find('i').css('display','none');
					$('.post_type_footer p').eq(1).find('em').css('display','inline-block');
				}
			},
			error : function(err){
		        console.log(err.status);
		    }
		});
	});
	$('.post_type_footer p').eq(1).find('img').attr('src',"token.do" + '?d=' + Math.random());
	$('.post_type_footer p').eq(1).delegate('img','click',function(){
		$(this).attr('src',"token.do" + '?d=' + Math.random());
	});

	/*header*/
	var iBtn = true;
	var timer = null;
	$('.header_jm_user').delegate('.header_username','mouseenter',function(){
		clearInterval(timer);
		$(this).css({
			background : '#fff',
			color : '#000'
		});
		$('.header_username i').css('border-color','#000 transparent transparent transparent');
		$('.header_username_list').finish().show('1000');
	}).delegate('.header_username','mouseleave',function(){
		timer = setInterval(function(){
			$(this).css({
				background : '',
				color : ''
			});
			$('.header_username i').css('border-color','');
			$('.header_username_list').finish().hide('500');
		},100);
	}).delegate('.header_username_list','mouseenter',function(){
		clearInterval(timer);
	}).delegate('.header_username_list','mouseleave',function(){
		$('.header_username').css({
			background : '',
			color : ''
		});
		$('.header_username i').css('border-color','');
		$('.header_username_list').finish().hide('500');
	}).delegate('.header_username_list li','mouseenter',function(){
		$(this).css({
			background : '#00a2ca',
			color : '#fff'
		});
	}).delegate('.header_username_list li','mouseleave',function(){
		$(this).css({
			background : '#fff',
			color : '#000'
		});
	});

	/*header_personal*/
	$('.user_list').delegate('.user_channel','mouseenter',function(){
		clearInterval(timer);
		$('.user_channel_list').finish().show('1000');
	}).delegate('.user_channel','mouseleave',function(){
		timer = setInterval(function(){
			$('.user_channel_list').finish().hide('500');
		},100);
	}).delegate('.user_channel_list','mouseenter',function(){
		clearInterval(timer);
	}).delegate('.user_channel_list','mouseleave',function(){
		$('.user_channel_list').finish().hide('500');
	});

	/* */
	$('.post_type_left span').on('click',function(){
		$('.post_type_left ul').toggle('500');
	});
	$('.post_type_left ul').find('li').on('click',function(){
		$('.post_type_left span').text($(this).text());
		$('.post_type_left ul').toggle('500');
	});
});
	