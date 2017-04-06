(function (window, document, $) {
	'use strict';

	var bn = {},
		$window = $(window),
		$document = $(document),
		$body = $('body');

	bn.navUi = {
		defaults: {
			buttonClass: '.button-nav'
		},
		setup: function (obj) {
			var def = this.defaults,
				target = obj;

			$document.on('click', def.buttonClass, function () {
				var $this = $(this);

				$this.toggleClass('is-active');
				if ($this.hasClass('is-active')) {
					$('.js-nav').addClass('is-active');
				} else {
					$('.js-nav').removeClass('is-active');
				}
				bn.navUi.nav(obj);
			})
		},
		nav: function (obj) {
			var def = this.defaults,
				target = obj;

			console.log($(this));
		}
		/*
			1. button 마우스 오버하면 활성화 클래스 추가해주고, button 클릭하면 활성화 클래스를 제거해준다.
		*/
	};

	bn.scrollUi = {
		defaults: {
			initData: 'data-init',
			wrapperClass: '.js-wrapper',
			headerClass: '.js-header',
			fixedClass: '.js-fixed',
			sectionClass: '.js-section'
		},
		init: function (obj) {
			var def = this.defaults,
				target = obj;

			if (target.attr(def.initData) !== undefined) return false;
			target.attr(def.initData, true);

			this.setup(obj);
		},
		setup: function (obj) {
			$window.on('scroll', function () {
				bn.scrollUi.start();
			});
			this.start();
		},
		start: function (obj) {
			var def = this.defaults,
				target = obj,
				nowScroll;

			nowScroll = $window.scrollTop();

			if (nowScroll > 0) {
				$(def.fixedClass).css('position', 'fixed');
			} else {
				$(def.fixedClass).css('position', 'relative');
			}
			console.log('현재스크롤 :', nowScroll);
		}
		/*
			1. nowScroll 값이 header 높이 값 보다 커지면 "fixed" 로 변경하고, header 높이 값 보다 작아지면 "relative" 로 변경
			2. nav 메뉴를 클릭하거나 data-scroll 클릭하거나 nowScroll 값이 scrollTop 값과 비슷하면 scrollTop 값으로 애니메이션 구현
		*/
	};

	$(function () {
		bn.navUi.setup($('.js-wrapper'));
		bn.scrollUi.init($('.js-contents'));
	});
})(this, this.document, this.jQuery);
