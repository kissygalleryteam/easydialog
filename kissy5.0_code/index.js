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