//obj  操作的对象
//target  目标值
//attr   操作的样式
//加入透明度的操作
function startMove(obj,target,attr){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current = 0;
		//得到当前操作对象的实际样式值
		if( attr == "opacity" ){
			current = parseFloat(getStyle(obj,attr))*100;
		}else{
			current = parseInt(getStyle(obj,attr));
		}
		//速度获取
		var speed = (target-current)/8;
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		if( target == current ){
			clearInterval(obj.timer);
		}else{
			if( attr == "opacity" ){
				obj.style["opacity"] = (current + speed)/100;
			}else{
				obj.style[attr] = current + speed +"px";
			}
		}
	},30)
}
 
//获取非行内元素样式值  
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}