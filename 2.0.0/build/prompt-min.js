/*! easydialog - v2.0.0 - 2013-12-16 6:09:58 PM
* Copyright (c) 2013 bofang.zxj; Licensed  */
KISSY.add("kg/easydialog/2.0.0/common",function(a,b,c,d){var e={},f=b.all,g=document.domain,h={title:g+" \u7f51\u9875\u63d0\u793a",isNeedDrag:!0,theme:"kg/easydialog/2.0.0/theme/theme-tb.css",width:350,height:110,zIndex:9999,closable:!0,prefixCls:"ks-easydialog-",closeAction:"destroy",mask:!0,effect:{},align:{points:["cc","cc"]}};return a.mix(e,{parseData:function(b,c){var d,e;return a.isPlainObject(b)?d=a.mix(h,b):a.isFunction(b)?(d=h,c=b):(e=c,d=h),a.isFunction(c)&&(e=c),this.loadCss(d.theme),{config:d,callback:e}},getDialog:function(a){return new c.Dialog(a)},setDragAble:function(a){var b,c=f(a.get("el")),d=c.one(".J_KsEasyDialogPromptTxt"),e=this;b=e._initDD(c),d&&(c.on("mousedown",function(){b||(b=e._initDD(c))}),d.on("mousedown",function(){b&&b.destroy(),b=null}))},_initDD:function(a){return new d.Draggable({node:a,cursor:"move",move:!0})},loadCss:function(b){return b&&a.isString(b)&&a.use(b),this},setContent:function(b,c,d){return b.set("bodyContent",a.substitute(c,d)),this}}),e},{requires:["node","overlay","dd"]}),KISSY.add("kg/easydialog/2.0.0/prompt",function(a,b,c,d){function e(){e.superclass.constructor.call(this)}function f(b,c){b.on("afterRenderUI",function(){var d=g(b.get("el")),e=d.all(".J_KsEasyDialogBtn"),f=d.all(".J_KsEasyDialogPromptTxt");a.later(function(){f.fire("focus")},100),e.on("click",function(a){var d=g(a.target),e=d.hasClass("ks-easy-dialog-yes"),h=e?f.val():null;b.destroy(),c&&c({txt:h,result:e})})})}var g=c.all,h='<div class="ks-easy-dialog ks-easy-dialog-prompt"><div class="ks-easy-dialog-head">{title}</div><div class="ks-easy-dialog-body"><div class="ks-easy-dialog-prompt-title">{content}</div><p class="ks-easy-dialog-txt">{inputType}</p><p class="ks-easy-dialog-btn-content"><button class="ks-easy-dialog-yes J_KsEasyDialogBtn" >\u786e\u5b9a</button><button class="ks-easy-dialog-no J_KsEasyDialogBtn">\u53d6\u6d88</button></p></div></div>',i='<input type="text" class="ks-easy-dialog-prompt-txt J_KsEasyDialogPromptTxt">',j='<textarea class="ks-easy-dialog-prompt-textarea J_KsEasyDialogPromptTxt"></textarea>';return a.extend(e,b,{prompt:function(a,b,c){var e=d.parseData(b,c),g=e.config,k=d.getDialog(g),l=e.callback;return d.setContent(k,h.replace("{inputType}",g.inputType?j:i),{title:g.title,content:a}),f(k,l),k.show(),g.isNeedDrag&&d.setDragAble(k),k}}),(new e).prompt},{requires:["base","node","./common"]});