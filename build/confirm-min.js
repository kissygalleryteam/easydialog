define('kg/easydialog/2.5.0/confirm',["util","base","node","./common"],function(require, exports, module) {function s(){s.superclass.constructor.call(this)}function a(s,a){s.on("afterRenderUI",function(){var t=n(s.get("el")),e=t.all(".J_KsEasyDialogBtn");e.on("click",function(t){var e=n(t.target),o=e.hasClass("ks-easy-dialog-yes");s.destroy(),a&&a({result:o})})})}{var t=require("util"),e=require("base"),o=require("node"),i=require("./common"),n=o.all,l='<div class="ks-easy-dialog ks-easy-dialog-confirm"><div class="ks-easy-dialog-head">{title}</div><div class="ks-easy-dialog-body J_KsEasyDialogBody"><div class="ks-easy-dialog-title">{content}</div><p class="ks-easy-dialog-btn-content"><button class="ks-easy-dialog-yes J_KsDialogOkBtn J_KsEasyDialogBtn" >确定</button><button class="ks-easy-dialog-no J_KsDialogNoBtn J_KsEasyDialogBtn">取消</button></p></div>';document.domain}t.extend(s,e,{confirm:function(s,t,e){var o=i.parseData(t,e),n=o.config,c=i.getDialog(n),d=o.callback;i.setContent(c,l,{title:n.title,content:s}),a(c,d),c.show(),n.isNeedDrag&&i.setDragAble(c)}}),module.exports=(new s).confirm;});