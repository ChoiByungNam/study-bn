VISUAL STUDIO CODE SETTINGS SYNC
Version: 2.8.1

Download Summary

//= require _common.js
--------------------

GITHUB TOKEN: 085686eb5ee3352ac8aff3b73d25a18536de177d
/*! script.js */
GITHUB GIST: afce83696527c4caf2351118209177f2
(function (window, document, $) {
GITHUB GIST TYPE: Secret

	'use strict';
--------------------

If current theme / file icon extension is not installed. Restart will be Required to Apply Theme and File Icon.



Files Download.

extensions.json
	var bn = {},
keybindings.json
		$window = $(window),
locale.json
		$document = $(document),
settings.json
		$body = $('body');
vsicons.settings.json


EXTENSIONS REMOVED :

	bn.nav = {
No Extension needs to be removed.
		defaults: {


EXTENSIONS ADDED :

			initData: 'data-init',
No Extension needs to install.
			active: 'is-active',

			header: 'l-header',
			nav: 'nav',
			navItem: 'nav-item',
			btnNav: 'button-nav',
			section: 'section'
		},
		init: function (obj) {
			var defaults = this.defaults,
				target = obj;

			if (target.attr(defaults.initData) !== undefined) return false;
			target.attr(defaults.initData, true);

			this.setup(obj);
		},
		setup: function (obj) {
			var defaults = this.defaults;

	 		$window.on('scroll', function () {
				bn.nav.active(obj);
			});
			$document
				.on('click', '.' + defaults.btnNav, function () {
					if ($('#' + defaults.header).hasClass('is-open')) {
						bn.nav.closeNav();
					} else {
						bn.nav.openNav();
					}
				})
				.on('click', '.' + defaults.navItem, function () {
					$(this).addClass(defaults.active).siblings().removeClass(defaults.active);
				});

			this.move();
		},
		active: function () {
			var defaults = this.defaults,
				sectionTheme = '.section--theme',
				nowScroll;

			nowScroll = $window.scrollTop();

			if (nowScroll <= $(sectionTheme + '1').offset().top + ($(sectionTheme + '1').outerHeight() / 2)) {
				$('.' + defaults.navItem).siblings().removeClass(defaults.active).eq(0).addClass(defaults.active);
			} else if (nowScroll <= $(sectionTheme + '2').offset().top + ($(sectionTheme + '2').outerHeight() / 2)) {
				$('.' + defaults.navItem).siblings().removeClass(defaults.active).eq(1).addClass(defaults.active);
			} else if (nowScroll <= $(sectionTheme + '3').offset().top + ($(sectionTheme + '3').outerHeight() / 2)) {
				$('.' + defaults.navItem).siblings().removeClass(defaults.active).eq(2).addClass(defaults.active);
			} else if (nowScroll <= $(sectionTheme + '4').offset().top + ($(sectionTheme + '4').outerHeight() / 2)) {
				$('.' + defaults.navItem).siblings().removeClass(defaults.active).eq(3).addClass(defaults.active);
			} else if (nowScroll <= $(sectionTheme + '5').offset().top + ($(sectionTheme + '5').outerHeight() / 2)) {
				$('.' + defaults.navItem).siblings().removeClass(defaults.active).eq(4).addClass(defaults.active);
			} else {
				$('.' + defaults.navItem).siblings().removeClass(defaults.active).eq(5).addClass(defaults.active);
			}

			return false;
		},
		move: function () {
			var defaults = this.defaults,
				duration = 400,
				activeIdx = 0,
				href;

			$('.' + defaults.navItem).find('a').each(function (i) {
				$(this).attr('href', '#dataScroll' + (i + 1)).on('click', function () {
					var href = this.href.replace(/.*#/, '');

					// console.log(href);
					$('html, body').stop().animate({
						scrollTop: $('#' + href).offset().top - $('#' + defaults.header).outerHeight()
					}, duration);
				});
			});
			$('.' + defaults.section).each(function (i) {
				$(this).attr({
					'id': 'dataScroll' + (i + 1),
					'data-scroll': i + 1
				});
			});

			return false;
			/*
				1. nav, section 공통으로 제어할수 있게 처리
				2. 현재 스크롤 위치 체크해서 nav 에 비활성화/활성화 처리
				3. 불필요한 요소 제거하고, 전체적으로 정리
			*/
		},
		openNav: function () {
			var defaults = this.defaults;

			$('#' + defaults.header).addClass('is-open');
		},
		closeNav: function () {
			var defaults = this.defaults;

			$('#' + defaults.header).removeClass('is-open');
		}
	};

	bn.toTheTop = {
		defaults: {
			btnTop: 'button-top'
		},
		setup: function (current) {
			var defaults = this.defaults,
				scrollTop = current || 0,
				breakPoint = 800;

			if ($window.scrollTop() >= breakPoint) this.btnShow();
			$window.on('scroll', function () {
				if ($window.scrollTop() >= breakPoint) {
					bn.toTheTop.btnShow();
				} else {
					bn.toTheTop.btnHide();
				}
			});
			this.ripple();
		},
		btnHide: function () {
			var defaults = this.defaults;

			$('.' + defaults.btnTop).hide();
		},
		btnShow: function () {
			var defaults = this.defaults;

			$('.' + defaults.btnTop).show();
		},
		ripple: function () {
			var defaults = this.defaults;

			$('.' + defaults.btnTop).on('click', function (event) {
				var positionX = event.pageX,
					positionY = event.pageY,
					btnPositionX = $(this).offset().left,
					btnPositionY = $(this).offset().top,
					rippleNum = $(this).find('.ripple').length;

				console.log('mouseX:' + positionX, 'mouseY:' + positionY, 'btnX:' + btnPositionX, 'btnY:' + btnPositionY);
				$(this).append('<span class="ripple">&nbsp;</span>');
				$('.ripple').eq(rippleNum).stop().animate({
					'top': positionY - btnPositionY,
					'left': positionX - btnPositionX
				},{
					duration: 2000,
					complete: function () {
						$(this).remove();
					}
				});
			});
			return false;
			/*
				클릭하면 <span class="ripple"></span> 태그를 생성하고,
				클릭한 마우스 좌표 값을 생성한 <span class="ripple"></span> 태그에 top, left 값으로 적용시켜준다.
				애니메이션이 끝나면 생성한 <span class="ripple"></span> 태그를 삭제처리한다.

				ripple 버튼에 offset().top,
			*/
		}
		/*
			1. $('.section--theme1').offset().top + ($('.section--theme1').outerHeight() / 2) 스크롤이 도달하면,
				Top 버튼을 노출시키고, 그렇지 않으면 Top 버튼을 숨겨준다.
				Top 버튼을 클릭하면 $('.section--theme1').offset().top 값으로 이동시킨다.
			2. Top 버튼을 클릭하면 마우스 클릭한 곳 좌표 값을 체크하기

			조건문 사용시 결과 값을 바로 사용하지 말고, 따로 정의하여 정의한 함수에 기능을 추가하여 사용
		*/
	};

	$(function () {
		bn.nav.init($('.nav'));
		bn.toTheTop.setup();
	});
})(this, this.document, this.jQuery);
