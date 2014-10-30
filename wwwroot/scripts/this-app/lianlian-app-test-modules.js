(function () { // fake header
	var _fakeHeader = document.querySelector('body > header');

	if (false) {
		if (_fakeHeader) {
			_fakeHeader.addEventListener('click', function() {
				window.location.assign('my-booth--index.html');
			});
		}
	} else {
		document.body.removeChild(_fakeHeader);
		delete _fakeHeader;
	}
})();

(function () { // processAll pages
	$('*[lly-page]').each(function (i) {
		this.setAttribute('data-role', 'page');
	});

	$.mobile.defaultPageTransition = 'slide';
})();

(function () { // popup windows
	var popupLocationSelectors = website.popupWindowsService.createWindow(
		document.querySelector('#booth-location-selector'),
		{
			showButtons: [
				document.querySelector('a.row.menu')
			]
		}
	);
})();

(function () { // selector
	var locationSelectorLevel1 = document.querySelector('#boot-location-level1');
	var locationSelectorLevel2 = document.querySelector('#boot-location-level2');
	var locationSelectorLevel3 = document.querySelector('#boot-location-level3');

	locationSelectorLevel1Controller = CreateSelectorController(locationSelectorLevel1);
	locationSelectorLevel2Controller = CreateSelectorController(locationSelectorLevel2);
	locationSelectorLevel3Controller = CreateSelectorController(locationSelectorLevel3);
})();





function CreateSelectorController(rootElement, initOptions) {
	if (!rootElement instanceof HTMLElement || rootElement.id.length<1) return undefined;

	var _thisSelector = {
		rootElement: rootElement,
		styleElement: undefined,
		current: 0,

		select: function (index) { _select.call(this, index); },

		onselect: undefined
	}

	return (function () {
		var _ok;

		_ok = _init.call(this);
		if (!_ok) return undefined;

		_ok = _config.call(this, initOptions);
		if (!_ok) return undefined;

		return this;
	}).call(_thisSelector);

	function _init () {
		var _ok = true;
		this.rootElement.setAttribute('lly-selector', ''); // just for sure
		this.styleElement = document.createElement('style');
		document.head.appendChild(this.styleElement);
		return _ok;
	}

	function _config(o) {
		var _ok = true;

		o = o || {};

		if (o.hasOwnProperty('onselect') && typeof o.onselect === 'function') {
			this.onselect = o.onselect;
		}

		if (o.hasOwnProperty('current')) {
			this.select(o.current);
		}

		return _ok;
	}

	function _select(index) {
		index = parseInt(index);

		if (isNaN(index)) index = 0;
		this.current = index;

		l('this.current', this.current);

		this.styleElement.innerHTML = ''
			+ '*[graph-pie]'
			+ '#' + this.rootElement.id
			+ ' *[graph-pie-half="1"]'
			+ ' { transform: rotateZ('+(this.startAngle)+'deg); }'
		;


		if (typeof this.onselect === 'function') this.onselect();

		// force IE to redraw this element
		this.rootElement.style.visibility = 'hidden';
		this.rootElement.style.visibility = '';
	}
}; // Factory:CreateSelectorController