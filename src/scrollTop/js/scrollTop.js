var bnScroll = {
	def: {
		initData: 'data-init',

		wrapperClass: '.js-wrapper',
		headerClass: '.js-header',
		sectionClass: '.js-section',

		currentScroll: 0,
		pageNum: 0
	}
};

bnScroll.init = function (obj) {
	var _def = this.def,
		target = obj;

	if (target.attr(_def.initData) !== undefined) return false;
	target.attr(_def.initData, true);

	bnScroll.setup(target);
};

bnScroll.setup = function (obj) {
	var _def = this.def,
		target = obj;

	console.log();

	$(window).on('scroll', function () {
		bnScroll.scrollStart(obj);
	});
};

bnScroll.scrollStart = function (obj) {
	var _def = this.def,
		target = obj,
		nowScroll = $(window).scrollTop();

	console.log('현재스크롤 :', nowScroll);
	// console.log(scrollH);
};

$(document).ready(function () {
	bnScroll.init($('#l-wrapper'));
});
