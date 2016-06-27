$(function(){
	$('#mark').css('height',$(window).height());
	
	//addPage(10,'.jm_bbs_main_bottom_pagingLeft');
	/* 初始化 */
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
	$.ajax({
		url : 'postingCount.do',
	    type : 'get',
		success : function(data){
			$('.jm_bbs_main_center p span').eq(1).text(data);
			addPage(parseInt(data/20) + 1,'.jm_bbs_main_bottom_pagingLeft');
		},
		error : function(err){
			console.log(err.status);
		}
	});
	$.ajax({
		url : 'postingDateCount.do',
	    type : 'get',
		success : function(data){
			$('.jm_bbs_main_center p span').eq(0).text(data);
		},
		error : function(err){
			console.log(err.status);
		}
	});
	$.ajax({
		url : 'replyCount.do',
	    type : 'get',
		success : function(data){
			$('.jm_bbs_main_center p span').eq(2).text(data);
		},
		error : function(err){
			console.log(err.status);
		}
	});
	/* popup */
	
	$('.popup p').eq(2).delegate('input','blur',function(){
		$.ajax({
			url : 'findBBSUserName.do',
			data: {name : $(this).val() },
        	type : 'post',
			success : function(data){
				if(data == "null"){
					$('.popup p').eq(2).find('i').css('display','inline-block');
					$('.popup p').eq(2).find('span').css('display','none');
				}else{
					$('.popup p').eq(2).find('i').css('display','none');
					$('.popup p').eq(2).find('span').css('display','block').html('该别名以被使用');
				}
			},
			error : function(err){
		        console.log(err.status);
		    }
		});
	});
	$('.popup p').eq(4).delegate('input','blur',function(){
		$.ajax({
			url : 'againToken.do',
			data : {token : $(this).val()},
        	type : 'post',
			success : function(data){
				if(data == 1){
					$('.popup p').eq(4).find('i').css('display','inline-block');
					$('.popup p').eq(4).find('span').css('display','none');
				}else{
					$('.popup p').eq(4).find('i').css('display','none');
					$('.popup p').eq(4).find('span').css('display','block').html('验证码错误');
				}
			},
			error : function(err){
		        console.log(err.status);
		    }
		});
	});
	$('.popup p').eq(4).delegate('img','click',function(){
		$(this).attr('src',"token.do" + '?d=' + Math.random());
	});  
	$('.popup p').eq(5).delegate('span','click',function(){
		var $iDis1 = $('.popup p').eq(2).find('i').css('display');
		var $iDis2 = $('.popup p').eq(4).find('i').css('display');
		var $inputVal = $('.popup p').eq(2).find('input').val();
		if( $iDis1 == 'inline-block' && $iDis2 == 'inline-block' ){
			$.ajax({
				url : 'saveBBSUser.do',
	        	type : 'post',
	        	data : { bbsname : $inputVal },
				success : function(data){
					if( data == 1 ){
						$('#mark').css('display','none');
		        		$('.popup').css('display','none');
						$('.user_name').html($inputVal);
						$('.user_channel').css('display','inline-block');
						$('user_login').css('display','none');
					}else{

					}
				},
				error : function(err){
			        console.log(err.status);
			    }
			});
		}
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

	$('.header_username_list ul li').eq(1).on('click',function(){
		$.ajax({
	        url : 'http://localhost:8080/home-web/exit.do',
	        type : 'post',
	        dataType : 'json', 
	        success : function(data){
	          	$('.header_username em').html('用户名');
	          	$('.user_name').html('用户名');
	        },
	        error : function(err){
	          console.log(err.status);
	        }
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

	/*jm_bbs_main*/

	ajaxBox();
	function ajaxBox(){
		$.ajax({
			url : 'vipPosting.do',
		    type : 'get',
		    success : function(data){
		    	for(var i=0;i<data.length;i++){
					var preTime2 = dateTime(data[i].postingDir.date);
					var lastTime2 = dateLast( data[i].lastDate );
					if(i<3){
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].replyCount+'&yd='+data[i].postingDir.counter,
		'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime2,'#?id' + data[i].lastId,
		data[i].lastName,lastTime2,data[i].postingDir.counter,data[i].replyCount,'.box','img/BBS/topic.gif');
					}else if(i<6){
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].replyCount+'&yd='+data[i].postingDir.counter,
		'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime2,'#?id' + data[i].lastId,
		data[i].lastName,lastTime2,data[i].postingDir.counter,data[i].replyCount,'.box','img/BBS/good.gif');
					}else{
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].replyCount+'&yd='+data[i].postingDir.counter,
		'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime2,'#?id' + data[i].lastId,
		data[i].lastName,lastTime2,data[i].postingDir.counter,data[i].replyCount,'.box','img/BBS/topichot.gif');
					}	
				}
				var $p = $('<p class="p1"></p>');
				$('.box').append($p);
		    },
		    error : function(err){
		    	console.log(err.status);
		    }
		});
	}
	ajaxPage(0);
	function ajaxPage(num){
		$.ajax({
			url : 'posting.do',
		    type : 'get',
		    data : {star : num},
			success : function(data){
				for(var i=0;i<data.length;i++){
					var preTime = dateTime(data[i].date);
					var lastTime = dateLast( data[i].lastDate );
					addNode('#','personal.html?id=' + data[i].id +'&hf='+data[i].replyCount+'&yd='+data[i].counter,
		'[' + data[i].type + ']' + data[i].title,'#?id'+ data[i].authorId,data[i].authorName,preTime,'#?id' + data[i].lastId,
		data[i].lastName,lastTime,data[i].counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/topictext.gif');
				}
			},
			error : function(err){
				console.log(err.status);
			}
		});
	}
	
	/*.BBS_announcement*/
	$.ajax({
		url : 'getNotice.do',
	    type : 'get',
		success : function(data){
			$('.announcement p').eq(0).text(data.content);
			$('.announcement p').eq(1).text(data.date);
		},
		error : function(err){
			console.log(err.status);
		}
	});

	$('.BBS_announcement img').click(function(){	
		if(iBtn){
			$(this).attr('src','img/BBS/cate_open.gif');
			$('.announcement').hide('1000');
			$('.BBS_announcement span').text('展开');
		}else{
			$(this).attr('src','img/BBS/cate_fold.gif');
			$('.announcement').show('1000');
			$('.BBS_announcement span').text('收起');
		}
		iBtn = !iBtn;
	});

	/*分页*/
	var $num = parseInt($('.page_search').prev().text().substring(1));
	$('.jm_bbs_main_bottom_pagingLeft').eq(0).delegate('a','mouseenter',function(){
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
		//console.log( $('.bbs_main_nav ul').find('.font').index() );
		var $navText = $('.bbs_main_nav ul').find('.font').text();
		var $navTab = $('.tabA ul').find('.active').text();
		var $tabTitle = $('.tabA ul').find('.active').attr('title');

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

		if( $(this).text() == 1){
			$('.bbs_main_buttom').html('');
			$('.box').html('');
			$(this).addClass('active');
			
			if( $navText == '全部' && $navTab == '全部'){
				ajaxBox();
				ajaxPage( parseInt($(this).text()) - 1 );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode(parseInt($(this).text()) - 1,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( parseInt($(this).text()) - 1,$navText );
			}
		}else if($(this).text() == 2){

			if($num>5){
				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($text-1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($text).addClass('active');
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($text+1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($text+2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($text+3);
			}else{
				$(this).addClass('active');
			}
			
			$('.bbs_main_buttom').html('');
			$('.box').html('');

			if( $navText == '全部' && $navTab == '全部'){
				ajaxPage( parseInt($(this).text()) - 1 );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode(parseInt($(this).text()) - 1,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( parseInt($(this).text()) - 1,$navText );
			}

		}else if($(this).text() == $num - 1){

			if($num>5){
				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($text-3);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($text-2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($text-1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($text).addClass('active');
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($text+1);
			}else{
				$(this).addClass('active');
			}
			
			$('.bbs_main_buttom').html('');
			$('.box').html('');

			if( $navText == '全部' && $navTab == '全部'){
				ajaxPage( parseInt($(this).text()) - 1 );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode(parseInt($(this).text()) - 1,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( parseInt($(this).text()) - 1,$navText );
			}

		}else if($(this).text() == $num ){

			$('.bbs_main_buttom').html('');
			$('.box').html('');
			$(this).addClass('active');

			if( $navText == '全部' && $navTab == '全部'){
				ajaxPage( parseInt($(this).text()) - 1 );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode(parseInt($(this).text()) - 1,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( parseInt($(this).text()) - 1,$navText );
			}

		}else{
			
			$('.bbs_main_buttom').html('');
			$('.box').html('');
			$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($text-2);
			$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($text-1);
			$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($text).addClass('active');
			$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($text+1);
			$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($text+2);

			if( $navText == '全部' && $navTab == '全部'){
				ajaxPage( parseInt($(this).text()) - 1 );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode(parseInt($(this).text()) - 1,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( parseInt($(this).text()) - 1,$navText );
			}
		}
	});

	$('.prov').css('display','none');
	if( $num<6 ){
		$('.page_search').eq(0).css('display','none');
	}else{
		$('.page_search').eq(0).css('display','inline-block');
	}
	
	$('.jm_bbs_main_bottom_pagingLeft').eq(0).delegate('.prov','click',function(){
		$('.next').css('display','inline-block');
		var $index = $('.jm_bbs_main_bottom_pagingLeft').find('.active').index();
		var $text = $('.jm_bbs_main_bottom_pagingLeft').find('.active').text();
		var $num = parseInt($('.page_search').prev().text().substring(1));
		var num = $index-2;
		
		var $navText = $('.bbs_main_nav ul').find('.font').text();
		var $navTab = $('.tabA ul').find('.active').text();
		var $tabTitle = $('.tabA ul').find('.active').attr('title');
		
		var $html = parseInt( $('.jm_bbs_main_bottom_pagingLeft a').eq(num).text() );

		if( $text-1 == 1){//第一页

			$(this).css('display','none');
			$('.jm_bbs_main_bottom_pagingLeft a').removeClass('active');
			$('.jm_bbs_main_bottom_pagingLeft a').eq(num).addClass('active');
			$('.bbs_main_buttom').html('');
			$('.box').html('');
			if( $navText == '全部' && $navTab == '全部'){
				ajaxBox();
				ajaxPage( 0 );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode(0,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( 0,$navText );
			}
			
		}else{
			$('.jm_bbs_main_bottom_pagingLeft a').removeClass('active');
			if($num > 5){
				if($html == 2){
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html+1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html+2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+3);

					$('.bbs_main_buttom').html('');

					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( num );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode(num,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( num,$navText );
					}

				}else if($html == 1){
					$(this).css('display','none');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html+1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html+2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html+3);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+4);

					$('.bbs_main_buttom').html('');

					if( $navText == '全部' && $navTab == '全部'){
						ajaxBox();
						ajaxPage( 0 );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode(0,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( 0,$navText );
					}

				}else if($html == $num-1){
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-3);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html-2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+1);

					$('.bbs_main_buttom').html('');

					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( num );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode(num,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( num,$navText );
					}

				}else{
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html+1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+2);

					$('.bbs_main_buttom').html('');

					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( num );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode(num,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( num,$navText );
					}
				}
			}else{
				$('.jm_bbs_main_bottom_pagingLeft a').eq(num).addClass('active');

				$('.bbs_main_buttom').html('');

				if( $navText == '全部' && $navTab == '全部'){
					ajaxPage( num );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode(num,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( num,$navText );
				}
	
			}
		}
	});
	$('.jm_bbs_main_bottom_pagingLeft').eq(0).delegate('.next','click',function(){
		$('.box').html('');
		$('.prov').css('display','inline-block');
		var $index = $('.jm_bbs_main_bottom_pagingLeft').find('.active').index();
		var $text = $('.jm_bbs_main_bottom_pagingLeft').find('.active').text();
		var $num = parseInt($('.page_search').prev().text().substring(1));

		var $html = parseInt($('.jm_bbs_main_bottom_pagingLeft a').eq($index).text());

		var $navText = $('.bbs_main_nav ul').find('.font').text();
		var $navTab = $('.tabA ul').find('.active').text();
		var $tabTitle = $('.tabA ul').find('.active').attr('title');

		if( parseInt($text) + 1 == $num){//最后一页
			$(this).css('display','none');
			$('.jm_bbs_main_bottom_pagingLeft a').removeClass('active');
			$('.jm_bbs_main_bottom_pagingLeft a').eq($index).addClass('active');

			$('.bbs_main_buttom').html('');

			if( $navText == '全部' && $navTab == '全部'){
				ajaxPage( $index );
			}else if($navText == '全部' && $navTab != '全部'){
				jinghuaAddNode($index,$tabTitle);
			}else if($navText != '全部' && $navTab == '全部'){
				leixinAddNode( $index,$navText );
			}
		}else{
			$('.jm_bbs_main_bottom_pagingLeft a').removeClass('active');
			if($num > 5){
				if($html == 2){
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html+1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html+2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+3);

					$('.bbs_main_buttom').html('');
			
					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( $index );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode($index,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( $index,$navText );
					}
				}else if($html == $num-1){
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-3);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html-2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+1);

					$('.bbs_main_buttom').html('');
			
					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( $index );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode($index,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( $index,$navText );
					}

				}else if($html == $num){
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-4);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html-3);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html-2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html).addClass('active');
					$('.next').css('display','none');

					$('.bbs_main_buttom').html('');
			
					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( $index );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode($index,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( $index,$navText );
					}
				}else{
					$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($html-2);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($html-1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($html).addClass('active');
					$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($html+1);
					$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($html+2);

					$('.bbs_main_buttom').html('');
			
					if( $navText == '全部' && $navTab == '全部'){
						ajaxPage( $index );
					}else if($navText == '全部' && $navTab != '全部'){
						jinghuaAddNode($index,$tabTitle);
					}else if($navText != '全部' && $navTab == '全部'){
						leixinAddNode( $index,$navText );
					}
				}
			}else{
				$('.jm_bbs_main_bottom_pagingLeft a').eq($index).addClass('active');

				$('.bbs_main_buttom').html('');
			
				if( $navText == '全部' && $navTab == '全部'){
					ajaxPage( $index );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode($index,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( $index,$navText );
				}
			}
		}
	});

	//console.log(parseInt($('.jm_bbs_main_bottom_pagingLeft .page_search').prev().text().substring(1)));

	$('.jm_bbs_main_bottom_pagingLeft').eq(0).delegate('.page_search span','click',function(){

		var $valGo =  parseInt( $('.page_search').eq(0).find('input').val() );
		$('.jm_bbs_main_bottom_pagingLeft a').removeClass('active');

		var $num = parseInt($('.jm_bbs_main_bottom_pagingLeft .page_search').prev().text().substring(1));

		var $navText = $('.bbs_main_nav ul').find('.font').text();
		var $navTab = $('.tabA ul').find('.active').text();
		var $tabTitle = $('.tabA ul').find('.active').attr('title');
	
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

				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($valGo).addClass('active');
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($valGo+1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($valGo+2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($valGo+3);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($valGo+4);

				$('.bbs_main_buttom').html('');
				$('.box').html('');

				if( $navText == '全部' && $navTab == '全部'){
					ajaxBox();
					ajaxPage( $valGo - 1 );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode($valGo - 1,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( $valGo - 1,$navText );
				}
			}else if($valGo == 2){

				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($valGo-1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($valGo).addClass('active');
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($valGo+1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($valGo+2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($valGo+3);

				$('.bbs_main_buttom').html('');
				$('.box').html('');

				if( $navText == '全部' && $navTab == '全部'){
					ajaxPage( $valGo - 1 );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode($valGo - 1,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( $valGo - 1,$navText );
				}
			}else if($valGo == $num){

				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($valGo-4);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($valGo-3);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($valGo-2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($valGo-1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($valGo).addClass('active');

				$('.bbs_main_buttom').html('');
				$('.box').html('');

				if( $navText == '全部' && $navTab == '全部'){
					ajaxPage( $valGo - 1 );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode($valGo - 1,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( $valGo - 1,$navText );
				}
			}else if($valGo == $num-1){

				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($valGo-3);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($valGo-2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($valGo-1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($valGo).addClass('active');
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($valGo+1);

				$('.bbs_main_buttom').html('');
				$('.box').html('');

				if( $navText == '全部' && $navTab == '全部'){
					ajaxPage( $valGo - 1 );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode($valGo - 1,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( $valGo - 1,$navText );
				}
			}else{

				$('.jm_bbs_main_bottom_pagingLeft a').eq(0).text($valGo-2);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(1).text($valGo-1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(2).text($valGo).addClass('active');
				$('.jm_bbs_main_bottom_pagingLeft a').eq(3).text($valGo+1);
				$('.jm_bbs_main_bottom_pagingLeft a').eq(4).text($valGo+2);

				$('.bbs_main_buttom').html('');
				$('.box').html('');

				if( $navText == '全部' && $navTab == '全部'){
					ajaxPage( $valGo - 1 );
				}else if($navText == '全部' && $navTab != '全部'){
					jinghuaAddNode($valGo - 1,$tabTitle);
				}else if($navText != '全部' && $navTab == '全部'){
					leixinAddNode( $valGo - 1,$navText );
				}
			}
		}else{
			alert('输入错误');
		}
		
	});

	/*搜索*/

	$('.pageFirst span').eq(0).on('click',function(){
		var $val = $('.pageFirst input').eq(0).val();

		$('.bbs_main_nav li').removeClass('font');
		$('.bbs_main_nav li').eq(0).addClass('font');

		$('.tabA li').removeClass('active');
		$('.tabA li').eq(0).addClass('active');

		$.ajax({
			url : 'search.do',
	    	type : 'get',
	    	data :{key : $val},
			success : function(data){
				$('.bbs_main_buttom').html('');
				$('.box').html('');
				for(var i=0;i<data.length;i++){
					var preTime = dateTime(data[i].postingDir.date);
					var lastTime = dateLast( data[i].lastDate );
					addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].postingDir.replyCount+'&yd='+data[i].postingDir.counter,
				'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime,'#?id' + data[i].lastId,
				data[i].lastName,lastTime,data[i].postingDir.counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/topictext.gif');
				}
			},
			error : function(err){
				console.log(err.status);
			}
		});
	});

	$(".pageFirst").keydown(function(ev){
		var $val = $('.pageFirst input').eq(0).val();

		$('.bbs_main_nav li').removeClass('font');
		$('.bbs_main_nav li').eq(0).addClass('font');

		$('.tabA li').removeClass('active');
		$('.tabA li').eq(0).addClass('active');

        if(ev.which == 13){
        	$.ajax({
				url : 'search.do',
		    	type : 'get',
		    	data :{key : $val},
				success : function(data){
					$('.bbs_main_buttom').html('');
					$('.box').html('');
					for(var i=0;i<data.length;i++){
						var preTime = dateTime(data[i].postingDir.date);
						var lastTime = dateLast( data[i].lastDate );
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].postingDir.replyCount+'&yd='+data[i].postingDir.counter,
					'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime,'#?id' + data[i].lastId,
					data[i].lastName,lastTime,data[i].postingDir.counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/topictext.gif');
					}
				},
				error : function(err){
					console.log(err.status);
				}
			});
        }
    });
	/*精华--*/

	$('.tabA').delegate('li','mouseenter',function(){
		$(this).css({
			background : '#00a2ca',
			color : '#fff'
		});
	}).delegate('li','mouseleave',function(){
		$(this).css({
			background : '',
			color : ''
		});
	}).delegate('li','click',function(){
		$('li').removeClass('active');
		if( $(this).text() != '全部' ){
			$('.bbs_main_nav li').removeClass('font');
			$('.bbs_main_nav li').eq(0).addClass('font');
		}
		$('.tabA li').eq(0).attr('title','all');
		$('.tabA li').eq(1).attr('title','good');
		$('.tabA li').eq(2).attr('title','top');
		$('.tabA li').eq(3).attr('title','fire');

		$(this).addClass('active');
		$.ajax({
			url : 'vipPostingCount.do',
		    type : 'get',
		    data : {vipType : $(this).attr('title')},
			success : function(data){
				$('.jm_bbs_main_bottom_pagingLeft').html('');
				addPage(parseInt(data/20) + 1,'.jm_bbs_main_bottom_pagingLeft');
			},
			error : function(err){
				console.log(err.status);
			}
		});

		jinghuaAddNode(0,$(this).attr('title'));		
	});

	/*情感交流--*/
	$('.bbs_main_nav').delegate('li','mouseenter',function(){
		$(this).css('font-weight','bold');
	}).delegate('li','mouseleave',function(){
		$(this).css('font-weight','');
	}).delegate('li','click',function(){
		$('li').removeClass('font');
		$(this).addClass('font');
		if( $(this).text() != '全部' ){
			$('.tabA li').removeClass('active');
			$('.tabA li').eq(0).addClass('active');
		}
		$.ajax({
			url : 'postingByTypeCount.do',
		    type : 'get',
		    data : {type : $(this).text()},
			success : function(data){
				$('.jm_bbs_main_bottom_pagingLeft').html('');
				addPage(parseInt(data/20) + 1,'.jm_bbs_main_bottom_pagingLeft');
			},
			error : function(err){
				console.log(err.status);
			}
		});

		leixinAddNode(0,$(this).text());
		
		//console.log($(this).text());
	});

	/*content -> jm_bbs_main -> jm_bbs_main_bottom -> 
	jm_bbs_main_bottom_paging ->jm_bbs_main_bottom_pagingRight*/

	for(var n = 0;n<2;n++){
		(function(n){
			$('.jm_bbs_main_bottom_paging').eq(n).delegate('.jm_bbs_main_bottom_pagingRight','mouseenter',function(){
				clearInterval(timer);
				$('.paste_type').eq(n).finish().show('1000');
			}).delegate('.jm_bbs_main_bottom_pagingRight','mouseleave',function(){
				timer = setInterval(function(){
					$('.paste_type').eq(n).finish().hide('500');
				},100);
			}).delegate('.paste_type','mouseenter',function(){
				clearInterval(timer);
			}).delegate('.paste_type','mouseleave',function(){
				$('.paste_type').finish().hide('500');
			});
		})(n);
	}
	function leixinAddNode(num,text){
		$.ajax({
			url : 'postingByType.do',
			type : 'get',
			data : {
			    type : text,
			    star : num
			},
			success : function(data){
				$('.bbs_main_buttom').html('');
				$('.box').html('');
				for(var i=0;i<data.length;i++){
					var preTime = dateTime(data[i].date);
					var lastTime = dateLast( data[i].lastDate );
					addNode('#','personal.html?id=' + data[i].id +'&hf='+data[i].replyCount+'&yd='+data[i].counter,
				'[' + data[i].type + ']' + data[i].title,'#?id'+ data[i].authorId,data[i].authorName,preTime,'#?id' + data[i].lastId,
				data[i].lastName,lastTime,data[i].counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/topictext.gif');
				}
			},
			error : function(err){
				console.log(err.status);
			}
		});
	}
	function jinghuaAddNode(num,title){
		$.ajax({
			url : 'vipPostingByType.do',
			type : 'get',
			data : {
				vipType : title,
				star : num
			},
			success : function(data){
				$('.bbs_main_buttom').html('');
				$('.box').html('');
				for(var i=0;i<data.length;i++){
					var preTime = dateTime(data[i].postingDir.date);
					var lastTime = dateLast( data[i].lastDate );
					if(title == 'good'){
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].postingDir.replyCount+'&yd='+data[i].postingDir.counter,
				'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime,'#?id' + data[i].lastId,
				data[i].lastName,lastTime,data[i].postingDir.counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/good.gif');
					}else if( title == 'top'){
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].postingDir.replyCount+'&yd='+data[i].postingDir.counter,
				'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime,'#?id' + data[i].lastId,
				data[i].lastName,lastTime,data[i].postingDir.counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/topic.gif');
					}else{
						addNode('#','personal.html?id=' + data[i].postingDir.id +'&hf='+data[i].postingDir.replyCount+'&yd='+data[i].postingDir.counter,
				'[' + data[i].postingDir.type + ']' + data[i].postingDir.title,'#?id'+ data[i].postingDir.authorId,data[i].postingDir.authorName,preTime,'#?id' + data[i].lastId,
				data[i].lastName,lastTime,data[i].postingDir.counter,data[i].replyCount,'.bbs_main_buttom','img/BBS/topichot.gif');
					}
					
				}
			},
			error : function(err){
				console.log(err.status);
			}
		});
	}
	function addNode(userImgURL,Ahref,title,BAhref,askAuthor,begTime,endhref,endAuthor,endTime,numLY,numHF,nameClass,URL){
		
		/*
		userImgURL: 用户的头像	 
		Ahref: 标题的链接地址 		title:标题
		BAhref: 发表作者的链接		askAuthor:发表的作者  numLY : 浏览量
		begTime: 发表的时间			endAuthor: 回复的作者 numHF ： 回复量
		endTime: 回复的时间	 		endhref:回复作者的链接
		*/

		var $threadListDiv = $('<div class="threadlist"></div>');

		var $thListLeftDiv = $('<div class="threadlist_left"></div>');
		var $leftDivImg = $('<img />');
		$leftDivImg.attr('src',userImgURL);
		$thListLeftDiv.append($leftDivImg);

		var $thListCenterDiv = $('<div class="threadlist_center"></div>');

		var $cenDivTopP = $('<p class="threadlist_center_top"></p>');
		var $cenDivTopPimg = $('<img />');
		$cenDivTopPimg.attr('src',URL);
		var $cenDivTopPA = $('<a></a>');
		$cenDivTopPA.attr('href',Ahref);
		$cenDivTopPA.html(title);

		$cenDivTopP.append($cenDivTopPimg);
		$cenDivTopP.append($cenDivTopPA);

		var $cenDivBtnP = $('<p class="threadlist_center_botton"></p>');
		var $cenDivBtnPA = $('<a></a>');
		$cenDivBtnPA.attr('href',BAhref);
		$cenDivBtnPA.html(askAuthor);
		var $cenDivBtnPspan = $('<span></span>');
		$cenDivBtnPspan.html('发表于：' + begTime);
		var $cenDivBtnPspan1 = $('<span></span>');
		$cenDivBtnPspan1.html('最后回复：');
		var $cenDivBtnPspan1A = $('<a></a>');
		$cenDivBtnPspan1A.attr('href',endhref);
		$cenDivBtnPspan1A.html(endAuthor);
		$cenDivBtnPspan1.append($cenDivBtnPspan1A);
		var $cenDivBtnPspan2 = $('<span></span>');
		$cenDivBtnPspan2.html(endTime);

		$cenDivBtnP.append($cenDivBtnPA);
		$cenDivBtnP.append($cenDivBtnPspan);
		$cenDivBtnP.append($cenDivBtnPspan1);		
		$cenDivBtnP.append($cenDivBtnPspan2);

		$thListCenterDiv.append($cenDivTopP);
		$thListCenterDiv.append($cenDivBtnP);

		var $thListRightDiv = $('<div class="threadlist_right"></div>');
		var rightDivP1 = $('<p><span>浏览</span><br><b>' + numLY +'</b></p>');
		var rightDivP2 = $('<p><span>回复</span><br><b>' + numHF +'</b></p>');

		$thListRightDiv.append(rightDivP1);
		$thListRightDiv.append(rightDivP2);

		$threadListDiv.append($thListLeftDiv);
		$threadListDiv.append($thListCenterDiv);
		$threadListDiv.append($thListRightDiv);

		$(nameClass).append($threadListDiv);
	}
});