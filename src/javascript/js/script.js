const actions = {
	layerControl,
	layerClose
}

function layerControl(e, obj) {
	const layerElement = document.getElementById(obj);
	const layerContent = layerElement.querySelectorAll('.layer')[0];

	const windowHeight = window.document.documentElement.clientHeight;

	layerElement.classList.add('is-opened');
	layerContent.style.top = windowHeight + 'px';
	layerContent.style.left = '0';

	console.log(windowHeight, layerContent.offsetHeight, layerContent.offsetTop);
	// 윈도우 높이 값, 레이어 높이 값, 레이어 offsetTop
}

function layerClose(e, obj) {
	const { target } = e;
}

document.addEventListener('click', e => {
	const { target } = e;
	const actionName = !!target.dataset && target.dataset.action;
	const obj = target.dataset.target;

	if (typeof actionName === 'string' && typeof actions[actionName] === 'function') {
		actions[actionName](e, obj);
	}
});

/*
	포커스
	- 레이어 활성화 시 레이어로 포커스 이동
	- 레이어 비활성화 시 버튼으로 포커스 이동
	- 키보드 포커스 이동 시 레이어에서만 이동

	닫기
	- ESC 클릭 시 레이어 비활성화 처리
	- 모달 딤드 클릭 시 레이어 비활성화 처리

	기능
	- 중앙 정렬 (추후 위치 추가)

	버튼 Type
	- top
	- center
	- bottom

	레이어 Type
	- modal
	- default
*/
