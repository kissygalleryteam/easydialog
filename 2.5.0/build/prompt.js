define('kg/easydialog/2.5.0/prompt',["util","base","node","./common"],function(require, exports, module) {
/**
 * @fileoverview 基于Overlay.Dialog dd封装prompt
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
var Util = require('util');
var Base = require('base');
var Node = require('node');
var Common = require('./common');
var $ = Node.all;
var TPL_BODY = '<div class="ks-easy-dialog ks-easy-dialog-prompt">' + '<div class="ks-easy-dialog-head">{title}</div>' + '<div class="ks-easy-dialog-body">' + '<div class="ks-easy-dialog-prompt-title">{content}</div>' + '<p class="ks-easy-dialog-txt">' + '{inputType}' + '</p><p class="ks-easy-dialog-btn-content"><button class="ks-easy-dialog-yes J_KsEasyDialogBtn" >\u786E\u5B9A</button>' + '<button class="ks-easy-dialog-no J_KsEasyDialogBtn">\u53D6\u6D88</button></p>' + '</div>' + '</div>';
var TPL_TXT_TYPE_INPUT = '<input type="text" class="ks-easy-dialog-prompt-txt J_KsEasyDialogPromptTxt">';
var TPL_TXT_TYPE_TEXTAREA = '<textarea class="ks-easy-dialog-prompt-textarea J_KsEasyDialogPromptTxt"></textarea>';
/**
* Prompt 类
*/
function Prompt() {
	Prompt.superclass.constructor.call(this);
}
;
/**
* 绑定事件
* @param  {Object}   oDialog  dialog名
* @param  {Function} callback callback 函数
*/
function bindEvent(oDialog, callback) {
	oDialog.on('afterRenderUI', function () {
		var elContent = $(oDialog.get('el'));
		var elBtn = elContent.all('.J_KsEasyDialogBtn');
		var elTxt = elContent.all('.J_KsEasyDialogPromptTxt');
		Util.later(function () {
			elTxt.fire('focus');
		}, 100);
		elBtn.on('click', function (e) {
			var elTarget = $(e.target);
			var result = elTarget.hasClass('ks-easy-dialog-yes');
			var txt = result ? elTxt.val() : null;
			oDialog.destroy();
			callback && callback({
				txt: txt,
				result: result
			});
		});
	});
}
Util.extend(Prompt, Base, {
	/**
	 * 模拟window.prompt
	 * @param  {String}   message  提示的信息
	 * @param  {Object}   config   配置信息
	 * @param  {Function} callback 回调函数
	 * @return {Obejct}            dialog
	 */
	prompt: function (message, config, callback) {
		var oParseData = Common.parseData(config, callback);
		var oConfig = oParseData.config;
		var oEasyDialog = Common.getDialog(oConfig);
		var funcCallback = oParseData.callback;
		// 设置内容
		Common.setContent(oEasyDialog, TPL_BODY.replace('{inputType}', oConfig.inputType ? TPL_TXT_TYPE_TEXTAREA : TPL_TXT_TYPE_INPUT), {
			title: oConfig.title,
			content: message
		});
		bindEvent(oEasyDialog, funcCallback);
		oEasyDialog.show();
		// 拖动配置
		oConfig.isNeedDrag && Common.setDragAble(oEasyDialog);
		//console.log(oEasyDialog.get('el'));
		return oEasyDialog;
	}
});
module.exports = new Prompt().prompt;
});