$(function() {

	//swiper轮播插件
	var swiper = new Swiper('.swiper-container', {
		pagination: '.pagination',
		loopAdditionalSlides: 1,
		autoplay: 3000,
		speed: 600,
		loop: true,
		grabCursor: true,
		paginationClickable: true
	})

	//获取协会动态文字的数量
	$(document).ready(function() {
		//限制字符个数
		$(".ass3_f .ass3_f1").each(function() {
			var maxwidth = 117;
			if($(this).text().length > maxwidth) {
				$(this).text($(this).text().substring(0, maxwidth));
				$(this).html($(this).html() + '…');
			}
		});
	});

})

//收藏本页
function AddFavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch(e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch(e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加");
		};
	};
};

//			//收藏设置页面（首页）
//			function addToFavorite() {
//				var d = "http://www.jsfoot.com/";
//				var c = "jsfoot代码素材";
//				if(document.all) {
//					window.external.AddFavorite(d, c);
//				} else {
//					if(window.sidebar) {
//						window.sidebar.addPanel(c, d, "");
//					} else {
//						alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
//					}
//				}
//			}

//设为首页
function SetHome(obj) {
	try {
		obj.style.behavior = 'url(#default#homepage)';
		obj.setHomePage('http://www.jsfoot.com/');
	} catch(e) {
		if(window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			} catch(e) {
				alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
			};
		} else {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将'http://www.sina.com.cn/'设置为首页。");
		};
	};
};