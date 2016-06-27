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

    var str = window.location.href;
    var obj = add(str,'&');
    $('.post_read p').eq(1).find('b').text(obj.hf);
    $('.post_read p').eq(0).find('b').text(obj.yd);
    addPage(parseInt(obj.hf/20) + 1,'.per_page');
    
    huifuAjax(obj.id,0)

    function huifuAjax(id,num){
    	$.ajax({
	    	url : 'postingAll.do',
	        type : 'get',
	        data : {
	        	pid : id,
	        	star : num
	        },
			success : function(data){
				$('.post_read h3').text(data.postingDir.title);
				var time = new Date(data.postingDir.date);
				var preTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes(); 
				$('.per_postRight p b').text(preTime);
				$('.per_post_cen').eq(0).html(data.postingBody.content);
				$('.per_postLeft a').eq(0).text(data.postingDir.authorName);
				$('.per_postLeft span').eq(1).text('xx');
	    		$('.per_postLeft p').eq(1).find('b').text('10');
				$('.per_postLeft p').eq(1).find('b').text('20');

				for(var i=0;i<data.replys.length;i++){
					var preTime1 = dateTime(data.replys[i].replyDate); 
					addUser('img/BBS/user_img.jpg','#?id='+ data.replys[i].replyId,data.replys[i].replyName,'高手','50','20',preTime1,data.replys[i].content,data.replys[i].myBuild,data.replys[i].build);
				}
			},
			error : function(err){
			    console.log(err.status);
			}
	    });

    }
    
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
	/*分页*/
	var $num = parseInt($('.page_search').prev().text().substring(1));  
	$('.per_page').eq(0).delegate('a','mouseenter',function(){
		$(this).css({
			background : '#00a2ca',
			color : '#fff'
		});
	}).delegate('a','mouseleave',function(){
		$(this).css({
			background : '',
			color : ''
		});
	}).delegate('a','click',function(){
		$('a').removeClass('active');

		var $num = parseInt($('.page_search').prev().text().substring(1));
		var $text = parseInt($(this).text());

		if($text != 1){
			$('.prov').css('display','inline-block');
		}else{
			$('.prov').css('display','none');
		}

		if($text != $num){
			$('.next').css('display','inline-block');
		}else{
			$('.next').css('display','none');
		}

		if( $text == 1){ 
			$('.per_post_cen').html('');
			
			$(this).addClass('active');
			
			huifuAjax(obj.id,$text-1);
		}else if($text == 2){

			if($num>5){
				$('.per_page a').eq(0).text($text-1);
				$('.per_page a').eq(1).text($text).addClass('active');
				$('.per_page a').eq(2).text($text+1);
				$('.per_page a').eq(3).text($text+2);
				$('.per_page a').eq(4).text($text+3);
			}else{
				$(this).addClass('active');
			}
			
			$('.per_post_cen').html('');
			

			huifuAjax(obj.id,$text-1);

		}else if($(this).text() == $num - 1){

			if($num>5){
				$('.per_page a').eq(0).text($text-3);
				$('.per_page a').eq(1).text($text-2);
				$('.per_page a').eq(2).text($text-1);
				$('.per_page a').eq(3).text($text).addClass('active');
				$('.per_page a').eq(4).text($text+1);
			}else{
				$(this).addClass('active');
			}
			
			$('.per_post_cen').html('');
			

			huifuAjax(obj.id,$text-1)

		}else if($(this).text() == $num ){

			$('.per_post_cen').html('');
			
			$(this).addClass('active');

			huifuAjax(obj.id,$text-1);

		}else{
			
			$('.per_post_cen').html('');
			
			$('.per_page a').eq(0).text($text-2);
			$('.per_page a').eq(1).text($text-1);
			$('.per_page a').eq(2).text($text).addClass('active');
			$('.per_page a').eq(3).text($text+1);
			$('.per_page a').eq(4).text($text+2);

			huifuAjax(obj.id,$text-1);
		}
	});

	$('.prov').css('display','none');
	if( $num<6 ){
		$('.page_search').css('display','none');
	}else{
		$('.page_search').css('display','inline-block');
	}
	
	$('.per_page').eq(0).delegate('.prov','click',function(){
		$('.next').css('display','inline-block');
		var $index = $('.per_page').find('.active').index();
		var $text = $('.per_page').find('.active').text();
		var $num = parseInt($('.page_search').prev().text().substring(1));
		var num = $index-2;
		
		var $html = parseInt( $('.per_page a').eq(num).text() );

		if( $text-1 == 1){//第一页

			$(this).css('display','none');
			$('.per_page a').removeClass('active');
			$('.per_page a').eq(num).addClass('active');
			$('.per_post_cen').html('');
			
			huifuAjax(obj.id,0)
		}else{
			$('.per_page a').removeClass('active');
			if($num > 5){
				if($html == 2){
					$('.per_page a').eq(0).text($html-1);
					$('.per_page a').eq(1).text($html).addClass('active');
					$('.per_page a').eq(2).text($html+1);
					$('.per_page a').eq(3).text($html+2);
					$('.per_page a').eq(4).text($html+3);

					$('.per_post_cen').html('');

					huifuAjax(obj.id,num);
				}else if($html == 1){
					$(this).css('display','none');
					$('.per_page a').eq(0).text($html).addClass('active');
					$('.per_page a').eq(1).text($html+1);
					$('.per_page a').eq(2).text($html+2);
					$('.per_page a').eq(3).text($html+3);
					$('.per_page a').eq(4).text($html+4);

					$('.per_post_cen').html('');

					huifuAjax(obj.id,0);

				}else if($html == $num-1){
					$('.per_page a').eq(0).text($html-3);
					$('.per_page a').eq(1).text($html-2);
					$('.per_page a').eq(2).text($html-1);
					$('.per_page a').eq(3).text($html).addClass('active');
					$('.per_page a').eq(4).text($html+1);

					$('.per_post_cen').html('');

					huifuAjax(obj.id,num);

				}else{
					$('.per_page a').eq(0).text($html-2);
					$('.per_page a').eq(1).text($html-1);
					$('.per_page a').eq(2).text($html).addClass('active');
					$('.per_page a').eq(3).text($html+1);
					$('.per_page a').eq(4).text($html+2);

					$('.per_post_cen').html('');

					huifuAjax(obj.id,num);
				}
			}else{
				$('.per_page a').eq(num).addClass('active');

				$('.per_post_cen').html('');

				huifuAjax(obj.id,num);
	
			}
		}
	});
	$('.per_page').eq(0).delegate('.next','click',function(){
		
		$('.prov').css('display','inline-block');
		var $index = $('.per_page').find('.active').index();
		var $text = $('.per_page').find('.active').text();
		var $num = parseInt($('.page_search').prev().text().substring(1));

		var $html = parseInt($('.per_page a').eq($index).text());

		if( parseInt($text) + 1 == $num){//最后一页
			$(this).css('display','none');
			$('.per_page a').removeClass('active');
			$('.per_page a').eq($index).addClass('active');

			$('.per_post_cen').html('');

			huifuAjax(obj.id,$index);
		}else{
			$('.per_page a').removeClass('active');
			if($num > 5){
				if($html == 2){
					$('.per_page a').eq(0).text($html-1);
					$('.per_page a').eq(1).text($html).addClass('active');
					$('.per_page a').eq(2).text($html+1);
					$('.per_page a').eq(3).text($html+2);
					$('.per_page a').eq(4).text($html+3);

					$('.per_post_cen').html('');
			
					huifuAjax(obj.id,$index);
				}else if($html == $num-1){
					$('.per_page a').eq(0).text($html-3);
					$('.per_page a').eq(1).text($html-2);
					$('.per_page a').eq(2).text($html-1);
					$('.per_page a').eq(3).text($html).addClass('active');
					$('.per_page a').eq(4).text($html+1);

					$('.per_post_cen').html('');
			
					huifuAjax(obj.id,$index);

				}else if($html == $num){
					$('.per_page a').eq(0).text($html-4);
					$('.per_page a').eq(1).text($html-3);
					$('.per_page a').eq(2).text($html-2);
					$('.per_page a').eq(3).text($html-1);
					$('.per_page a').eq(4).text($html).addClass('active');
					$('.next').css('display','none');

					$('.per_post_cen').html('');
			
					huifuAjax(obj.id,$index);
				}else{
					$('.per_page a').eq(0).text($html-2);
					$('.per_page a').eq(1).text($html-1);
					$('.per_page a').eq(2).text($html).addClass('active');
					$('.per_page a').eq(3).text($html+1);
					$('.per_page a').eq(4).text($html+2);

					$('.per_post_cen').html('');
			
					ihuifuAjax(obj.id,$index);
				}
			}else{
				$('.per_page a').eq($index).addClass('active');

				$('.per_post_cen').html('');
			
				huifuAjax(obj.id,$index);
			}
		}
	});

	$('.page_search').eq(0).delegate('span','click',function(){

		var $valGo =  parseInt( $('.page_search').eq(0).find('input').val() );
		var $num = parseInt($('.page_search').prev().text().substring(1));
		$('.per_page a').removeClass('active');

		if( $valGo > 1 ){
			$('.prov').css('display','inline-block');
		}else{
			$('.prov').css('display','none');
		}

		if( $valGo == $num ){
			$('.next').css('display','none');
		}else{
			$('.next').css('display','inline-block');
		}

		if($valGo <= $num){
			if($valGo == 1){

				$('.per_page a').eq(0).text($valGo).addClass('active');
				$('.per_page a').eq(1).text($valGo+1);
				$('.per_page a').eq(2).text($valGo+2);
				$('.per_page a').eq(3).text($valGo+3);
				$('.per_page a').eq(4).text($valGo+4);

				$('.per_post_cen').html('');
				
				huifuAjax(obj.id,$valGo - 1);
			}else if($valGo == 2){

				$('.per_page a').eq(0).text($valGo-1);
				$('.per_page a').eq(1).text($valGo).addClass('active');
				$('.per_page a').eq(2).text($valGo+1);
				$('.per_page a').eq(3).text($valGo+2);
				$('.per_page a').eq(4).text($valGo+3);

				$('.per_post_cen').html('');
				
				huifuAjax(obj.id,$valGo - 1);
			}else if($valGo == $num){

				$('.per_page a').eq(0).text($valGo-4);
				$('.per_page a').eq(1).text($valGo-3);
				$('.per_page a').eq(2).text($valGo-2);
				$('.per_page a').eq(3).text($valGo-1);
				$('.per_page a').eq(4).text($valGo).addClass('active');

				$('.per_post_cen').html('');
				
				huifuAjax(obj.id,$valGo - 1);
			}else if($valGo == $num-1){

				$('.per_page a').eq(0).text($valGo-3);
				$('.per_page a').eq(1).text($valGo-2);
				$('.per_page a').eq(2).text($valGo-1);
				$('.per_page a').eq(3).text($valGo).addClass('active');
				$('.per_page a').eq(4).text($valGo+1);

				$('.per_post_cen').html('');				

				huifuAjax(obj.id,$valGo - 1);
			}else{

				$('.per_page a').eq(0).text($valGo-2);
				$('.per_page a').eq(1).text($valGo-1);
				$('.per_page a').eq(2).text($valGo).addClass('active');
				$('.per_page a').eq(3).text($valGo+1);
				$('.per_page a').eq(4).text($valGo+2);

				$('.per_post_cen').html('');
				
				huifuAjax(obj.id,$valGo - 1);
			}
		}else{
			alert('输入错误');
		}
		
	});

	/*收藏*/
	$('#mark').css('height',$(window).height());
	$('.per_btn span').eq(1).on('click',function(){
		$.ajax({
			url : 'collect.do',
			data: {postingId:obj.id},
			success : function(data){
				if(data == 1){
					$('#mark').css('display','block');
					$('.success').css('display','block');
				}else{
					window.location = "wei-login.html";
				}
			},
			error : function(err){
		        console.log(err.status);
		    }
		});
	});
	$('.success').delegate('span','click',function(){
		$('.success').css('display','none');
		$('#mark').css('display','none');
	});

	/*验证码*/
	$('.per_domRight p').eq(0).find('img').attr('src',"token.do" + '?d=' + Math.random());
	$('.per_domRight p').eq(0).delegate('img','click',function(){
		$(this).attr('src',"token.do" + '?d=' + Math.random());
	});
	$('.per_domRight p input').on('blur',function(){
		$.ajax({
			url : 'againToken.do',
			data : {token : $(this).val()},
        	type : 'post',
			success : function(data){
				if(data == 1){
					$('.per_domRight p').eq(0).find('i').css('display','inline-block');
					$('.per_domRight p').eq(0).find('em').css('display','none');
				}else{
					$('.per_domRight p').eq(0).find('i').css('display','none');
					$('.per_domRight p').eq(0).find('em').css('display','inline-block');
				}
			},
			error : function(err){
		        console.log(err.status);
		    }
		});
	});
	
	$('.per_btn').delegate('btn','click',function(){
		window.location.href = window.location.href + '#per_domRight';
		$('.ipt').focus();
		$('.ipt').attr('placeholder','你将要回复 @楼主  的主题帖，请在下面输入回复内容：');
	});
	$('.theme').delegate('a','click',function(){
		window.location.href = window.location.href + '#per_domRight';
		$('.ipt').focus();
		$('.ipt').attr('placeholder','你将要回复 @楼主  的主题帖，请在下面输入回复内容：');
	});
	var $num = 0;
	$('.per_comment').on('click','a',function(){
		$num = $(this).attr('title');
		$name = $(this).attr('data');
		window.location.href += '#per_domRight';
		$('.ipt').focus();
		$('.ipt').attr('placeholder','你将要回复  @'+$num+'楼('+$name+') 的帖子，请在下面输入回复内容：');
	});
	$('.per_domRight').delegate('strong','click',function(){
		var arr = [];
		arr.push(UE.getEditor('editor').getContent());
		var cen = String(arr);
		$.ajax({
			url : 'replySave.do',
			data : {
				postingId : obj.id,
				build: $num,
				content : cen
			},
        	type : 'post',
			success : function(data){
				if(data != 0 ){
					$('.per_post_cen').html('');
					huifuAjax(obj.id,parseInt(data/20));
					//location.reload(true);
				}else{
					window.location = "wei-login.html";
				}		
			},
			error : function(err){
		        console.log(err.status);
		    }
		});
	});

	function addUser(userURL,link,another,level,pasteNum,moneyNum,time,content,number,lou){
		/*
			userURL : 回复用户名的头像     link : 回复者的链接
			another : 
			             level: 回复者的级别
			pasteNum : 发帖总数            moneyNum : 金钱总数
			time : 回复时间      content : 回复内容   number ： 第几楼
		*/
		var str = '<div class="box">\
				<div class="per_postLeft">\
					<img src='+ userURL +' /><br />\
					<a href='+ link +'>'+ another +'</a><br />\
					<span>级别:</span><span>'+ level +'</span>\
					<p><span>发帖:</span><b>'+ pasteNum +'</b></p>\
					<p><span>金钱:</span><b>'+ moneyNum +'</b></p>\
				</div>\
				<div class="per_postRight">\
					<p><span>'+ number + '楼：'+'回复@'+lou+'楼'+'回复时间：</span><b>'+ time +'</b></p>\
					<div class="per_post_cen">'+ content +'</div>\
					<div class="per_post_hf">\
						<a href="javascript:;" title='+ number +' data='+ another +'><span>回复</span></a><span>引用</span>\
					</div>\
				</div>\
			</div>';
		var $str = $(str);
		$('.per_comment').append($str);
	}
});
	