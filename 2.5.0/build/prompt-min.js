define('kg/easydialog/2.5.0/prompt',["util","base","node","./common"],function(require, exports, module) {function t(){t.superclass.constructor.call(this)}function a(t,a){t.on("afterRenderUI",function(){var e=i(t.get("el")),o=e.all(".J_KsEasyDialogBtn"),l=e.all(".J_KsEasyDialogPromptTxt");s.later(function(){l.fire("focus")},100),o.on("click",function(s){var e=i(s.target),o=e.hasClass("ks-easy-dialog-yes"),n=o?l.val():null;t.destroy(),a&&a({txt:n,result:o})})})}var s=require("util"),e=require("base"),o=require("node"),l=require("./common"),i=o.all,n='<div class="ks-easy-dialog ks-easy-dialog-prompt"><div class="ks-easy-dialog-head">{title}</div><div class="ks-easy-dialog-body"><div class="ks-easy-dialog-prompt-title">{content}</div><p class="ks-easy-dialog-txt">{inputType}</p><p class="ks-easy-dialog-btn-content"><button class="ks-easy-dialog-yes J_KsEasyDialogBtn" >确定</button><button class="ks-easy-dialog-no J_KsEasyDialogBtn">取消</button></p></div></div>',r='<input type="text" class="ks-easy-dialog-prompt-txt J_KsEasyDialogPromptTxt">',c='<textarea class="ks-easy-dialog-prompt-textarea J_KsEasyDialogPromptTxt"></textarea>';s.extend(t,e,{prompt:function(t,s,e){var o=l.parseData(s,e),i=o.config,p=l.getDialog(i),d=o.callback;return l.setContent(p,n.replace("{inputType}",i.inputType?c:r),{title:i.title,content:t}),a(p,d),p.show(),i.isNeedDrag&&l.setDragAble(p),p}}),module.exports=(new t).prompt;});