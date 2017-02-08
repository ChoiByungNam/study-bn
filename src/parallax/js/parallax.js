var parallax = {
	def: {
		initData: 'data-init',

		parallaxClass: 'js-parallax',
		themeClass: 'js-theme'
	}
};

parallax.init = function (obj) {
	var _def = this.def,
		target = obj;

	if (target.attr(_def.initData) !== undefined) return false;
	target.attr(_def.initData, true);

	parallax.setup(target);
};

parallax.setup = function (obj) {
	var _def = this.def,
		target = obj,
		scrollH;

	$(window).scroll(function () {
		scrollH = $(document).scrollTop();
		console.log(scrollH);
	});
};

$(document).ready(function () {
	parallax.init($('.parallax'));
});
