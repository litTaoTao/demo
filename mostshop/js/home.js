	//下拉菜单

function xiala(){
	console.log($banner_left.eq(0).eq(0).eq(0))
	
	$banner_left.mouseenter(function(){
		$(this).children(0).children(0).find("i").css("background","url(../images/home/ecd_cate_icoh.png)")
		$(this).css("background","#fff"); 
		$(this).find(".showgril a").css("color","red")
		$(this).find(".shirt a").css("color","#000")
		$(this).find(".banner_hidden").show()
	})
	$banner_left.mouseleave(function(){
		$(this).children(0).children(0).find("i").css("background","url(../images/home/bg.png)")
		
		$(this).css("background","#222");
		$(this).find(".showgril a").css("color","#fff")
		$(this).find(".shirt a").css("color","#fff")
		$(this).find(".banner_hidden").hide()
	})
} 













//轮播1
function lunbo1(){
	$banner_center0.mouseenter(function(){
		$jiao1.show()
		$jiao2.show()
		
	})
	$banner_center0.mouseleave(function(){
		$jiao1.hide()
		$jiao2.hide()
		
	})
	
	
	
	var index=0;
	$jiao2.click(function(e){ 
				e.stopPropagation();
		index++;
		if(index==4){
			index=0;
			$banner_center1.css("left",0)
		}
		$banner_center2.eq(index).css("background","#b1191a").siblings().css("background","#b7b7b7")
		$banner_center1.stop().animate({
			left:-529*(index+1)
		},500)
	})
	
	$jiao1.click(function(){
		index--;
		$banner_center2.eq(index).css("background","#b1191a").siblings().css("background","#b7b7b7")
		
		if(index==-1){ 
			index=3;
			$banner_center1.css("left",-2645)
		}
		$banner_center1.stop().animate({
			left:-529*(index+1)
		},500)
	})
	
	$banner_center2.mouseenter(function(){
		index=$(this).index();
		$banner_center1.stop().animate({
			left:-529*(index+1)
		},500)
		$(this).css("background","#b1191a").siblings().css("background","#b7b7b7")
	})
}

//轮播2
function lunbo2(){
		$banner_center_0.mouseenter(function(){
				$jiao_1.show()
				$jiao_2.show()
				
			})
			$banner_center_0.mouseleave(function(){
				$jiao_1.hide()
				$jiao_2.hide()
				
			})
			
			
			
			var index=0;
			$jiao_2.click(function(e){ 
				e.stopPropagation();
				index++;
				if(index==7){
					index=0;
					$banner_center_1.css("left",0)
				}
				$banner_center_2.eq(index).css("background","#b1191a").siblings().css("background","#b7b7b7")
				$banner_center_1.stop().animate({
					left:-529*(index+1)
				},500)
			})
			
			$jiao_1.click(function(){
				index--;
				$banner_center_2.eq(index).css("background","#b1191a").siblings().css("background","#b7b7b7")
				
				if(index==-1){ 
					index=6;
					$banner_center_1.css("left",-2645)
				}
				$banner_center_1.stop().animate({
					left:-529*(index+1)
				},500)
			})
			
			$banner_center_2.mouseenter(function(){
				index=$(this).index();
				$banner_center_1.stop().animate({
					left:-529*(index+1)
				},500)
				$(this).css("background","#b1191a").siblings().css("background","#b7b7b7")
			})
}


