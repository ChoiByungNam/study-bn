;(function ($) {
	var defaults = {
		initData: 'data-init',

		listClass: '.js-slider-list',
		itemClass: '.js-slider-item',
		viewClass: 'js-view',
		prevClass: 'js-prev',
		nextClass: 'js-next',
		paginationItemClass: 'js-pagination-item',
		paginationActiveClass: 'is-active',

		mode: 'slide', // Slide/Fade 설정
		sliderWay: 'right', // 슬라이드 방향 설정
		paginationUse: true, // Pagination 사용여부 설정
		btnArrowUse: true, // 이전/다음 버튼 사용여부 설정
		infiniteLoop: true, // 자동 반복 사용여부 설정
		randomUse: true, // 처음 보여질 이미지 랜덤 사용여부 설정 / 사용 안할 경우 currentIdx 로 원하는 값 설정
		hideControlOnEnd: false, // 처음 이미지 or 마지막 이미지면 버튼 숨김 처리

		autoTime: 2000, // 자동 반복 시간
		moveTime: 100, // 이동 시간
		currentIdx: 0, // 클릭 시 index 값
		interval: null
	};

	$.fn.slider = function (options) {
		if (this.length === 0) {
			return this;
		} else if (this.length > 1) {
			this.each(function () {
				$(this).slider(options);
			});
			return this;
		}

		var el = this;
		var settings;

		var init = function () {
			settings = $.extend({}, defaults, options); // 옵션 변경을 위한 설정

			if (el.attr(settings.initData) !== undefined) return false;
			el.attr(settings.initData, true);

			setup();
		};

		var setup = function () {
			var objList = el.find(settings.listClass),
				objItem = objList.find(settings.itemClass),
				objItemW = objItem.find('img').width(),
				objItemH = objItem.find('img').height(),
				objItemTotal = objItem.length,
				objIdx;

			// 설정 : 디폴트 이미지 랜덤
			if (settings.randomUse) {
				objIdx = parseInt(Math.random() * objItem.length);

				settings.currentIdx = objIdx;
			}

			// 설정 : mode CSS 속성 정의
			if (settings.mode == 'slide') {
				settings.currentIdx++;
				objItem.css('float', 'left');
				objItem.eq(0).clone().appendTo(el.find(settings.listClass));
				objItem.last().clone().prependTo(el.find(settings.listClass));
				objList.css({
					'width': objItemW * el.find(settings.itemClass).length,
					'marginLeft': -objItemW * settings.currentIdx
				});
				el.css('width', objItemW);
			} else if (settings.mode == 'fade') {
				if (!el.find('.' + settings.viewClass).length) { // 디폴트 이미지에 클래스 부여
					objItem.eq(settings.currentIdx).addClass(settings.viewClass);
				}
				objItem.css({
					'position': 'absolute',
					'top': '0',
					'left': '0',
					'opacity': '0'
				}).eq(settings.currentIdx).css('opacity', '1');
				el.css({
					'width': objItemW,
					'height': objItemH
				});
			}

			// 설정 : pagination
			if (settings.paginationUse) {
				var objPagination = $('<div>').addClass('slider-pagination'),
					activeIdx;

				if (objItemTotal > 1) {
					el.append(objPagination);
					for (var i = 1; i < objItem.length + 1; i++) {
						$(objPagination).append('<button type="button" class="button-item '+settings.paginationItemClass+'">'+i+'</button>');
					}
					activeIdx = (settings.mode == 'slide') ? settings.currentIdx - 1 : settings.currentIdx;
					objPagination.find('.' + settings.paginationItemClass).eq(activeIdx).addClass(settings.paginationActiveClass);

					el.find('.' + settings.paginationItemClass).on('click', function () {
						var paginationIdx = $(this).index(),
							paginationResult;

						paginationResult = (settings.mode == 'slide') ? paginationIdx + 1 : paginationIdx;
						move(paginationResult);
					});
				}
			}

			// 설정 : 이전/다음
			if (settings.btnArrowUse) {
				var prevBtn = $('<button type="button">').addClass('button-prev').text('이전'),
					nextBtn = $('<button type="button">').addClass('button-next').text('다음');

				if (objItemTotal > 1) {
					prevBtn.on('click', function () {
						move(settings.currentIdx - 1);
					}).appendTo(el).addClass(settings.prevClass);

					nextBtn.on('click', function () {
						move(settings.currentIdx + 1);
					}).appendTo(el).addClass(settings.nextClass);
				}

				if(settings.hideControlOnEnd) {
					var hidePrev, hideNext;

					hidePrev = (settings.mode == 'slide') ? 1 : 0;
					hideNext = (settings.mode == 'slide') ? 0 : 1;
					if (settings.currentIdx === hidePrev) {
						el.find('.' + settings.prevClass).hide();
					} else if (settings.currentIdx == objItemTotal - hideNext) {
						el.find('.' + settings.nextClass).hide();
					}
				}
			}

			// 설정 : 자동
			if (settings.infiniteLoop) {
				auto(el);
				el.on('mouseleave', function () {
					if (!el.hasClass('js-auto')) {
						auto(el);
					}
				}).on('mouseenter', function () {
					el.removeClass('js-auto');
					clearInterval(settings.interval);
				});
			}
		};

		var auto = function () {
			var objItemTotal = el.find(settings.itemClass).length,
				objPrev = el.find('.' + settings.prevClass),
				objNext = el.find('.' + settings.nextClass);

			if (!settings.hideControlOnEnd) {
				if(objItemTotal > 1) {
					settings.interval = setInterval(function () {
						if (settings.sliderWay == 'left') {
							objPrev.click();
						} else {
							objNext.click();
						}
					}, settings.autoTime);
					el.addClass('js-auto');
				}
			}
		};

		var move = function (changeIdx) {
			var objList = el.find(settings.listClass),
				objItem = el.find(settings.itemClass),
				objItemTotal = objItem.length - 1,
				moveValue = objItem.width(),
				activeIdx, hideNum;

			if(settings.hideControlOnEnd) {
				hideNum = (settings.mode == 'slide') ? 1 : 0;

				if (changeIdx >= objItemTotal - hideNum) {
					el.find('.' + settings.nextClass).hide();
				} else {
					el.find('.' + settings.nextClass).show();
				}

				if (changeIdx <= hideNum) {
					el.find('.' + settings.prevClass).hide();
				} else {
					el.find('.' + settings.prevClass).show();
				}
			} else {
				if (changeIdx > objItemTotal) {
					changeIdx = 0;
				} else if (changeIdx < 0) {
					changeIdx = objItemTotal;
				}
			}

			if (settings.mode == 'slide') {
				objList.stop().animate({
					'marginLeft': -moveValue * changeIdx
				}, {
					duration: settings.moveTime,
					complete: function () {
						if (changeIdx >= objItemTotal) {
							$(this).stop().css('margin-left', -moveValue);
							settings.currentIdx = 1;
							el.find('.' + settings.paginationItemClass).eq(0).addClass(settings.paginationActiveClass).siblings().removeClass(settings.paginationActiveClass);
						} else if (changeIdx === 0) {
							$(this).stop().css('margin-left', -moveValue * (objItemTotal - 1));
							settings.currentIdx = objItemTotal - 1;
						}
					}
				});
			} else if (settings.mode == 'fade') {
				objItem.eq(changeIdx).addClass(settings.viewClass).siblings().removeClass(settings.viewClass);
				$('.' + settings.viewClass).stop().animate({
					'opacity': '1'
				}).siblings().stop().animate({
					'opacity': '0'
				}, {
					duration: settings.moveTime
				});
			}

			activeIdx = (settings.mode == 'slide') ? changeIdx - 1 : changeIdx;

			el.find('.' + settings.paginationItemClass).eq(activeIdx).addClass(settings.paginationActiveClass).siblings().removeClass(settings.paginationActiveClass);

			settings.currentIdx = changeIdx;
		};

		init();

		return false;
	};
})(jQuery);

$(document).ready(function () {
	$('.slider--type1').slider({}); // 기본설정 [mode: slide, sliderWay: right, paginationUse: true, btnArrowUse: true, infiniteLoop: true, randomUse: true, hideControlOnEnd: false]
	$('.slider--type2').slider({ // Fade [mode: fade, sliderWay: left]
		'sliderWay': 'left',
		'mode': 'fade'
	});
	$('.slider--type3').slider({ // 설정 [paginationUse: false, hideControlOnEnd: true]
		'sliderWay': 'left',
		'paginationUse': false,
		'infiniteLoop': false,
		'hideControlOnEnd': true
	});
});
