function sq_vip(){
    if($.cookie('login_session')==0){
		alert("请先登录！");return;
	}
    $(".vip_content").fadeIn();
}

$(function(){
	imgLazyLoad();//初始化
	//判断浏览器  
	var check, browser = {}, ua = navigator.userAgent.toLowerCase();  
	if(check = ua.match(/msie ([\d.]+)/)){  
	    browser.ie = check[1];  
	}else if(check = ua.match(/trident 7.0/)){  
	    browser.ie = '11.0';  
	}else if(check = ua.match(/chrome\/([\d.\d]+)/)){  
	    browser.chrome = check[1];  
	}else if(check = ua.match(/firefox\/([\d.\d]+)/)){  
	    browser.firefox = check[1];  
	}else if(check = ua.match()){  
	    browser.opera = check[1];  
	}  
	if(browser.ie){  
	    //IE浏览器  
	    $(window).scroll(imgLazyLoad);//浏览器的兼容  
	} else {  
	    //其他浏览器 ff chrome 测试通过  
	    $(document).scroll(imgLazyLoad);//当滚动条滚动时,扫描需要加载的div  
	}  	
	//当前页面的url，登录后返回
	var ret_url = location.href;
	//是否登录
	if(if_show){
		//带生效
	}else{
		//未上架商品，进入倒计时
		if(is_vaild==1){
			html = '<div class="fmid_fd clearfix"><p class="fd_pa clearfix"><span class="t_d"></span><span class="t_h"></span><span class="t_m"></span><span class="t_s"></span></p></div>';
			$('.goodsindex_fmid').append(html);
			var timer = setInterval(GetRTime,1000);
		}
	}

	function GetRTime(){
       var NowTime = new Date();
       var EndTime ;
       var t;
       var d,h,m,s;

		EndTime = new Date(up_time*1000);
		t = EndTime.getTime() - NowTime.getTime();

		if(t>0){
			d = Math.floor(t/1000/60/60/24);
			h = Math.floor(t/1000/60/60%24);
			m = Math.floor(t/1000/60%60);
			s = Math.floor(t/1000%60);
		}else{
			d = 0;
			h = 0;
			m = 0;
			s = 0;
		}

		if(t<=0){
			$('.t_d').html('');
			$('.t_h').html('活动正在开启，稍等...');
			$('.t_m').html('');
			$('.t_s').html('');
		}else{
			$(".t_d").html(d + "天");
			$(".t_h").html(h + "时");

			if(m<10){
				$(".t_m").html("0" + m + "分");
			}else{
				$(".t_m").html(m + "分");
			}

			if(s<10){
				$(".t_s").html("0" + s + "秒");
			}else{
				$(".t_s").html(s + "秒");
			}
		}
	}

	//使用cookie判断是否登陆
	if($.cookie('login_session')!=0){
		$("#is_show").css('display','block');
		$("#is_not_show").css('display','none');

		//登录后的规格显示
		var h3;
		var h4;
		var vip_status=0 ;
		var url = '/index.php?app=f_goods_new&act=get_vip_status';
		$.ajax({
			url: url,
			dataType: 'json',
			success: function(data){
				if(data.code==200){
					vip_status = data.vip_status;
					console.log("sssssssssssssssss"+section);
					if (section && is_daixiao!=1) {				//如果有批发区间
						$('#content').children().eq(1).hide();
						$('#content').children().eq(2).show();
						if ($('#content').children().eq(3).html()) {$('#content').children().eq(3).show()};
						if ($('#content').children().eq(4).html()) {$('#content').children().eq(4).show()};
						if ($('#content').children().eq(5).html()) {$('#content').children().eq(5).show()};
					} else {					//没有批发区间
						h3 = '<span class="value_top" >≥1件</span>';
						if(vip_status==0 || vip_status==3){
						    var vip_name="&nbsp;<span id='span_vip' style='display: inline;'><b id='sq_vip' onclick='sq_vip()' style='color:#ffc18c;font-size:12px;cursor:pointer;text-decoration:underline'>申请成为VIP</b></span>";
			            }else if(vip_status==1){
			                var vip_name="<b style='font-size:12px;'>&nbsp;申请审核中请稍等~</b>";
			            }else if(vip_status==2){
							if(has_fenxiao_price_section && fenxiao_price_section){
								if(is_vip_goods==1) {
									var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + vip_fenxiao_price_section + '<b style="font-size:13px;">&nbsp;&nbsp;VIP专享价&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;原价：￥'+fenxiao_price_section+'</b></span>';
			                    }else{
			                        var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price_section + '<b style="font-size:14px;">&nbsp;&nbsp;分销价</b></span>';
			                    }
							}else{
								if(is_vip_goods==1){
			                        var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + vip_fenxiao_price_section + '<b style="font-size:13px;">&nbsp;&nbsp;VIP专享价&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;原价：￥'+fenxiao_price+'</b></span>';
			                    }else{
			                        var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:14px;">&nbsp;&nbsp;分销价</b></span>';
			                    }
			                }
			            }
						if(has_fenxiao_price_section && fenxiao_price_section) {
							if(vip_status==2){
								h4 = vip_name;
							}else{
								if (is_vip_goods==1 && is_vip_hidden==1){
									h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price_section + '<b style="font-size:12px;">&nbsp;&nbsp;|&nbsp;&nbsp;VIP专享价：￥' + vip_fenxiao_price_section + '&nbsp;&nbsp;</b>'+vip_name+'</span>';
								}else{
									h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price_section + '<b style="font-size:12px;">&nbsp;&nbsp;分销价&nbsp;&nbsp;</b>'+vip_name+'</span>';
								}
			                }
						}else{
							if(vip_status==2){
			                    h4 = vip_name;
							}else{
								if (is_vip_goods==1 && is_vip_hidden==1) {
									h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:12px;">&nbsp;&nbsp;|&nbsp;&nbsp;VIP专享价：￥' + vip_fenxiao_price_section + '&nbsp;&nbsp;</b>'+vip_name+'</span>';
								}else if(is_vip_goods==1){
									h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:12px;">&nbsp;&nbsp;分销价&nbsp;&nbsp;</b>'+vip_name+'</span>';
								}else{
                                    h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:12px;">&nbsp;&nbsp;分销价</span>';
                                }
			                }
			            }
			            $('#qipijia').html(h3 + h4);
					}
				}
			}
		});

		if (if_show) {
			var url = '/index.php?app=f_goods_new&act=goods_spec&goods_id='+goods_id+'&login=1'
			if (!is_daixiao && qipi_quantity) url += '&is_pifa=1&qipi_quantity='+qipi_quantity
			$.ajax({
				url: url,
				dataType: 'html',
				success: function(html){
					$('.goodsindex_fmid').append(html);
				}
			});
		}
	}else{
		//未登录
		$.getJSON('/index.php?app=f_member&act=has_login', function(user){
			if (user==null || user=='') {
				//没有登录时的规格显示
				if (if_show) {
					$.ajax({
						url: '/index.php?app=f_goods_new&act=goods_spec&goods_id='+goods_id+'&login=0',
						dataType: 'html',
						success: function(html){
							$('.goodsindex_fmid').append(html);
						}
					});
				}
				return false;
			}

			$("#is_show").css('display','block');
			$("#is_not_show").css('display','none');

			//登录后的规格显示
			if (if_show) {
				var url = '/index.php?app=f_goods_new&act=goods_spec&goods_id='+goods_id+'&login=1'
				if (!is_daixiao && qipi_quantity) url += '&is_pifa=1&qipi_quantity='+qipi_quantity
				$.ajax({
					url: url,
					dataType: 'html',
					success: function(html){
						$('.goodsindex_fmid').append(html);
					}
				});
			}
			console.log(is_daixiao+"ddddddddddddddddddddd")
			if (section && is_daixiao==0) {				//如果有批发区间
				console.log("sdsdsdsdsdsd123131");
				$('#content').children().eq(1).hide();
				$('#content').children().eq(2).show();
				if ($('#content').children().eq(3).html()) {$('#content').children().eq(3).show()};
				if ($('#content').children().eq(4).html()) {$('#content').children().eq(4).show()};
				if ($('#content').children().eq(5).html()) {$('#content').children().eq(5).show()};
			} else {					//没有批发区间
				h3 = '<span class="value_top" >≥1件</span>';
				if(has_fenxiao_price_section && fenxiao_price_section) {
					h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥'+fenxiao_price_section+'<b style="font-size:14px;">&nbsp;&nbsp;分销价</b></span>';
				} else
					h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥'+fenxiao_price+'<b style="font-size:14px;">&nbsp;&nbsp;分销价</b></span>';
				$('#qipijia').html(h3 + h4);
			}
		});
	}

    $("#chakan").click(function(){
        chakan();
    })

    $("#pifa_price").click(function(){
        pifa_price();
    })

    $(".vip_content .x").click(function(){
        $(".vip_content").fadeOut();
    })

    $(".vip_content .xx").click(function(){
        $(".vip_content").fadeOut();
    })

    $(".btn1").click(function () {
        add_vip();
    })
    //vip申请
    function add_vip() {
	    var qq=$("#qqs").val();
        var bz=$("#beizhu").val();
        var goods_id=$("#goods_id").val();
        $.getJSON("/index.php?app=f_goods_new&act=add_vip&qq="+qq+"&bz="+bz+"&goods_id="+goods_id,function(data){
            if(data.retval==200){
            alert("申请成功，请耐心等待审核！");
            var val="<b style='font-size:12px;color: #ffffff;text-decoration:none;'>&nbsp;申请审核中请稍等~</b>";
            $('#span_vip').html(val);
            $(".vip_content").fadeOut();
            }else{
                alert(data.msg);
                $(".vip_content").fadeOut();
            }
        });
    }

    // function sq_vip() {
    //     alert("申请成功！");
    //
    //     var val="<b style='font-size:12px;color: #ffffff;text-decoration:none;'>&nbsp;申请审核中请稍等~</b>";
    //     $('#span_vip').html(val);
    // }

    function chakan() {
        h3 = '<span class="value_top" >≥1件</span>';
        if($.cookie('login_session') == 0){
        h4 = ' <a class="no_login" href="javascript:void(0)" onclick="show_login_box()"><span class="value_bot" style="font-size:16px; padding-top:13px;">登录可见分销价</span></a>';
        }else{
			$('#content').children().eq(1).show();
			$('#content').children().eq(2).hide();
			if ($('#content').children().eq(3).html()) {$('#content').children().eq(3).hide()};
			if ($('#content').children().eq(4).html()) {$('#content').children().eq(4).hide()};
			if ($('#content').children().eq(5).html()) {$('#content').children().eq(5).hide()};

			if(vip_status==0 || vip_status==3){
				var vip_name="&nbsp;<span id='span_vip' style='display: inline;'><b id='sq_vip' onclick='sq_vip()' style='color:#ffc18c;font-size:12px;cursor:pointer;text-decoration:underline'>申请成为VIP</b></span>";
			}else if(vip_status==1){
				var vip_name="<b style='font-size:12px;'>&nbsp;申请审核中请稍等~</b>";
			}else if(vip_status==2){
				if(has_fenxiao_price_section && fenxiao_price_section){
					if(is_vip_goods==1) {
						var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + vip_fenxiao_price_section + '<b style="font-size:13px;">&nbsp;&nbsp;VIP专享价&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;原价：￥'+fenxiao_price_section+'</b></span>';
					}else{
						var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price_section + '<b style="font-size:14px;">&nbsp;&nbsp;分销价</b></span>';
					}
				}else{
					if(is_vip_goods==1){
						var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + vip_fenxiao_price_section + '<b style="font-size:13px;">&nbsp;&nbsp;VIP专享价&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;原价：￥'+fenxiao_price+'</b></span>';
					}else{
						var vip_name='<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:14px;">&nbsp;&nbsp;分销价</b></span>';
					}
				}
			}
			console.log(vip_name);

			if(has_fenxiao_price_section && fenxiao_price_section) {
				if(vip_status==2){
					 h4 = vip_name;
				}else{
					if (is_vip_goods==1 && is_vip_hidden==1){
						 h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price_section + '<b style="font-size:14px;">&nbsp;&nbsp;|&nbsp;&nbsp;VIP专享价：￥' + vip_fenxiao_price_section + '&nbsp;&nbsp;'+vip_name+'</b></span>';
					}else{
						 h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price_section + '<b style="font-size:14px;">&nbsp;&nbsp;分销价&nbsp;&nbsp;'+vip_name+'</b></span>';
					}
				}
			}else{
				if(vip_status==2){
					 h4 = vip_name;
				}else{
					if (is_vip_goods==1 && is_vip_hidden==1) {
						 h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:14px;">&nbsp;&nbsp;|&nbsp;&nbsp;VIP专享价：￥' + vip_fenxiao_price_section + '&nbsp;&nbsp;'+vip_name+'</b></span>';
					}else if(is_vip_goods==1){
                        h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:12px;">&nbsp;&nbsp;分销价&nbsp;&nbsp;</b>'+vip_name+'</span>';
                    }else{
                        h4 = '<span class="value_bot" style="padding-top:13px; font-size:26px;">￥' + fenxiao_price + '<b style="font-size:12px;">&nbsp;&nbsp;分销价</span>';
                    }
				}
			}
            $("#chakan").hide();
            $("#pifa_price").show();
        }
        $('#qipijia').html(h3 + h4);

    }

    function pifa_price() {
        $('#content').children().eq(1).hide();
        $('#content').children().eq(2).show();
        if ($('#content').children().eq(3).html()) {$('#content').children().eq(3).show()};
        if ($('#content').children().eq(4).html()) {$('#content').children().eq(4).show()};
        if ($('#content').children().eq(5).html()) {$('#content').children().eq(5).show()};

        $('#qipijia').html(h3 + h4);

        $("#chakan").show();
        $("#pifa_price").hide();
    }


	//运费模板 
	$("#look_fee").mouseover(function(){
		$(this).addClass("flyc");
		}).mouseout(function(){
		$(this).removeClass("flyc");
		});	
	//代销
	// $.getJSON('/index.php?app=daixiao_request&act=detail&goods_id='+goods_id, function(rs){
	// 	if (rs.done) {
	// 		daixiao_info(rs.retval);
	// 	}
	// });
	$('#add_to_cart').click(function(){$('html,body').animate({scrollTop: '300px'}, 300);return false;});
	//关联产品选择
	$('.sale_gwsclinput').toggle(
			function(){$(this).addClass('selected');},
			function(){$(this).removeClass('selected');}
		);	
	$('#all_select').toggle(
		function(){$(this).addClass('selected');$('.sale_gwsclinput').addClass('selected');},
		function(){$(this).removeClass('selected');$('.sale_gwsclinput').removeClass('selected');}			
	);
	//关联产品全部上架
	$('#all_on_sale').click(function(){
		var goods_id_str = get_selected_goods();
		if (!goods_id_str) {
			alert('请先选择产品！');
			return false;
		}
		$.getJSON("/index.php?app=f_shop&act=check_taobao_right",function(data){
			if (!data.done && data.retval=='101'){
				show_login_box();
			}else if(!data.done && data.retval!='105' && data.retval!='113'){
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&retval="+ data.retval+"&ret_url="+ret_url, 380, 165, "信息提示");
			}
			else if(!data.done && data.retval=='113'){
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&retval="+ data.retval, 420, 295, "信息提示");
			}
			else if(data.done && data.retval=='105'){
				TP_ShowDialogIframe("/fenxiao_home/index.php?app=shop_cart&act=all_on_sale&goods_id_arr="+goods_id_str, 430, 265, "信息提示");
			}
		});
	});
	//品牌产品搜索
	$('.search-btn').click(function() {
		var kw = $('.search-keywords').val();
		var pl = $('.price-low').val();
		var ph = $('.price-high').val();
		if (!kw && !ph && !pl) {
			alert('请先输入要搜索的关键字！');
			$('.search-keywords').focus();
			return false;
		}
		if ((pl &&isNaN(pl)) || (ph && isNaN(ph))) {
			alert('价格输入错误！');
			$('.price-low').focus();
			return false;
		}
		if (pl && !ph) {
			alert('请输入最高价格！');
			$('.price-high').focus();
			return false;
		}
		if (ph && !pl) {
			alert('请输入最低价格！');
			$('.price-low').focus();
			return false;
		}
		pl = parseInt(pl);
		ph = parseInt(ph);
		if (pl > ph) {
			alert('最低价格不能大于最高价格！');
			$('.price-low').focus();
			return false;
		}
		var kstr = kw ? '-k_'+kw : '';
		var pstr = pl && ph ?  '_-2,'+pl+','+ph : '';
		var url = '/glist-d_1-t_-1,'+supplier_id+pstr+kstr+'.html';
		window.open(encodeURI(url), '_blank');
	});
	
	//数据包下载
	$('#product_download').click(function(){
		//ret_url用于页面的跳转，登录后返回当前页面&ret_url="+location.href
		$.getJSON("/index.php?app=f_member&act=has_login",function(user){
	        if(user==null || user==''){
	        	document.cookie = "jumpURL=" + escape(location.href) + "; path=/;expires=3600";
	        	show_login_box();
	        	//TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&goods_id="+goods_id+"&retval=101&ret_url="+location.href, 380, 165, "信息提示");
	        }
	        else{
				window.location.href="/index.php?app=export_product&goods_ids="+goods_id;
	        }
		});
	});
	//供应商数据包
	$('#all_brand_download').click(function(){
		$.getJSON("/index.php?app=f_member&act=has_login",function(user){
	        if(user==null || user==''){
	        	document.cookie = "jumpURL=" + escape(location.href) + "; path=/;expires=3600";
	        	show_login_box();
	        	//TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&retval=101&ret_url="+location.href, 380, 165, "信息提示");
	        }
	        else{
	        	TP_ShowDialogIframe("/fenxiao_home/index.php?app=shop_cart&act=all_brand_download&supplier_id="+supplier_id, 430, 265, "信息提示");
	        }
		});
	});
	//一键上架
	$('.sync_taobao').click(function(){
		if(!stock){
			TP_ShowMessage('库存为零，产品不可以上传！','信息提示', 'message-state-error' );
			return;
		}
		$.getJSON("/index.php?app=f_shop&act=ajax_sync_taobao_click&goods_id="+goods_id,function(data){
			if (!data.done && data.retval=='101'){
				show_login_box();
			}
			else if(!data.done && data.retval!='105' && data.retval!='113'){
				document.cookie = "jumpURL=" + escape(location.href) + "; path=/;expires=3600";
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&goods_id="+goods_id+"&retval="+data.retval+"&ret_url="+location.href , 380, 165, "信息提示");
			}
			else if(!data.done && data.retval=='113'){
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&goods_id="+goods_id+"&retval="+ data.retval, 420, 295, "信息提示");
			}
			else if(data.done && data.retval=='105'){
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_taobao&goods_id="+goods_id, 380, 165, "信息提示");
			}
		});
	});

	$('.sync_mogujie').click(function(){
		if(!stock){
			TP_ShowMessage('库存为零，产品不可以上传！','信息提示', 'message-state-error' );
			return;
		}

		//第一步获取是否有cookie
		$.getJSON("/index.php?app=f_shop&act=ajax_sync_mogujie_click&goods_id="+goods_id,function(data){
			if(data.result==1){
				//上传
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_mogujie&goods_id="+goods_id, 420, 295, "信息提示");
			}else if(data.result==2){
				show_login_box();
			}else{
				//授权
				TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_mogujie_token&goods_id="+goods_id, 380, 165, "信息提示");
			}
		});

	});

	//上架篮
	$.getJSON('/fenxiao_home/index.php?app=shop_cart&act=sum_goods&ajax=1', function(data){
		if (data.done) {
			$('.baseBg').html(data.retval);
		}
	});
	//没找到shoping
   $('.Q-buy-btn').shoping(); //调用shoping函数
   //
   //浏览历史
	$.ajax({
		url: '/index.php?app=f_goods_new&act=view_history&goods_id='+goods_id,
		dataType: 'html',
		success: function(html){
				$('#view_history').append(html);
		}
	});
	//新品上市
	$.ajax({
		url:'/index.php?app=f_goods_new&act=get_new_list&supplier_id='+supplier_id,
		dataType : 'html',
		success : function(html) {
			if (html != 'no_list') {
				$('#new_goods').show();
				$('#new_goods').append(html);
			}
		}
	});
});

function get_selected_goods(){
	var goods_id_str = '';	
	$('.sale_gwscla .selected').each(function(){
			goods_id_str += $(this).attr('gi')+',';
	}); 	
	goods_id_str = goods_id_str.substr(0,goods_id_str.length-1);
	return goods_id_str;
}	

//一件代销早请
function daixiao_request() {
	var ret_url = location.url;
  	$.getJSON("/index.php?app=f_shop&act=ajax_sync_taobao_click&goods_id="+goods_id,function(data){
		if(data.retval=='101'){
			document.cookie = "jumpURL=" + escape(location.href) + "; path=/;expires=3600";
			show_login_box();
			//TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&goods_id="+goods_id+"&retval="+ data.retval+"&ret_url="+location.href, 380, 165, "信息提示");
		}else{
			TP_ShowDialogIframe("/index.php?app=daixiao_request&act=add&goods_id="+goods_id+"&supplier_id="+supplier_id, 350, 320, "申请一件代发");
		}
	});
}
function daixiao_info(json) {
	var html = '';
	if (!json.has_request) html = '<a href="javascript:daixiao_request();" class="daixiao_request" title="申请一件代发" >申请代发</a>';
	else html = '<a href="javascript:void(0);" class="daixiao_request_disable" title="已申请一件代发" >已申请代发</a>'
	$('#daixiao_html').html(html);
}
 
function imgLazyLoad(){//扫描需要加载的div  
    $.each($("img.lazy"),function(i,o){         
        //获取窗口高       
        var windowHeight=$(window).height();  
        //获取滚动条  
        var scrollTop=$(document).scrollTop();  
        windowHeight=windowHeight; //可以设置滚动条在显示某个高度来lazyload   windowHeight=windowHeight/2; 比如在显示屏幕高度2分之1的时候加载  
        //先判断是否是加载完的图片 跳出  
        if($(o).attr("src")==$(o).attr("pic")){  
            return true;  
        }else if( $(o).offset().top<=(scrollTop+windowHeight)  && $(o).offset().top >= scrollTop ){//判断div是不是出在可见的位置  
            if($(o).attr("pic") != undefined || $(o).attr("pic") != "undefined" ){  
                var ObjectSrc = $(o).attr("pic");  
                //把pic的值赋给src值  
                $(o).attr("src",ObjectSrc);  
            }  
        }                 
    });   
} 

