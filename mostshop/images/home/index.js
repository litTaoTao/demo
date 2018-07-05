function imgLazyLoad(){//扫描需要加载的div  
    $.each($("img"),function(i,o){         
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
                //css属性改为可见  
                $(o).css("visibility","visible");  
                //渐变时间和渐变值  
                $(o).fadeTo(1000,1.00);  
            }  
        }                 
    });   
}  

$(function(){
 imgLazyLoad();//初始化  
//判断浏览器  
if($.browser.msie){
    //IE浏览器  
    $(window).scroll(imgLazyLoad);//浏览器的兼容  
}else {
    //其他浏览器 ff chrome 测试通过  
    $(document).scroll(imgLazyLoad);//当滚动条滚动时,扫描需要加载的div  
}
	
$('.zxhd-ad').hover(
		function(){
			$(this).find(".hd a").css("display","block");
		},
		function(){
			$(this).find(".hd a").css("display","none");
		}		
);
jQuery(window).scroll(function(){
    if( jQuery(this).scrollTop()>700){
    	$(".footer_common").fadeIn(1000);        
    }
	else{
   		$(".footer_common").fadeOut(1000);
    }
});	
$('#floatad-winpop2 .close').click(function(){
	$('#floatad-winpop2').stop().animate({bottom:'-212px'},{queue:false,duration:300});
});
$(function(){
	if($(".footer_common").length>0){
		$(".footer_common").find("li").click(function(){
			var index=$(this).index(),
				day_content_pos=$(".ecd-index-floorlayout").eq(index).offset().top-10;
			$('html,body').animate({scrollTop:day_content_pos}, 400);
		});
	};		
});
// 显示隐藏友情链接
$('#dsdt_up').bind('click', function(){
    if($(this).parent().hasClass('visible')){
		$('.shop_partner').css("display","none");     	
        $(this).parent().removeClass('visible');
        $(this).html('<a href="javascript:void(0);">收起友情链接﹀</a>');		
        $('.shop_partner').slideDown(600);						
    }else{           
        $(this).parent().addClass('visible');
        $(this).html('<a href="javascript:void(0);">展开友情链接︿</a>');				
		$('.shop_partner').slideUp(600);
    }
});
});
