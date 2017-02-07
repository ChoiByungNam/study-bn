/*! _common.js */
(function(win, doc, $, project){
	'use strict';

	project.gallery = {
		def: {
			initData: 'data-init',
	        wrapClass: '.js_item_wrap',
	        itemClass: '.js_item',
			itemViewClass: 'js_item_view',
			btnPrevClass: '.js_button_prev',
			btnNextClass: '.js_button_next'
		},
		init: function(obj){
			var _def = this.def,
				target = obj,
				objItem, objPrev, objNext;
			// console.log(target);
			if(target.attr(_def.initData) !== undefined) return false;
			target.attr(_def.initData, true);
			this.set(target);
		},
		set: function(obj){
			var _def = this.def,
				target = obj,
				objItem = target.find(_def.itemClass),
				objPrev = target.find(_def.btnPrevClass),
				objNext = target.find(_def.btnNextClass);

			if(!target.find('.' + _def.itemViewClass).length){
				// console.log(objItem);
				objItem.eq(0).addClass(_def.itemViewClass);
			}
			objItem.css('left', '100%');
			objItem.eq(0).css('left', '0');
			objPrev.on('click', function(){
				// console.log('prev');
				project.gallery.motion('prev', project.gallery.objWrapFind(this));
			});
			objNext.on('click', function(){
				// console.log('next');
				project.gallery.motion('next', project.gallery.objWrapFind(this));
			});
		},
		objWrapFind: function(obj){
			var _def = this.def;

			return $(obj.closest(_def.wrapClass));
		},
		motion: function(action, obj){
			var _def = this.def,
				target = obj,
				objItem = target.find(_def.itemClass),
				totalNum = objItem.length - 1,
				nowIdx = target.find('.' + _def.itemViewClass).index(),
				targetIdx, targetObj, targetLeft, hideLeft;

			// console.log(objNum);
			// console.log(objIdx);
			if(obj.hasClass('js_anim')) return false;
			if(action === 'next'){
				targetIdx = (nowIdx + 1 > totalNum) ? 0 : nowIdx + 1;
				targetLeft = '100%';
				hideLeft = '-100%';
				targetObj = objItem.eq(targetIdx);
			}else{
				targetIdx = (nowIdx - 1 < 0) ? totalNum : nowIdx - 1;
				targetLeft = '-100%';
				hideLeft = '100%';
				targetObj = objItem.eq(targetIdx);
			}
			project.gallery.move(hideLeft, objItem.eq(nowIdx));
			objItem.eq(targetIdx).css('left', targetLeft);
			project.gallery.move(0, targetObj);

			objItem.eq(nowIdx).removeClass(_def.itemViewClass);
			objItem.eq(targetIdx).addClass(_def.itemViewClass);
		},
		move: function(leftValue, obj){
			var _def = this.def;
			obj.closest(_def.wrapClass).addClass('js_anim');
			obj.stop().animate({
				left: leftValue
			},{
				duration: 300,
				complete: function(){
					obj.closest(_def.wrapClass).removeClass('js_anim');
				}
			});
		},
		auto: function(){
			setInterval(function(){
				// console.log(1);
			}, 300);
		}
	};

	project.slideBanner = function(obj){
		var slide = obj.find('.slide__block'),
			slideItem = slide.find('.slide__item'),
			totalNum = slideItem.length,
			slideLeft = obj.find('.slide_move-left'),
			slideRight = obj.find('.slide_move-right'),
			buttonLeft = obj.find('.button_slide_left'),
			buttonRight = obj.find('.button_slide_right'),
			buttonPause = obj.find('.button_slide_pause'),
			buttonMove = obj.find('.button_slide_move'),
			direction = 1, // 0:left, 1:right
			speed = 2000,
			work = false,
			pause = false;

		slide.css('width', totalNum * slideItem.outerWidth()); // 배너 전체 넓이
		function motion(){
			var itemWidth = $('.slide__block > a').width() + 10;

			if(work === false){
				if(direction === 0){
					slide.append("<a href=\"" + $('.slide__block > a:first').attr("href")+"\">" + $('.slide__block > a:first').html()+ "</a>"); // 롤링 마지막에 맨처음의 a태그 추가
					$('.slide__block > a:first').animate({
						'margin-left': -itemWidth // 맨처음 이미지를 왼쪽으로 이동
					},{
						duration: speed,
						step: function(){
							if(pause === true){
								$(this).stop();
							}
						},
						complete: function(){
							$(this).remove(); // 이동을 마친후 첫번째 a태그 삭제
							motion();
						}
					});
				}else{
					$("<a href=\"" + $('.slide__block > a:last').attr("href")+ "\" class=\"slide__item"+ "\" style=\"margin-left:-" + itemWidth + "px\">" + $('.slide__block > a').html()+ "</a>").insertBefore($('.slide__block > a:first'));
						$('.slide__block > a:first').animate({
						'margin-left': 0
					},{
						duration: speed,
						step: function(){
							if(pause === true){
								$(this).stop();
							}
						},
						complete: function(){
							$('.slide__block > a:last').remove(); // 이동을 마친후 마지막 a태그 삭제
							motion();
						}
					});
				}
			}
		}
		function move(){
			pause = false; // 일시정지 예방
			if(direction === 0){
				motion();
			}else{
				slideItem.first().animate({
					'margin-left': 0
				},{
					duration: speed,
					step: function(){
						if(pause === true){
							$(this).stop();
						}
					},
					complete: function(){
						motion();
					}
				});
			}
		}
		motion();
		slideLeft.on('mouseover', function(){
			direction = 0;
		});
		slideRight.on('mouseover', function(){
			direction = 1;
		});
		buttonLeft.on('click', function(){
			direction = 0;
			console.log('left');
		});
		buttonRight.on('click', function(){
			direction = 1;
			console.log('right');
		});
		buttonPause.on('click', function(){
			pause = true;
			console.log('pause');
		});
		buttonMove.on('click', function(){
			move();
			console.log('move');
		});
	};

	project.tooltip = {
		def: {
			htm: [],
			initData: 'data-tooltip',
			wrapClass: '.l-layer',
			headerClass: '.l-layer-header',
			contentClass: '.l-layer-content'
		},
		tooltipData: [
				{
					titleHtm : '0. Tooltip Title 입니다.',
					contentHtm : '0. Tooltip content 입니다.'
				},{
					titleHtm : '1. Tooltip Title 입니다.',
					contentHtm : '1. Tooltip content 입니다.'
				},{
					titleHtm : '2. Tooltip Title 입니다.',
					contentHtm : '2. Tooltip content 입니다.'
				},{
					titleHtm : '3. Tooltip Title 입니다.',
					contentHtm : '3. Tooltip content 입니다.'
				},{
					titleHtm : '4. Tooltip Title 입니다.',
					contentHtm : '4. Tooltip content 입니다.'
				},{
					titleHtm : '5. Tooltip Title 입니다.',
					contentHtm : '5. Tooltip content 입니다.'
				},{
					titleHtm : '6. Tooltip Title 입니다.',
					contentHtm : '6. Tooltip content 입니다.'
				},{
					titleHtm : '7. Tooltip Title 입니다.',
					contentHtm : '7. Tooltip content 입니다.'
				},{
					titleHtm : '8. Tooltip Title 입니다.',
					contentHtm : '8. Tooltip content 입니다.',
				}
		],
		init: function(obj){
			var _def = this.def,
				target = obj;

			if(target.attr(_def.initData) === undefined) return false; // 이벤트 중복방지
			this.set();

			$(document).ready(function(){ // 처음 tooltip 레이아웃을 뿌려준다
				_def.htm += '<div class="l-layer">';
				_def.htm += '<div class="l-layer-block">';
				_def.htm += '<p class="l-layer-header"></p>';
				_def.htm += '<div class="l-layer-content"></div>';
				_def.htm += '</div>';
				_def.htm += '</div>';

				$('body').append(_def.htm);
			});
		},
		set: function(){
			var _def = this.def,
				_tooltipData = this.tooltipData;

			$(document)
				.on('mouseenter keyup', '[data-tooltip]', function(){
					var objWrap = $(this).closest('body').find(_def.wrapClass),
						objHeader = objWrap.find(_def.headerClass),
						objContent = objWrap.find(_def.contentClass),
						tooltipAttr = $(this).data('tooltip'),
						placementAttr = $(this).data('placement'),
						tooltipNumber = Number(tooltipAttr.replace('layer', '')),
						gep = 7;

					// console.log(tooltipNumber);
					objHeader.html(_tooltipData[tooltipNumber].titleHtm);
					objContent.html(_tooltipData[tooltipNumber].contentHtm);

					if(placementAttr === undefined || placementAttr == 'bottom'){
						objWrap.css({ // 레이어 Bottom 위치값
							top: $(this).offset().top + $(this).outerHeight() + gep,
							left: $(this).offset().left + ($(this).outerWidth() / 2) - (objWrap.outerWidth() / 2)
						}).find('.l-layer-block').addClass('layer--bottom');

						if($(window).height() <= objWrap.outerHeight()){ // 레이어 Bottom 위치값 화면에서 넘치는 경우
							objWrap.css({
								top: $(this).offset().top - (objWrap.outerHeight() + gep)
							}).find('.l-layer-block').removeClass('layer--bottom').addClass('layer--top');
						}
					}else if (placementAttr == 'top'){
						objWrap.css({ // 레이어 Top 위치값
							top: $(this).offset().top - (objWrap.outerHeight() + gep),
							left: $(this).offset().left + ($(this).outerWidth() / 2) - (objWrap.outerWidth() / 2)
						}).find('.l-layer-block').addClass('layer--top');

						if($('body').offset().top >= objWrap.offset().top){ // 레이어 Top 위치값 화면에서 넘치는 경우
							objWrap.css({
								top: $(this).offset().top + $(this).outerHeight() + gep
							}).find('.l-layer-block').removeClass('layer--top').addClass('layer--bottom');
						}
					}else if (placementAttr == 'right'){
						objWrap.css({ // 레이어 Right 위치값
							top: $(this).offset().top + ($(this).outerHeight() / 2) - (objWrap.outerHeight() / 2),
							left: $(this).offset().left + $(this).outerWidth() + gep
						}).find('.l-layer-block').addClass('layer--right');
					}else if (placementAttr == 'left'){
						objWrap.css({ // 레이어 Left 위치값
							top: $(this).offset().top + ($(this).outerHeight() / 2) - (objWrap.outerHeight() / 2),
							left: $(this).offset().left - (objWrap.outerWidth() + gep)
						}).find('.l-layer-block').addClass('layer--left');

						if($('body').offset().left >= objWrap.offset().left){ // 레이어 Left 위치값 화면에서 넘치는 경우
							objWrap.css({
								left: $(this).offset().left + $(this).outerWidth() + gep
							}).find('.l-layer-block').removeClass('layer--left').addClass('layer--right');
						}
					}
					// Def/Bottom일 경우, Top일 경우, Right일 경우, Left일 경우 위치값
					// document에서 넘칠 경우 위치값 변경
				})
				.on('mouseleave keydown', '[data-tooltip]', function(){
					var objWrap = $(this).closest('body').find(_def.wrapClass);

					objWrap.remove();
					$('body').append(_def.htm);
				});
		}
	};

	project.lunch = {
		def: {
			htm: [],
			initData: 'data-init',
			lunchWrap: '#lunchWrap',
			lunchClass: '.lunch',
			lunchItemClass: '.lunch-item',
			startButtonClass: '.button--start',
			itemViewClass: 'js-item-view',
			timer: null,
			randomItem: null
		},
		lunchData: [
			{
				lunchImage : '<img src="img/lunchMenu1.gif" alt="역삼정" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=20827758&_ts=1474337286105" target="_blank">역삼정</a>'
			},{
				lunchImage : '<img src="img/lunchMenu2.gif" alt="교동짬뽕" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=38274945" target="_blank">교동짬뽕</a>'
			},{
				lunchImage : '<img src="img/lunchMenu3.gif" alt="만두랑" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=37997430" target="_blank">만두랑</a>'
			},{
				lunchImage : '<img src="img/lunchMenu4.gif" alt="명동칼국수" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=20858774" target="_blank">명동칼국수</a>'
			},{
				lunchImage : '<img src="img/lunchMenu5.gif" alt="이화수" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=36620276" target="_blank">이화수</a>'
			},{
				lunchImage : '<img src="img/lunchMenu6.gif" alt="콩뿌리콩나물국밥" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=37720676" target="_blank">콩뿌리콩나물국밥</a>'
			},{
				lunchImage : '<img src="img/lunchMenu7.gif" alt="부산아지매국밥" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=37797403" target="_blank">부산아지매국밥</a>'
			},{
				lunchImage : '<img src="img/lunchMenu8.gif" alt="김밥천국" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=30923395" target="_blank">김밥천국</a>'
			},{
				lunchImage : '<img src="img/lunchMenu9.gif" alt="탄" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=32566094" target="_blank">탄</a>'
			},{
				lunchImage : '<img src="img/lunchMenu10.gif" alt="구운몽" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=11573721&_ts=1474344778948" target="_blank">구운몽</a>'
			},{
				lunchImage : '<img src="img/lunchMenu11.gif" alt="현대북어찜황태전골" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=20862618" target="_blank">현대북어찜황태전골</a>'
			},{
				lunchImage : '<img src="img/lunchMenu12.gif" alt="오토코" class="lunch-image">',
				lunchLink : '<a href="http://map.naver.com/local/siteview.nhn?code=37460165" target="_blank">오토코</a>'
			}
		],
		init: function(obj){
			var _def = this.def,
				// _lunchData = this.lunchData,
				target = obj;
				// objLen = _lunchData.length,
				// objList = target.find(_def.lunchClass),
				// objVeiw = _def.itemViewClass,
				// objItem;

			if(target.attr(_def.initData) !== undefined) return false; // 중복처리
			target.attr(_def.initData, true);

			// function shuffle(a){ // 데이터랜덤처리
			// 	var j, x, i;
			//
			// 	for (i = a.length; i; i--) {
			// 		j = Math.floor(Math.random() * i);
			// 		x = a[i - 1];
			// 		a[i - 1] = a[j];
			// 		a[j] = x;
			// 	}
			// }
			// shuffle(_lunchData);
			//
			// for(var i = 0; i < objLen; i++){ // 메뉴생성
			// 	_def.htm += '<li class="lunch-item"><span class="lunch-link">'+_lunchData[i].lunchLink+'</span>'+_lunchData[i].lunchImage+'</li>';
			// }
			// objList.append(_def.htm); // 생성된 메뉴를 DOM에 뿌려준다.
			// // objList.children('li').clone().prependTo(objList); // 생성된 메뉴 앞에 복사
			// // objList.children('li').clone().appendTo(objList); // 생성된 메뉴 뒤에 복사
			//
			// objItem = target.find(_def.lunchItemClass); //기본설정
			// objItem.css('top', '100%');
			// objItem.eq(0).addClass(objVeiw).css('top', '0');

			this.set(target);
		},
		set: function(obj){
			var _def = this.def,
				target = obj,
				startButton = target.find(_def.startButtonClass);

			startButton.off('click').on('click', function(){
				target.find(_def.lunchItemClass).remove();
				target.find(_def.htm).remove();
				project.lunch.randomItem('play', target);
				project.lunch.auto('play', target);
			});

			/*
				개선 : 처음 페이지가 로드되면 lucnhData를 랜덤 생성시키는데,
					   버튼을 클릭했을 때마다 lunchData를 랜덤 생성으로 변경

				버튼을 클릭하면,
				처음에 remove() 시키고,
				랜덤으로 뿌려진 리스트를 append() 시킨다.
			*/
		},
		randomItem: function(randomStatus, obj){
			var _def = this.def,
				_htm = _def.htm,
				_lunchData = this.lunchData,
				target = obj,
				objLen = _lunchData.length,
				objList = target.find(_def.lunchClass),
				objVeiw = _def.itemViewClass,
				objItem;

			function shuffle(a){ // 데이터랜덤처리
				var j, x, i;

				for (i = a.length; i; i--) {
					j = Math.floor(Math.random() * i);
					x = a[i - 1];
					a[i - 1] = a[j];
					a[j] = x;
				}
			}

			if(randomStatus == 'play'){
				if(_def.randomItem === null){
					shuffle(_lunchData);
					for(var i = 0; i < objLen; i++){ // 메뉴생성
						_htm += '<li class="lunch-item"><span class="lunch-link">'+_lunchData[i].lunchLink+'</span>'+_lunchData[i].lunchImage+'</li>';
					}
					objList.append(_htm); // 생성된 메뉴를 DOM에 뿌려준다.
					// objList.children('li').clone().prependTo(objList); // 생성된 메뉴 앞에 복사
					// objList.children('li').clone().appendTo(objList); // 생성된 메뉴 뒤에 복사
					objItem = target.find(_def.lunchItemClass);
					objItem.css('top', '100%');
					objItem.eq(0).addClass(objVeiw).css('top', '0');
				}
			}
		},
		auto: function(autoStatus, obj){
			var _def = this.def,
				target = obj,
				autoDelay = 200,
				autoTimer = 1000,
				nowIdx, i;

			console.log(Math.floor(Math.random() * i));

			if(autoStatus == 'play'){
				if(_def.timer === null){
					_def.timer = setInterval(function(){
						project.lunch.motion('start', project.lunch.objWrapFind(target));
					}, autoDelay);

					setTimeout(function(){
						clearInterval(_def.timer);
						_def.timer = null;
					}, autoTimer);
				}
			}
		},
		objWrapFind: function(obj){
			var _def = this.def;

			return $(obj.closest(_def.lunchWrap));
		},
		motion: function(action, obj){
			var _def = this.def,
				target = obj,
				objItem = target.find(_def.lunchItemClass),
				totalNum = objItem.length,
				nowIdx = target.find('.' + _def.itemViewClass).index(),
				targetIdx, targetTop, hideTop, targetObj;

			if(action == 'start'){
				targetIdx = (nowIdx + 1 > totalNum - 1) ? 0 : nowIdx + 1;
				targetTop = '100%';
				hideTop = '-100%';
				targetObj = objItem.eq(targetIdx);
			}

			project.lunch.move(hideTop, objItem.eq(nowIdx));
			objItem.eq(targetIdx).css('top', targetTop);
			project.lunch.move(0, targetObj);

			objItem.eq(nowIdx).removeClass(_def.itemViewClass);
			objItem.eq(targetIdx).addClass(_def.itemViewClass);
		},
		move: function(topValue, obj){
			var speed = 200;
			obj.stop().animate({
				top: topValue
			},{
				duration: speed,
				easing: 'linear'
			});
		}
	};

	$(function(){
		project.gallery.init($('#gallery')); // Gallery
		project.slideBanner($('#slideBanner')); // Slide Bannerw
		project.tooltip.init($('.item-input')); // Tooltip
		project.lunch.init($('#lunchWrap')); // Lunch Menu
	});

	/* project 객체 글로벌 노출 */
	if (!window.project) {
		window.project = project;
	}
}(this, this.document, this.jQuery, window.project || {}));
