	 /*
      * Jquery—shopping   0.1
      * Copyright (c) 2013  Nicky Yan   个人网：站http://www.chinacoder.cn  QQ：525690001
      * Date: 2013-04-02
      * 使用Jquery—shopping可以很方便的实现加入购物车效果
	 */

;(function($){
	$.extend($.fn,{
		shoping:function(options){
			var self=this,
				$shop=$('.J-shoping'),
				$title=$('.J-shoping-title'),
				$body=$('.J-shoping-body'),
				$num=$('.J-shoping-num'),
				$close=$('.J-shoping-close');
			var S={
				init:function(){
					$title.bind('click',this.clickOnTitle);
					$close.live('click',this.removeList);
					$(self).data('click',true).live('click',this.addShoping);
					//$(document).bind('click',S.slideBoxMini);
					$body.bind('click',this.clickOnBody);
				},
				clickOnBody:function(e){
					if(!$(e.target).hasClass('J-shoping-close')){
						e.stopPropagation(); //阻止冒泡	
					};
				},
				addShoping:function(e){
					var o = e || event;
					var target = o.srcElement || o.target;
					var thisOrigin = "undefined" == typeof origin ? '' : origin;
					if (target.id) 
						var url = '/fenxiao_home/index.php?app=shop_cart&act=sync_part_taobao&ajax=1&pid='+target.id+'&origin='+thisOrigin;
					if (target.id == 'product_add')			//加入上架篮
						var url = '/fenxiao_home/index.php?app=shop_cart&act=add_goods&ajax=1&goods_id='+goods_id+'&origin='+thisOrigin;
					if (target.id == 'sync_bank_taobao')	//全部上架
						var url = '/fenxiao_home/index.php?app=shop_cart&act=sync_bank_taobao&ajax=1&supplier_id='+supplier_id+'&origin='+thisOrigin;
					var ret_url = location.href;
					$.getJSON(url, function(data){
						if (!data.done) {
							if (data.msg == '您需要先登录才可以执行该操作')
								show_login_box();
								//TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&retval=101"+"&ret_url="+ret_url+'&origin='+thisOrigin, 380, 165, "信息提示");
							else if(data.msg == 'add_repeat')
								TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&retval=114", 380, 165, "信息提示");
							else if(data.msg == 'no_cate')
								TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm&retval=106", 380, 165, "信息提示");
							else 
								TP_ShowDialogIframe("/index.php?app=f_shop&act=ajax_get_sync_confirm", 380, 165, "信息提示");
						}else{
							e.stopPropagation();
							var $target=$(e.target),
								id=$target.attr('id'),
								dis=$target.data('click'),
							    x = $target.offset().left + 30,
								y = $target.offset().top + 10,
								X = $shop.offset().left+$shop.width()/2-$target.width()/2+10,
								Y = $shop.offset().top;
							if(dis){
								if ($('#floatOrder').length <= 0) {
									$('body').append('<div id="floatOrder"><img src="/static/images/goods/pro1.jpg" width="50" height="50" /></div>');
								};
								var $obj=$('#floatOrder');
								if(!$obj.is(':animated')){
									$obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {
										$obj.stop(false, false).animate({'top': Y-20,'opacity':0},500,function(){
											$obj.fadeOut(300,function(){
												$obj.remove();	
												$target.data('click',false).addClass('dis-click');
												var l=$('.J-shoping-list').length,
													num=Number($num.text());
												if(l<5){
													$body.prepend('<div class="J-shoping-list" data-id="'+id+'"><a href="#"title=""><img src="images/pro1.jpg" width="50"height="50"/></a><div class="J-shoping-list-a"><p>彩涂板卷(镀铝锌基板)</p><p><span class="left">TDC51D+AZ</span><span class="right"><em>150.000</em>吨</span></p></div><div class="baseBg J-shoping-close"></div></div>');
												};
//												$('#box_erweiW').show();
											});
										});
									});	
									$num.text(data.retval);
								};
							};
						}
					});
				},
				clickOnTitle:function(e){
					e.stopPropagation();
					var length=$('.J-shoping-list').length;	
					if(length>0){
						if(!$shop.hasClass('J-shoping-small')){
							$body.slideToggle();	
						}else{
							$('.J-shoping-mx').hide();
							$('.J-shoping-px').show();
							$shop.animate({'width':289},100,function(){
								$shop.removeClass('J-shoping-small');
								$body.slideDown();
							});
						};
					};
				},
				slideBoxMini:function(){
					$('.J-shoping-px,.J-shoping-body').hide();
					$('.J-shoping-mx').show();
					$shop.animate({'width':119},100,function(){
						$shop.addClass('J-shoping-small');
					});	
				},
				removeList:function(e){
					e.stopPropagation();
					var $target=$(e.target),
						$parent=$target.parents('.J-shoping-list'),
						id=$parent.attr('data-id');
					$parent.addClass('J-shoping-list-remove').fadeOut(300,function(){
						$('#'+id).data('click',true).removeClass('dis-click');
						$parent.remove();
						S.hideBody();
						if(options&&options.callback){
							options.callback($(self));	
						};	
					});	
				},
				hideBody:function(){
					var length=$('.J-shoping-list').length;
					$num.text(length);
					if(length==0){
						$('.J-shoping-px,.J-shoping-body').hide();
						$('.J-shoping-mx').show();
						$shop.animate({'width':119},100,function(){
							$shop.addClass('J-shoping-small');
						});	
					};
				}
			};
			S.init(); 
		}
	});	
})(jQuery);

