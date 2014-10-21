/*
Mon Oct 20 2014 21:00:11 GMT+0800 (CST)
combined files by KMD:

easydialog/kissy5.0_code/index.js
easydialog/kissy5.0_code/alert.js
easydialog/kissy5.0_code/common.js
easydialog/kissy5.0_code/confirm.js
easydialog/kissy5.0_code/prompt.js
*/

define('kg/easydialog/2.5.0/index',["./alert","./confirm","./prompt"],function(require, exports, module) {
/**
 * @fileoverview 基于Overlay.Dialog dd封装了alert,confirm,prompt，使用dialog会很简单
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
var Alert = require('./alert');
var Confirm = require('./confirm');
var Prompt = require('./prompt');
module.exports = {
	alert: Alert,
	confirm: Confirm,
	prompt: Prompt
};
});
define('kg/easydialog/2.5.0/alert',["util","base","node","./common"],function(require, exports, module) {
/**
 * @fileoverview 基于Overlay.Dialog dd封装了alert
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
var Util = require('util');
var Base = require('base');
var Node = require('node');
var Common = require('./common');
var $ = Node.all;
var TPL_BODY = '<div class="ks-easy-dialog ks-easy-dialog-ok">' + '<div class="ks-easy-dialog-head">{title}</div>' + '<div class="ks-easy-dialog-body">' + '<div class="ks-easy-dialog-title">{content}</div>' + '<p class="ks-easy-dialog-btn-content">' + '<button class="ks-easy-dialog-yes J_KsDialogOkBtn J_KsEasyDialogBtn">\u786E\u5B9A</button></p>' + '</div>';
'</div>';
function Alert() {
	Alert.superclass.constructor.call(this);
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
		elBtn.on('click', function (e) {
			oDialog.destroy();
			callback && callback({ result: true });
		});
	});
}
Util.extend(Alert, Base, {
	/**
	 * 模拟window.prompt
	 * @param  {String}   message  提示的信息
	 * @param  {Object}   config   配置信息
	 * @param  {Function} callback 回调函数
	 * @return {Obejct}            dialog
	 */
	alert: function (message, config, callback) {
		var oParseData = Common.parseData(config, callback);
		var oConfig = oParseData.config;
		var oEasyDialog = Common.getDialog(oConfig);
		var funcCallback = oParseData.callback;
		// 设置内容
		Common.setContent(oEasyDialog, TPL_BODY, {
			title: oConfig.title,
			content: message
		});
		// 事件绑定
		bindEvent(oEasyDialog, funcCallback);
		oEasyDialog.show();
		// 拖动配置
		oConfig.isNeedDrag && Common.setDragAble(oEasyDialog);
		return oEasyDialog;
	}
});
module.exports = new Alert().alert;
});
define('kg/easydialog/2.5.0/common',["util","node","overlay","dd"],function(require, exports, module) {
/**
 * @fileoverview alert,confirm,prompt通用的模块
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
var Util = require('util');
var Node = require('node');
var Overlay = require('overlay');
var DD = require('dd');
var re = {};
var $ = Node.all;
var DOMAIN = document.domain;
/**
* Dialog 默认参数配置
* @type {Object}
*/
var oDefaultConfig = {
	title: DOMAIN + ' \u7F51\u9875\u63D0\u793A',
	isNeedDrag: true,
	theme: 'gallery/easydialog/1.1/theme/theme-tb.css',
	width: 350,
	height: 110,
	zIndex: 9999,
	closable: true,
	prefixCls: 'ks-easydialog-',
	closeAction: 'destroy',
	mask: true,
	effect: {},
	align: {
		points: [
			'cc',
			'cc'
		]
	}
};
Util.mix(re, {
	/**
	 * 处理传入的参数
	 * @param  {Object}   config   配置参数
	 * @param  {Function} callback 函数名
	 * @return {Obejct}            {config:Object,callback:Function}
	 */
	parseData: function (config, callback) {
		var reConfig;
		var reCallback;
		if (Util.isPlainObject(config)) {
			reConfig = Util.mix(oDefaultConfig, config);
		} else if (Util.isFunction(config)) {
			reConfig = oDefaultConfig;
			callback = config;
		} else {
			// S.log('easydialog params are error !');
			reCallback = callback;
			reConfig = oDefaultConfig;
		}
		if (Util.isFunction(callback)) {
			reCallback = callback;
		}
		// 加载css
		this.loadCss(reConfig.theme);
		return {
			config: reConfig,
			callback: reCallback
		};
	},
	/**
	 * 获取Dialog
	 * @param  {Object} config 配置信息
	 * @return {Object}        Overlay
	 */
	getDialog: function (config) {
		return new Overlay.Dialog(config);
	},
	/**
	 * 设置dialog可以拖动
	 * @param {Object} oDialog dialog对象
	 * @return {Object}
	 */
	setDragAble: function (oDialog) {
		var elContent = $(oDialog.get('el'));
		var elTxt = elContent.one('.J_KsEasyDialogPromptTxt');
		var self = this;
		var oDD;
		oDD = self._initDD(elContent);
		//输入框focus的时候不需要拖动
		if (elTxt) {
			elContent.on('mousedown', function () {
				if (!oDD) {
					oDD = self._initDD(elContent);
				}	// !oDD && 					
			});
			elTxt.on('mousedown', function (e) {
				oDD && oDD.destroy();
				oDD = null;
			});
		}
	},
	_initDD: function (el) {
		return new DD.Draggable({
			node: el,
			cursor: 'move',
			move: true
		});
	},
	/**
	 * 加载css
	 * @param  {String} cssUrl css路劲
	 * @return {Object}        this
	 */
	loadCss: function (cssUrl) {
		if (cssUrl && Util.isString(cssUrl)) {
			require(cssUrl);
		}
		return this;
	},
	/**
	 * 设置dialog内容
	 * @param {Object} oDialog dialog对象
	 * @param {String} body 的html内容
	 * @param {Object} oContent 内容对象
	 *  @param {String} head dialog的title
	 *  @param {String} body dialog的body内容
	 * @return {Object} this
	 */
	setContent: function (oDialog, strHtml, oContent) {
		// alert(strHtml)	
		oDialog.set('bodyContent', Util.substitute(strHtml, oContent));
		return this;
	}
});
module.exports = re;
});
define('kg/easydialog/2.5.0/confirm',["util","base","node","./common"],function(require, exports, module) {
/**
 * @fileoverview 基于Overlay.Dialog dd封装confirm
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
var Util = require('util');
var Base = require('base');
var Node = require('node');
var Common = require('./common');
var $ = Node.all;
var TPL_BODY = '<div class="ks-easy-dialog ks-easy-dialog-confirm">' + '<div class="ks-easy-dialog-head">{title}</div>' + '<div class="ks-easy-dialog-body J_KsEasyDialogBody">' + '<div class="ks-easy-dialog-title">{content}</div>' + '<p class="ks-easy-dialog-btn-content"><button class="ks-easy-dialog-yes J_KsDialogOkBtn J_KsEasyDialogBtn" >\u786E\u5B9A</button>' + '<button class="ks-easy-dialog-no J_KsDialogNoBtn J_KsEasyDialogBtn">\u53D6\u6D88</button></p>' + '</div>';
'</div>';
var DOMAIN = document.domain;
function Confirm() {
	Confirm.superclass.constructor.call(this);
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
		elBtn.on('click', function (e) {
			var elTarget = $(e.target);
			var result = elTarget.hasClass('ks-easy-dialog-yes');
			oDialog.destroy();
			callback && callback({ result: result });
		});
	});
}
Util.extend(Confirm, Base, {
	/**
	 * 模拟window.prompt
	 * @param  {String}   message  提示的信息
	 * @param  {Object}   config   配置信息
	 * @param  {Function} callback 回调函数
	 * @return {Obejct}            dialog
	 */
	confirm: function (message, config, callback) {
		// S.log(callback);
		var oParseData = Common.parseData(config, callback);
		var oConfig = oParseData.config;
		var oEasyDialog = Common.getDialog(oConfig);
		var funcCallback = oParseData.callback;
		// 设置内容
		Common.setContent(oEasyDialog, TPL_BODY, {
			title: oConfig.title,
			content: message
		});
		// 事件绑定
		bindEvent(oEasyDialog, funcCallback);
		oEasyDialog.show();
		// 拖动配置
		oConfig.isNeedDrag && Common.setDragAble(oEasyDialog);
	}
});
module.exports = new Confirm().confirm;
});
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