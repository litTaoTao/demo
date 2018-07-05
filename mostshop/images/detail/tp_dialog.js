/**====================** tp_dialog  jquery ui dailog 简单封装 ====================**/

/**
 * 依赖css
   .ImageLoading { 
           background-image: url('css/images/Loading.gif'); 
		  background-repeat: no-repeat; 
		  background-color: Transparent; 
		  width: 26px; height: 16px;
		   border-style: none;
      }
   .ImageLoadingText {
           background-image: url('css/images/loading_text.gif'); 
           background-repeat: no-repeat; 
           background-color: Transparent; 
           width: 39px; 
           height: 5px; 
           border-style: none;
      }
   
       
      .DialogIcon        { display: block; width: 29px; height: 31px; overflow: hidden; background-image: url('css/images/WSC_DialogIcon.png'); background-repeat: no-repeat; text-indent: -99999px; }
      .DialogIconInfo    { background-position: 0px 0px; }
      .DialogIconWarning { background-position: -24px 0px; }
      .DialogIconError   { background-position: -48px 0px; }
      .DialogIconQuestion{ display: block; width: 29px; height: 31px; overflow: hidden; background-image: url('css/images/delete.png'); background-repeat: no-repeat; text-indent: -99999px; }
      .contentSectionWhite { border: 1px solid #CCCCCC; background-color: white;  border-radius: 4px; padding:10px; margin: 0px 0 10px; -moz-box-shadow:0 0 10px #C4C4C4; -webkit-box-shadow:0 0 10px #C4C4C4; box-shadow:0 0 10px #C4C4C4; }
  
 */









/**
 * TP_ShowTip($('#btnShowTip'), '测试显示 Tip', 'x', 2000, 'ui-state-error' );
 * 
 * sender tip显示所在位置
 * message  消息内容 
 * icon  图标 参加UI样式的 ui-icon-info ..
 * duration 生命时长  毫秒
 * uiState  UI的状态样式名   ui-state-active  ui-state-error  ..
 * 
 */
 
var TP_ShowTip = function (sender, message, icon, duration, uiState) {
   /// <summary>
   /// 显示提示
   /// </summary>
   if (typeof (sender) != "object") {
      return;
   }
   if (!icon) {
      icon = "info";
   }
   if (!duration) {
      duration = 200;
   }
   if (!uiState)
      uiState = "ui-state-active";

   //容器
   var id = "TP_Tip";
   var container = $("#" + id);
   if (container.size() == 0) { //不存在则创建
      container = $("<div id='TP_JQueryDialogAutoGenTipDiv' class='" + uiState + " ui-corner-all ui-helper-hidden' style='padding: 5px; position: absolute; z-index:999999;'></div>")
            .attr("id", id)
            .append("<span style='float: left; margin: 2px 0px 0px 0px;'></span>")      //图标容器
            .append("<span style='display: block; margin: 2px 0px 2px 20px;'></span>")  //消息容器
            .appendTo($(document.body));
   }

   //图标
   container.children("span:first")
        .removeClass()
        .addClass("ui-icon").addClass("ui-icon-" + icon);

   //消息
   container.children("span:last").html(message);

   //呈现位置
   //var senderPosition = $(sender).position(); 这个是相对父节点的位置
   var senderPosition = $(sender).offset(); // 这个是绝对位置
   
   container
        .stop(true, true) //初始化动画
        .css("left", senderPosition.left + $(sender).outerWidth() + 2).css("top", senderPosition.top) //位置
        .fadeIn() //显示
   //.delay(duration)
        .fadeOut(duration); //隐藏
};



/**
 * 显示持久提示信息
 * TP_ShowPersistentTip($('#btnShowTip'), '测试显示 Tip', 'x', 2000, 'ui-state-error','left' );
 * 
 * sender tip显示所在位置
 * message  消息内容 
 * icon  图标 参加UI样式的 ui-icon-info ..
 * duration 生命时长  毫秒
 * uiState  UI的状态样式名   ui-state-active  ui-state-error  ..
 * pos left  right  bottom  top
 */
var persistentTipContainer; 
var TP_ShowPersistentTip = function (sender, message, icon, duration, uiState, pos) {
   //persistentTipContainer = null;

   if (typeof (sender) != "object") {
      return;
   }

   if (!icon) {
      icon = "info";
   }

   if (!duration) {
      duration = 50;
   }

   if (!uiState)
      uiState = "ui-state-active";

   if (!pos)
      pos = "right";
   pos = pos.toLowerCase();
   if (pos != "left" && pos != "right" && pos != "top" && pos != "bottom")
      pos = "right";

   //容器
   var id = "TP_Tip";
   persistentTipContainer = $("#" + id);
   if (persistentTipContainer.size() == 0) { //不存在则创建
      persistentTipContainer = $("<div id='TP_JQueryDialogAutoGenTipDiv' class='" + uiState + " ui-corner-all ui-helper-hidden' style='padding: 5px; position: absolute; z-index:999999;'></div>")
            .attr("id", id)
            .append("<span style='float: left; margin: 2px 0px 0px 0px;'></span>")      //图标容器
            .append("<span style='display: block; margin: 2px 0px 2px 20px;'></span>")  //消息容器
            .appendTo($(document.body));
   }

   //样式
   persistentTipContainer.removeClass()
      .addClass(uiState).addClass("ui-corner-all").addClass("ui-helper-hidden");

   //图标
   persistentTipContainer.children("span:first")
        .removeClass()
        .addClass("ui-icon").addClass("ui-icon-" + icon);

   //消息
   persistentTipContainer.children("span:last").html(message);

   //呈现位置
   var senderPosition = $(sender).position();
   var left = 0, top = 0;
   if (pos == "right") {
      left = senderPosition.left + $(sender).outerWidth() + 2;
      top = senderPosition.top;
   }
   else if (pos == "left") {
      left = senderPosition.left - persistentTipContainer.outerWidth() - 2;
      top = senderPosition.top;
   }
   else if (pos == "top") {
      left = senderPosition.left;
      top = senderPosition.top - $(sender).outerHeight() - 2;
   }
   else if (pos == "bottom") {
      left = senderPosition.left;
      top = senderPosition.top + $(sender).outerHeight() + 2;
   }

   persistentTipContainer
        .stop(true, true) //初始化动画
        .css("left", left).css("top", top) //位置
        .fadeIn(duration) //显示
        .delay('slow');
};

// 隐藏持久提示信息
var TP_HidePersistentTip = function () {
   persistentTipContainer
   //.delay(10)
      .hide();
   //.fadeOut("slow"); //隐藏
};




/**
 * 显示持久提示信息
 * TP_ShowMessage(  '提示内容','标题', 'message-state-error' );
 *  
 * message  消息内容 
 * title  标题
 * icon  图标 参加UI样式的 message-state-error  message-state-ask  message-state-ok message-state-info
 * 
 */
// 消息框
TP_ShowMessage = function (message, title, icon) {
   /// <summary>
   /// 显示消息
   /// </summary>
   if (!title) {
      title = TP_SystemName;
   }
   if (!icon) {
      icon = "message-state-info";
   }
   //容器
   var id = "TP_Message";
   var container = $("#" + id);
   if (container.size() == 0) { //不存在则创建
      container = $("<div id='TP_Message' class='ui-helper-hidden' style='margin:16px 0px 0px 2px; z-index:999999;'></div>").attr("id", id)
            .append('<span class="" ></span>')    //图标容器
            .append('<span class="tk_con_art"></span>')  //消息容器
            .appendTo($(document.body))
            .dialog({
               autoOpen: false,
               modal: true,
               buttons: [
                    {
                       text: "确定",
                       click: function () { $(this).dialog("close"); }
                    }
                ],
               minWidth: 320,
               minHeight: 160,
               show: "fade",
               hide: "fade"
            });
   }
   //标题
   container.dialog("option", "title", title);
   //图标
   container.children("span:first").addClass( icon).html(message);
   //消息
   //container.children("span:last").html(message);
   //位置 
   container.dialog( "option" , "position", { my: "center", at: "center", of: window });
   //呈现
   container.dialog("open");
};





/**
 * 确认框 
 * 
 * return TP_confirm("标题","内容",callback );
 * 
 * title   标题
 * message  消息内容 
 * callback 回调方法
 */  
 
TP_confirm = function ConfirmDialog(title,message,callback) {
	
   if (!title){
	   title = "确认";
   }
   
   
   if (!message){
	   message = "确认吗？";
   }
 
   
   var div = "<div id='TP_JQueryDialogAutoGenConfirmationDiv' style='margin:16px 0px 0px 2px; z-index:999999;' title='" + title + "'>";
      div = div + "<span  class='message-state-ask'>" + message + "</span>";    //图标容器
      //div = div + "<span  class='tk_con_art'   >" + message + "</span>";   //消息容器
      div = div + "</div>";

      //$('body').append("<div id='TP_DialogConfirmation' title='" + title + "'><p>" + message + "</p></div>");
      $('body').append(div);

      $('#TP_JQueryDialogAutoGenConfirmationDiv').dialog({
         autoOpen: false,
         minWidth: 320,
         minHeight: 160,
         modal: true,
         title: title,
         overlay: { opacity: 0.5, background: "black", overflow: "auto" },
         show: "fade",
         hide: "fade",
         close: function (event, ui) { 
        	 	$('body').find('#TP_JQueryDialogAutoGenConfirmationDiv').remove(); 
        	 },
         buttons:
                    {
                       '是': function () {
                          $(this).dialog('close'); 
                          callback.call();//方法回调
                       },
                       '否': function () {
                          $(this).dialog('close');
                       }
                    }
      });

      $('#TP_JQueryDialogAutoGenConfirmationDiv').dialog("open");
  
}
TP_confirm_taobao_shouquan = function ConfirmDialog_shouquan(title,message,callback) {
	
	   if (!title){
		   title = "确认";
	   }
	   
	   
	   if (!message){
		   message = "确认吗？";
	   }
	 
	   
	   var div = "<div id='TP_JQueryDialogAutoGenConfirmationDiv' style='margin:16px 0px 0px 2px; z-index:999999;' title='" + title + "'>";
	      div = div + "<span  class='message-state-ask'>" + message + "</span>";    //图标容器
	      //div = div + "<span  class='tk_con_art'   >" + message + "</span>";   //消息容器
	      div = div + "</div>";

	      //$('body').append("<div id='TP_DialogConfirmation' title='" + title + "'><p>" + message + "</p></div>");
	      $('body').append(div);

	      $('#TP_JQueryDialogAutoGenConfirmationDiv').dialog({
	         autoOpen: false,
	         minWidth: 320,
	         minHeight: 160,
	         modal: true,
	         title: title,
	         overlay: { opacity: 0.5, background: "black", overflow: "auto" },
	         show: "fade",
	         hide: "fade",
	         close: function (event, ui) { 
	        	 	$('body').find('#TP_JQueryDialogAutoGenConfirmationDiv').remove(); 
	        	 },
	         buttons:
	                    {
	                       '进行淘宝授权': function () {
	                          $(this).dialog('close'); 
	                          callback.call();//方法回调
	                       }
	                    }
	      });

	      $('#TP_JQueryDialogAutoGenConfirmationDiv').dialog("open");
	  
	}


/**
 * 
 * TP_ShowDialogIframe("http://ansonlh.iteye.com/blog/1689010", 810, 300, "编辑用户");
 * 
 * url 地址
 * width 宽
 * height 高
 * title 标题
 */
TP_ShowDialogIframe = function (url, width, height, title) {
   if (!title) {
      title = "提示";
   }

   //容器
   var id = "TP_Dialog";
   var container = $("#" + id);
   if (container.size() == 0) { //不存在则创建

      var loadingDiv = "<div id='TP_JQueryDialogLoading' class='contentSectionWhite' style='display: block; background-color:White; width:92px; height:20px; margin: 120px auto auto 40%; position:absolute;'>";
      loadingDiv = loadingDiv + "<ul><li class='ImageLoading' style=' width:30px;'></li><li class='ImageLoadingText' style='margin: 8px 0px 0px 2px; width:60px;'></li></ul></div>";

      container = $("<div id='TP_JQueryDialogAutoGenDiv' class='ui-helper-hidden' style='z-index:999990;overflow:hidden'></div>").attr("id", id)
            .append("<iframe frameborder='0' style='width: 100%; height: 100%;' src='"+url+"'></iframe>") //内容容器
            .appendTo($(document.body))
            .dialog({
               autoOpen: false,
               modal: true,
               minWidth: 320,
               minHeight: 220,
               show: "fade",
               hide: "clip",
               open: function (event, ui) {
                  DelayToShowLoading();
               },
               close: function (event, ui) {
                  $(this).children("iframe:first").removeAttr("src"); //清除内容
                  container.detach();
               }
            });
   }

   $("#TP_JQueryDialogLoading").css("display", "block");
   //标题
   container.dialog("option", "title", title);
   //尺寸
   container.dialog("option", "width", width).dialog("option", "height", height);
   //位置
   container.dialog({ position: { my: "center", at: "center", of: window } }); 
   //呈现
   container.dialog("open");
};


/**
 * 
 * TP_ShowDialog("http://ansonlh.iteye.com/blog/1689010", 810, 300, "编辑用户");
 * 
 * url 地址
 * width 宽
 * height 高
 * title 标题
 */
TP_ShowDialog = function (url, width, height, title) {
   if (!title) {
      title = "提示";
   }

   //容器
   var id = "TP_Dialog";
   var container = $("#" + id);
   if (container.size() == 0) { //不存在则创建

      var loadingDiv = "<div id='TP_JQueryDialogLoading' class='contentSectionWhite' style='display: block; background-color:White; width:92px; height:20px; margin: 120px auto auto 40%; position:absolute;'>";
      loadingDiv = loadingDiv + "<ul><li class='ImageLoading' style=' width:30px;'></li><li class='ImageLoadingText' style='margin: 8px 0px 0px 2px; width:60px;'></li></ul></div>";

      container = $("<div id='TP_JQueryDialogAutoGenDiv' class='ui-helper-hidden' style='z-index:999990;'></div>").attr("id", id)
            .load(url,function(response,status,xhr){  container.dialog( "option", "position", { my: "center", at: "center", of: window} );   }   ) //内容容器
            .appendTo($(document.body))
            .dialog({
               autoOpen: false,
               modal: true,
               minWidth: 320,
               minHeight: 220,
               show: "fade",
               hide: "clip",
               open: function (event, ui) {
                  DelayToShowLoading();
               },
               close: function (event, ui) {
                 // $(this).children("iframe:first").removeAttr("src"); //清除内容
            	   container.detach();
               }
            });
   }

  // $("#TP_JQueryDialogLoading").css("display", "block");

   //标题
   container.dialog("option", "title", title);
   //尺寸
   container.dialog("option", "width", width).dialog("option", "height", height);
   //位置
   container.dialog( "option" , "position", { my: "center", at: "center", of: window });
 
   //呈现
   container.dialog("open");
};



var count = 0;
function DelayToShowLoading() {
   
   count++;
   if (count > 2) {
      $("#TP_JQueryDialogLoading").css("display", "none");
      count = 0;
      return true;
   }
   window.setTimeout("DelayToShowLoading()", 800);

}

