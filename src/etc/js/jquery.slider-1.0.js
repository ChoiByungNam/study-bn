var slider = {
	def: {
		initData: 'data-init',

		wrapClass: '.js-slider',
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
		infiniteLoop: false, // 자동 반복 사용여부 설정
		randomUse: false, // 처음 보여질 이미지 랜덤 사용여부 설정 / 사용 안할 경우 currentIdx 로 원하는 값 설정

		autoTime: 1000, // 자동 반복 시간
		moveTime: 300, // 이동 시간
		currentIdx: 0, // 클릭 시 index 값
		interval: null
	}
};

slider.init = function (obj) {
	var _def = this.def,
		target = obj;

	if (target.attr(_def.initData) !== undefined) return false;
	target.attr(_def.initData, true);

	slider.setup(target);
};

slider.setup = function (obj) {
	var _def = this.def,
		target = obj,
		objList = target.find(_def.listClass),
		objItem = target.find(_def.itemClass),
		objItemW = objItem.find('img').width(),
		objItemH = objItem.find('img').height(),
		objItemTotal = objItem.length,
		objIdx;

	// 처음 보여질 이미지 랜덤 사용여부
	if (_def.randomUse) {
		objIdx = parseInt(Math.random() * objItem.length);

		_def.currentIdx = objIdx;
	}

	// Tpye CSS 속성 정의
	if (_def.mode == 'slide') { // Type : slide
		objItem.css('float', 'left');
		/*
			무한 slide는 추후 적용
		*/
		// objItem.eq(0).clone().appendTo(_def.listClass);
		// objItem.last().clone().prependTo(_def.listClass);
		objList.css({
			'width': objItemW * target.find(_def.itemClass).length,
			'marginLeft': -objItemW * _def.currentIdx
		});
		target.css('width', objItemW);
	} else if (_def.mode == 'fade') { // Type : Fade
		if (!target.find('.' + _def.viewClass).length) { // 디폴트 이미지에 클래스 부여
			objItem.eq(_def.currentIdx).addClass(_def.viewClass);
		}
		objItem.css({
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'opacity': '0'
		}).eq(_def.currentIdx).css('opacity', '1');
		target.css({
			'width': objItemW,
			'height': objItemH
		});
	}

	// pagination 사용여부
	if (_def.paginationUse) {
		var objPagination = $('<div>').addClass('slider-pagination');

		target.append(objPagination);
		for (var i = 1; i < objItem.length + 1; i++) {
			$(objPagination).append('<button type="button" class="button-item '+_def.paginationItemClass+'">'+i+'</button>');
		}
		objPagination.find('.' + _def.paginationItemClass).eq(_def.currentIdx).addClass(_def.paginationActiveClass);

		target.find('.' + _def.paginationItemClass).on('click', function () {
			paginationIdx = $(this).index();

			slider.move(paginationIdx, slider.wrapObjFind(this));
			$(this).addClass(_def.paginationActiveClass).siblings().removeClass(_def.paginationActiveClass);
		});
	}

	// 이전/다음 버튼 사용여부
	if (_def.btnArrowUse) {
		var prevBtn = $('<button type="button">').addClass('button-prev').text('이전'),
			nextBtn = $('<button type="button">').addClass('button-next').text('다음');

		prevBtn.on('click', function () {
			slider.move(_def.currentIdx - 1, slider.wrapObjFind(this));
			console.log(_def.currentIdx);
		}).appendTo(target).addClass(_def.prevClass);

		nextBtn.on('click', function () {
			slider.move(_def.currentIdx + 1, slider.wrapObjFind(this));
			console.log(_def.currentIdx);
		}).appendTo(target).addClass(_def.nextClass);
	}

	// 자동 반복 사용여부
	if (_def.infiniteLoop) {
		slider.auto(target);
		target.on('mouseleave', function () {
			slider.auto(target);
		}).on('mouseenter', function () {
			clearInterval(_def.interval);
		});
	}
};

slider.auto = function (obj) {
	var _def = this.def,
		target = obj,
		objItemTotal = target.find(_def.itemClass).length,
		objPrev = target.find('.' + _def.prevClass),
		objNext = target.find('.' + _def.nextClass);

	if(objItemTotal > 1) {
		_def.interval = setInterval(function () {
			if (_def.sliderWay == 'left') {
				objPrev.click();
			} else {
				objNext.click();
			}
		}, _def.autoTime);
	}
};

slider.wrapObjFind = function (obj) {
    var _def = this.def;

    return $(obj.closest(_def.wrapClass));
};

slider.move = function (changeIdx, obj) {
	var _def = this.def,
		target = obj,
		objList = target.find(_def.listClass),
		objItem = target.find(_def.itemClass),
		objItemTotal = objItem.length - 1,
		moveValue = objItem.width();

	if (changeIdx > objItemTotal) {
		changeIdx = 0;
	} else if (changeIdx < 0) {
		changeIdx = objItemTotal;
	}

	if (_def.mode == 'slide') {
		objList.stop().animate({
			'marginLeft': -moveValue * changeIdx
		},{
			duration: _def.moveTime
		});
	} else if (_def.mode == 'fade') {
		objItem.eq(changeIdx).addClass(_def.viewClass).siblings().removeClass(_def.viewClass);
		$('.' + _def.viewClass).stop().animate({
			'opacity': '1'
		}).siblings().stop().animate({
			'opacity': '0'
		}, {
			duration: _def.moveTime
		});
	}

	target.find('.' + _def.paginationItemClass).eq(changeIdx).addClass(_def.paginationActiveClass).siblings().removeClass(_def.paginationActiveClass);

	_def.currentIdx = changeIdx;
};

$(document).ready(function () {
	slider.init($('.slider'));
});
