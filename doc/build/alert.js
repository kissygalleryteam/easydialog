/*
combined files : 

kg/easydialog/2.0.0/common
kg/easydialog/2.0.0/alert

*/
/**
 * @fileoverview alert,confirm,prompt通用的模块
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
KISSY.add('kg/easydialog/2.0.0/common',function(S,Node,Overlay,DD){
	var re = {};
	var $ = Node.all;
	var DOMAIN = document.domain;
	/**
	 * Dialog 默认参数配置
	 * @type {Object}
	 */
	var oDefaultConfig = {
		title:DOMAIN+' 网页提示',
		isNeedDrag:true,
		theme:'kg/easydialog/2.0.0/theme/theme-tb.css',
		width:350,
		height:110,
		zIndex:9999,
		closable:true,
		prefixCls:'ks-easydialog-',
		closeAction:'destroy',
		mask:true,
		effect: {
			// effect:"fade",
			// duration:0.2
		},
		align:{
			points: ['cc','cc']
		}
	};
	
	S.mix(re,{
		/**
		 * 处理传入的参数
		 * @param  {Object}   config   配置参数
		 * @param  {Function} callback 函数名
		 * @return {Obejct}            {config:Object,callback:Function}
		 */
		parseData:function(config,callback){
			var reConfig;
			var reCallback;
			if(S.isPlainObject(config)){
				reConfig = S.mix(oDefaultConfig,config);
			}else if(S.isFunction(config)){
				reConfig = oDefaultConfig;
				callback = config;
			}else{
				// S.log('easydialog params are error !');
				reCallback = callback;
				reConfig = oDefaultConfig;
			}
			if(S.isFunction(callback)){
				reCallback = callback;
			}
			// 加载css
			this.loadCss(reConfig.theme);
			return {
				config:reConfig,
				callback:reCallback
			}
		},
		/**
		 * 获取Dialog
		 * @param  {Object} config 配置信息
		 * @return {Object}        Overlay
		 */
		getDialog:function(config){
			return new Overlay.Dialog(config);
		},
		/**
		 * 设置dialog可以拖动
		 * @param {Object} oDialog dialog对象
		 * @return {Object}
		 */
		setDragAble:function(oDialog){
			var elContent = $(oDialog.get('el'));
			var elTxt = elContent.one('.J_KsEasyDialogPromptTxt');
			var self = this;
			var oDD;
			oDD = self._initDD(elContent);
			//输入框focus的时候不需要拖动
			if(elTxt){
				elContent.on('mousedown',function(){
					if(!oDD){
						oDD = self._initDD(elContent);	
					}
					// !oDD && 					
				});
				elTxt.on('mousedown',function(e){
					oDD && oDD.destroy();
					oDD = null;
				});
			}
		},
		_initDD:function(el){
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
		loadCss:function(cssUrl){
			if(cssUrl && S.isString(cssUrl)){
				S.use(cssUrl);
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
		setContent:function(oDialog,strHtml,oContent){	
			// alert(strHtml)	
			oDialog.set('bodyContent',
				S.substitute(strHtml,oContent)
			);
			return this;
		}
	});
	return re;
},{
	requires:['node','overlay','dd']
});
	
/**
 * @fileoverview 基于Overlay.Dialog dd封装了alert
 * @author bofang.zxj<bofang.zxj@taobao.com>
 * @module easydialog
 **/
KISSY.add('kg/easydialog/2.0.0/alert',function(S,Base,Node,Common){
	var $ = Node.all;

	var TPL_BODY = '<div class="ks-easy-dialog ks-easy-dialog-ok">'+
						'<div class="ks-easy-dialog-head">{title}</div>'+
						'<div class="ks-easy-dialog-body">'+
							'<div class="ks-easy-dialog-title">{content}</div>'+
							'<p class="ks-easy-dialog-btn-content">'+
								'<button class="ks-easy-dialog-yes J_KsDialogOkBtn J_KsEasyDialogBtn">确定</button></p>'+
						'</div>'
					'</div>';

	
	
	function Alert(){
		Alert.superclass.constructor.call(this);
	};
	
	/**
	 * 绑定事件
	 * @param  {Object}   oDialog  dialog名
	 * @param  {Function} callback callback 函数
	 */
	function bindEvent(oDialog,callback){
		oDialog.on('afterRenderUI',function(){
			var elContent = $(oDialog.get('el'));
			var elBtn = elContent.all('.J_KsEasyDialogBtn');
			elBtn.on('click',function(e){
				oDialog.destroy();
				callback && callback({
					result:true
				});
			});
		});
	}
	
	S.extend(Alert, Base, {
		/**
		 * 模拟window.prompt
		 * @param  {String}   message  提示的信息
		 * @param  {Object}   config   配置信息
		 * @param  {Function} callback 回调函数
		 * @return {Obejct}            dialog
		 */
		alert:function(message,config,callback){
			var oParseData = Common.parseData(config,callback);
			var oConfig = oParseData.config;
			var oEasyDialog = Common.getDialog(oConfig);
			var funcCallback = oParseData.callback;
			// 设置内容
			Common.setContent(oEasyDialog, TPL_BODY,{
				title:oConfig.title,
				content:message
			});
			// 事件绑定
			bindEvent(oEasyDialog,funcCallback);
			oEasyDialog.show();
			// 拖动配置
			oConfig.isNeedDrag && Common.setDragAble(oEasyDialog);
			return oEasyDialog;					
		}
	});
	return new Alert().alert;
},{
	requires:['base','node','./common']
});
