/*
	格式化链接后面带的数据,
	例：'index.html?id=154&hf=14521&yd=9865'；
	a是需要格式化的数据；
	b是第二次分隔数据的字符；
*/
function add(a,b){ 
    var b = a.split('?')[1].split(b);
    var obj = {};
    for(var i in b ){
        obj[ b[i].split('=')[0] ] = b[i].split('=')[1];
    }
    return obj;
}

/*
	回复距离多少时间
*/
function dateLast(lastTime ){
	if(lastTime != null){
		var t = new Date();
		var time = Math.floor((t.getTime() - lastTime)/1000);
		var time1 = new Date(lastTime);
		if(time < 60){
			return time + '秒前';
		}else if(time < 3600){
			return parseInt(time/60) + '分前';
		}else if(time < 3600*24){
			return parseInt(time/3600) + '小时前';
		}else if(time < 3600*24*7){
			return parseInt( time/(3600*24) ) + '天前';
		}else{
			return time1.getFullYear() + '-' + (time1.getMonth() + 1) + '-' + time1.getDate() + ' ' + time1.getHours() + ':' + time1.getMinutes();
		}
	}else{
		return '无';
	}
}
/* 将毫秒数转成时间*/
function dateTime(time){
	var time = new Date(time);
	var preTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes();

	return preTime;
}
/*分页*/
function addPage( num,className ){
	var $span1 = $('<span class="prov"><<</span>');
	$(className).append($span1);

	if( num < 5 ){
		for(var q=0; q<num; q++){
			var $a = $('<a href="javascript:;">'+ parseInt(q+1) +'</a>');
			if( q == 0){
				$a.addClass('active');
			}
			$(className).append($a);
		}
	}else{
		for(var w=0; w<5; w++){
			var $a = $('<a href="javascript:;">'+ parseInt(w+1) +'</a>');
			if( w == 0){
				$a.addClass('active');
			}
			$(className).append($a);
		}
	}

	var $span2 = $('<span class="next">>></span>');
	$(className).append($span2);

	var $span3 = $('<span>共' + num + '页</span>');
	$(className).append($span3);

	var $span4 = $('<span class="page_search"><input type="text" placeholder="Num"/><span>go</span></span>');
	$(className).append($span4);
}


