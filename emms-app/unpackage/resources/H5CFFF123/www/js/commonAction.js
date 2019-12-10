/*var actionMuiCommon = {
	towebview: function(href,param) {
//		var href = this.getAttribute('href');
		console.log(JSON.stringify(param))
		if(href == "#") return;
		//非plus环境，直接走href跳转
		if(!mui.os.plus) {
			location.href = href;
			return;
		}

		if(href && ~href.indexOf('.html')) {
			//打开窗口的相关参数
			var options = {
				styles: {
					popGesture: "close"
				},
				show:{
					aniShow:'pop-in'
				},
				waiting:{
					autoShow:true
				},
				extras: param
			};
			
			options.styles.statusbar = {
				background: "#f7f7f7"
			}
			
			//打开新窗口
			mui.openWindow(
				href,
				href,
				options
			);
		}
	},
	gettodayDate : function(time) {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 0 && month <= 9) {month = "0" + month;}
	    if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate;}
	    var currentdate = "";
	    var hours = date.getHours();
	    var min = date.getMinutes();
	    if(date.getHours() < 10) hours = 0+""+date.getHours();
	    if(date.getMinutes() < 10) min = 0+""+date.getHours();
	    if(time){
	      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + min + seperator2 + date.getSeconds();
	    }else{
	      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	    }
    	return currentdate;
  },
}
*/

	var actionMuiCommon = function(){
		return {
			towebview: function(href,param) {
			//var href = this.getAttribute('href');
				if(href == "#") return;
				//非plus环境，直接走href跳转
				if(!mui.os.plus) {
					location.href = href;
					return;
				}
		
				if(href && ~href.indexOf('.html')) {
					//打开窗口的相关参数
					var options = {
						styles: {
							popGesture: "close"
						},
						show:{
							aniShow:'pop-in'
						},
						waiting:{
							autoShow:true
						},
						extras: param
					};
					
					options.styles.statusbar = {
						background: "#f7f7f7"
					}
					
					//打开新窗口
					mui.openWindow(
						href,
						href,
						options
					);
				}
			},
			gettodayDate : function(time) {
			    var date = new Date();
			    var seperator1 = "-";
			    var seperator2 = ":";
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 0 && month <= 9) {month = "0" + month;}
			    if (strDate >= 0 && strDate <= 9) {strDate = "0" + strDate;}
			    var currentdate = "";
			    var hours = date.getHours();
			    var min = date.getMinutes();
			    var sec = date.getSeconds();
			    if(date.getHours() < 10) hours = 0+""+date.getHours();
			    if(date.getMinutes() < 10) min = 0+""+date.getMinutes();
			    if(date.getSeconds() < 10) sec = 0+""+date.getSeconds();
			    if(time){
			      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + min + seperator2 + sec;
			    }else{
			      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			    }
		    	return currentdate;
			}
	}
}();