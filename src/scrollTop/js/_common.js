(function (window, document, $) {
	'use strict';

	var bn = {},
		$window = $(window),
		$document = $(document),
		$body = $('body');

	bn.sectionScroll = function () {
		var defaults = {
			initData: 'data-init',
			wrapperClass: '.js-wrapper',
			headerClass: '.js-header',
			sectionClass: '.js-section'
		}
		init:function (obj) {
			var def = defaults,
				target = obj;

		}
	};
	bn.sectionScroll();
})(this, this.document, this.jQuery);

// var bnScroll = {
// 	def: {
// 		initData: 'data-init',

// 		wrapperClass: '.js-wrapper',
// 		headerClass: '.js-header',
// 		sectionClass: '.js-section',

// 		currentScroll: 0,
// 		pageNum: 0
// 	}
// };
// bnScroll.init = function (obj) {
// 	var _def = this.def,
// 		target = obj;

// 	if (target.attr(_def.initData) !== undefined) return false;
// 	target.attr(_def.initData, true);
// 	bnScroll.setup(target);
// };
// bnScroll.setup = function (obj) {
// 	var _def = this.def,
// 		target = obj;

// 	$(window).on('scroll', function () {
// 		bnScroll.scrollStart(obj);
// 	});
// };
// bnScroll.scrollStart = function (obj) {
// 	var _def = this.def,
// 		target = obj,
// 		nowScroll = $(window).scrollTop();

// 	console.log('현재스크롤 :', nowScroll);
// };

// $(document).ready(function () {
// 	bnScroll.init($('#l-wrapper'));
// });
