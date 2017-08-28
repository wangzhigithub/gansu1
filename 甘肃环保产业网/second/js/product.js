$(function() {
	$("#header").load("../../common/html/header.html");
	page(true);
//	传入type的参数
//  true->全部   /  true1->环保设备   / 1->水污染治理设备 / 2->大气污染治理设备 / 3->噪声治理设备 / 4->固体污染治理设备
//	true1->节能设备 / 5->工业领域节能设备 / 6->建筑领域节能设备 / 7->交通领域节能设备 / 8->电传输领域节能设备 / 9->照明领域节能设备
//	true3->新型设备 / 10->3D打印技术  / 11->其他
	pageIm();

	var assLiClickFlag = true; //设置内容在0.5s内不点再次点击
//  环保设备一行点击
	$(".pro_s_ul1 li").on("click", function() {		
		var i = $(this).index();
		if(assLiClickFlag === true) {
			assLiClickFlag = false;
			$(".pro_s_ul li").find("a").removeClass("pro_s_ulc");
			$(".pro_s_ul1 li").eq(i).find("a").addClass("pro_s_ulc")
			$(".pro_s_ul1 li").eq(0).find("a").removeClass("pro_s_ulc")
			var text=$(".pro_s_ul1 li").eq(i).find("a").html();
			
			if(text == "环保设备") {
				text = "true1";
			}
			if(text == "水污染治理设备") {
				text = 1;
			}
			if(text == "大气污染治理设备") {
				text = 2;
			}
			if(text == "噪声治理设备") {
				text = 3;
			}
			if(text == "固体污染治理设备") {
				text = 4;
			}
			 $(".pageDiv").html("");
			$(".pageObj").html("");
			page(text);
	        pageIm();
			
			setTimeout(function() {
				assLiClickFlag = true;
			}, 500) //0.5秒内不能重复点击
		} else {
			alert('点击次数过快') //测试
		}
	});
//	节能设备一行点击
	$(".pro_s_ul2 li").on("click", function() {		
		var i = $(this).index();
		if(assLiClickFlag === true) {
			assLiClickFlag = false;
			$(".pro_s_ul li").find("a").removeClass("pro_s_ulc");
			$(".pro_s_ul2 li").eq(i).find("a").addClass("pro_s_ulc")
			$(".pro_s_ul2 li").eq(0).find("a").removeClass("pro_s_ulc")
			var text=$(".pro_s_ul2 li").eq(i).find("a").html();
			
			
			if(text =="节能设备") {
				text = "true2";
			}
			if(text == "工业领域节能设备") {
				text = 5;
			}
			if(text == "建筑领域节能设备") {
				text = 6;
			}
			if(text == "交通领域节能设备") {
				text = 7;
			}
			if(text == "电传输领域节能设备") {
				text = 8;
			}
			if(text == "照明领域节能设备") {
				text = 9;
			}
			$(".pageDiv").html("");
			$(".pageObj").html("");
			page(text);
	        pageIm();
			
			setTimeout(function() {
				assLiClickFlag = true;
			}, 500) //0.5秒内不能重复点击
		} else {
			alert('点击次数过快') //测试
		}
	});
	//	新型设备一行点击
	$(".pro_s_ul3 li").on("click", function() {		
		var i = $(this).index();
		if(assLiClickFlag === true) {
			assLiClickFlag = false;
			$(".pro_s_ul li").find("a").removeClass("pro_s_ulc");
			$(".pro_s_ul3 li").eq(i).find("a").addClass("pro_s_ulc")
			$(".pro_s_ul3 li").eq(0).find("a").removeClass("pro_s_ulc")
			var text=$(".pro_s_ul3 li").eq(i).find("a").html();
			
			
			if(text =="新型设备") {
				text = "true3";
			}
			if(text == "3D打印技术") {
				text = 10;
			}
			if(text == "其他") {
				text = 11;
			}

			$(".pageDiv").html("");
			$(".pageObj").html("");
			page(text);
	        pageIm();
			
			setTimeout(function() {
				assLiClickFlag = true;
			}, 500) //0.5秒内不能重复点击
		} else {
			alert('点击次数过快') //测试
		}
	});
	
	
	

	//	接受从..里面传入的hash值
	(function() {
		//  	     判断接受的值,然后从后台数据调去相对应的数据渲染到页面当中
		if(getUrlParams("nub")) {
			var ll = getUrlParams("nub");

		}
		/*获取页面url传过来的参数*/
		function getUrlParams(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null)
				return r[2];
			else
				return "";
		}
	})();
})
//分页的所有效果js函数
function page(t) {

	$.fn.pageFun = function(options) {

		var defaults = {
			pageDiv: $(this).find(".pageDiv"),
			pageDivLi: $(this).find(".pageDiv li"),
			page: $(this).find(".page"),
			pageMenu: $(this).find(".pageMenu"),
			pageMenuLi: $(this).find(".pageDiv li"),
			firstPage: $(this).find(".firstPage"),
			prevPage: $(this).find(".prevPage"),
			pageNum: $(this).find(".pageNum"),
			nextPage: $(this).find(".nextPage"),
			pageObj: $(this).find(".pageObj"),
			pageObjLi: $(this).find(".pageObj li"),
			lastPage: $(this).find(".lastPage"),
			keuInput: $(this).find(".keuInput"),
			btnSure: $(this).find(".btnSure"),
			notContent: $(this).find(".notContent"),
			totalPage: $(this).find(".totalPage"),
			pNum: 1,
			lastNum: 0,
			cacheNum: 1,
			min: 0,
			res: null
		};
		var opts = $.extend({}, defaults, options);

		var Method = {
			init: function() {
				Method.getData(t); /*请求接口获得数据*/
				Method.handleEvent(); /*事件处理*/
			},

			getData: function(t) {
				$.ajax({
					type: "GET",
					url: opts.interFace,
					data: {
						"type": t,
					},
					timeout: 1000,
					dataType: "json",
					success: function(data) {
						if(data.status == "ok") {
							opts.res = data.data;

							//							console.log(opts.res)
							//判断数据的个数是否让下面的分页按钮出现
							if(opts.res.length <= opts.displayCount) {
								defaults.page.hide()
							}

							if((opts.res.length <= opts.displayCount) && (opts.res.length > 0)) {
								opts.displayCount = opts.res.length;
								opts.lastPage.addClass("disabled");
								opts.nextPage.addClass("disabled");
							} else if(opts.res.length == 0) {
								opts.notContent.removeClass("hide");

								opts.firstPage.addClass("disabled");
								opts.prevPage.addClass("disabled");
								opts.lastPage.addClass("disabled");
								opts.nextPage.addClass("disabled");
								opts.firstPage.off("click");
								opts.lastPage.off("click");
								opts.prevPage.off("click");
								opts.nextPage.off("click");
								return;
							} else {

								opts.pNum = Math.ceil(opts.res.length / opts.displayCount);
							}

							opts.notContent.addClass("hide");
							for(var i = 0; i < opts.displayCount; i++) {
								opts.pageDiv.append(opts.dataFun(opts.res[i]));
							}

							for(var i = 0; i < opts.pNum; i++) {
								opts.pageObj.append(opts.pageFun(i + 1));
							}

							opts.firstPage.addClass("disabled");
							opts.prevPage.addClass("disabled");
							opts.pageObj.find("li:first-child").addClass("active");
							opts.totalPage.text(opts.pNum);
							Method.showPageindex(0, opts.maxPage, 0);
						} else {

						}

					}

				});

			},
			handleEvent: function() {
				opts.pageObj.on("click", "li", function() { /*点击页码切换*/
					$(this).addClass("active");
					opts.pageDiv.empty();
					$(this).siblings("li").removeClass("active");

					opts.cacheNum = $(this).text();
					if($(this).text() == 1) {
						opts.firstPage.addClass("disabled");
						opts.prevPage.addClass("disabled");
						opts.lastPage.removeClass("disabled");
						opts.nextPage.removeClass("disabled");
						if(opts.pNum == 1) {
							opts.lastPage.addClass("disabled");
							opts.nextPage.addClass("disabled");
							Method.xhhtml($(this).text(), opts.res.length);
							return;
						};

					} else if($(this).text() == opts.pNum) {
						opts.firstPage.removeClass("disabled");
						opts.prevPage.removeClass("disabled");
						opts.lastPage.addClass("disabled");
						opts.nextPage.addClass("disabled");

						if(opts.res.length < (opts.displayCount * opts.pNum)) {
							Method.xhhtml($(this).text(), opts.res.length);
							return
						}

					} else {
						opts.firstPage.removeClass("disabled");
						opts.prevPage.removeClass("disabled");
						opts.lastPage.removeClass("disabled");
						opts.nextPage.removeClass("disabled");
					}
					Method.showPageindex(0, opts.maxPage, $(this).text());
					Method.xhhtml($(this).text(), $(this).text() * opts.displayCount);
				});

				opts.prevPage.on("click", function() { /*点击上页*/

					if(opts.cacheNum == 1) {

						return;
					}

					if(opts.cacheNum == 2) {
						opts.firstPage.addClass("disabled");
						opts.prevPage.addClass("disabled");
					}

					opts.pageDiv.empty();
					opts.cacheNum--
						opts.lastPage.removeClass("disabled");
					opts.nextPage.removeClass("disabled");
					$(".pageObj li").eq(opts.cacheNum - 1).addClass("active");
					$(".pageObj li").eq(opts.cacheNum - 1).siblings("li").removeClass("active");
					Method.xhhtml(opts.cacheNum, opts.cacheNum * opts.displayCount);
					Method.showPageindex(0, opts.maxPage, opts.cacheNum);
				});

				opts.nextPage.on("click", function() { /*点击下页*/

					if(opts.cacheNum == opts.pNum) {
						return;
					}
					opts.pageDiv.empty();
					opts.cacheNum++
						$(".pageObj li").eq(opts.cacheNum - 1).addClass("active");
					$(".pageObj li").eq(opts.cacheNum - 1).siblings("li").removeClass("active");
					if(opts.cacheNum == opts.pNum) {
						opts.lastPage.addClass("disabled");
						opts.nextPage.addClass("disabled");
						Method.xhhtml(opts.cacheNum, opts.res.length);
					} else {
						Method.xhhtml(opts.cacheNum, opts.cacheNum * opts.displayCount);
						opts.firstPage.removeClass("disabled");
						opts.prevPage.removeClass("disabled");
					}
					Method.showPageindex(0, opts.maxPage, opts.cacheNum);
				});

				opts.firstPage.on("click", function() { /*点击首页*/
					opts.pageDiv.empty();
					opts.firstPage.addClass("disabled");
					opts.prevPage.addClass("disabled");
					opts.lastPage.removeClass("disabled");
					opts.nextPage.removeClass("disabled");
					$(".pageObj li").eq(0).addClass("active");
					$(".pageObj li").eq(0).siblings("li").removeClass("active");
					Method.xhhtml(1, opts.displayCount);
					opts.cacheNum = 1;
					Method.showPageindex(0, opts.maxPage, 0);
				});

				opts.lastPage.on("click", function() { /*点击尾页*/
					opts.pageDiv.empty();
					opts.firstPage.removeClass("disabled");
					opts.prevPage.removeClass("disabled");
					opts.lastPage.addClass("disabled");
					opts.nextPage.addClass("disabled");
					$(".pageObj li").eq(opts.pNum - 1).addClass("active");
					$(".pageObj li").eq(opts.pNum - 1).siblings("li").removeClass("active");
					opts.cacheNum = opts.pNum;
					Method.xhhtml(opts.pNum, opts.res.length);
					Method.showPageindex(0, opts.maxPage, opts.pNum);
				});

				opts.btnSure.on("click", function() { /*输入页码 跳转*/
					var val = opts.keuInput.val();
					if((val == "") || val <= 0) {
						opts.keuInput.val(1);
						alert("请输入有效页码");
						return
					}

					if((Number(val) > opts.pNum)) {
						alert('共' + opts.pNum + '页');
						return
					}
					opts.pageDiv.empty();

					$(".pageObj li").eq(val - 1).addClass("active");
					$(".pageObj li").eq(val - 1).siblings("li").removeClass("active");
					opts.cacheNum = val;
					Method.showPageindex(0, opts.maxPage, val);
					if(val == "1") {
						opts.firstPage.addClass("disabled");
						opts.prevPage.addClass("disabled");
						opts.lastPage.removeClass("disabled");
						opts.nextPage.removeClass("disabled");
						if(opts.pNum == 1) {
							opts.firstPage.addClass("disabled");
							opts.prevPage.addClass("disabled");
							opts.lastPage.addClass("disabled");
							opts.nextPage.addClass("disabled");
						}
					} else if(val == opts.pNum) {

						opts.firstPage.removeClass("disabled");
						opts.prevPage.removeClass("disabled");
						opts.lastPage.addClass("disabled");
						opts.nextPage.addClass("disabled");
						Method.xhhtml(val, opts.res.length);
						return;
					} else {
						opts.firstPage.removeClass("disabled");
						opts.prevPage.removeClass("disabled");
						opts.lastPage.removeClass("disabled");
						opts.nextPage.removeClass("disabled");
					}

					Method.xhhtml(val, val * opts.displayCount);
				});

			},
			xhhtml: function(index, count) {
				for(var i = ((index - 1) * opts.displayCount); i < count; i++) {
					opts.pageDiv.append(opts.dataFun(opts.res[i]));
				}
				opts.keuInput.val(index);
			},
			showPageindex: function(min, max, index) {
				if(index <= Math.ceil(max / 2)) {
					min = 0;
					max = max;
				} else if(opts.pNum - index < Math.ceil(max / 2)) {
					min = opts.pNum - max;
					max = opts.pNum;
				} else {

					min = Math.round(index - max / 2) - 1;
					max = Math.round(Number(index) + Number(max / 2)) - 1;
				}
				$(".pageObj li").hide();
				for(var i = min; i < max; i++) {
					$(".pageObj li").eq(i).show();
				}

			}
		}

		Method.init();
	}

}
//多少行  一个多少个 url的选定的js
function pageIm() {

	$(".pro_x .pageBox").pageFun({ /*在本地服务器上才能访问哦*/
		interFace: "../product.json",
		/*接口*/
		displayCount: 15,
		/*每页显示总条数*/
		maxPage: 5,
		/*每次最多加载多少页*/
		dataFun: function(data) {
			var dataHtml = "<li><a href='" + data.href + "' target='_blank'><img src='" + data.images + "'/></a><p>" + data.price + "</p><p><a href='" + data.href1 + "'  target='_blank'>" + data.product + "</a></p><p><a href='" + data.href2 + "' target='_blank'>" + data.company + "</a></p></li>"
			//			var dataHtml = "<li>"+data.price+"</li>"
			return dataHtml;
		},
		pageFun: function(i) {
			var pageHtml = '<li class="pageNum">' + i + '</li>';
			return pageHtml;
		}

	});

}