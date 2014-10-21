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