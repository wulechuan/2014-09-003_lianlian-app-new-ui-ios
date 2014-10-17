var l = console.log.bind(console);
var w = console.warn.bind(console);
var e = console.error.bind(console);

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

	// $('a').each(function (i) {
	// 	this.setAttribute('data-transition', 'slide');
	// });
	$.mobile.defaultPageTransition = 'slide';
})();

(function () {
	function uaHas(inString)          { return navigator.userAgent.search(inString) >= 0; }
	function uaHasNot(inString)       { return navigator.userAgent.search(inString) <  0; }
	function platformHas(inString)    { return navigator.platform.search(inString)  >= 0; }
	function platformHasNot(inString) { return navigator.platform.search(inString)  <  0; }

	window.thisApp = {
		env: {
			os: {
				ios: uaHas('like Mac OS X') && platformHasNot('Win32'),
				android: uaHas('Android') || platformHas('Linux arm')
			}
		},

		setMaxHeight: function (element, subtractSelectors) {
			subtractSelectors = subtractSelectors || [];
			var _subtractHeights = [];
			var _subtractHeightTotal = 0;
			for (var _s = 0; _s < subtractSelectors.length; _s++) {
				var _el = subtractSelectors[_s];
				if (!(_el instanceof HTMLElement)) {
					_el = document.querySelector( _el );
				}
				var _elHeight = !!_el ? parseFloat(_el.offsetHeight) : 0;
				// var _elHeight = !!_el ? parseFloat(window.getComputedStyle(_el).height) : 0;
				_subtractHeights[_s] = _elHeight;
				_subtractHeightTotal += _elHeight;
			};

			var _maxHeight = Math.max(0, (window.innerHeight - _subtractHeightTotal));
			// console.log(window.innerHeight + ' - [', _subtractHeights.join(', '), '] = ' + _maxHeight);

			if (_maxHeight > 0) element.style.maxHeight = _maxHeight + 'px';
		},


		tryShowButtonSectionTooltip: function (buttonSection, toShowTooltip) {
			buttonSection.style.paddingTop = toShowTooltip ? '0px' : '';
			buttonSection.querySelector('.tooltip').style.display = toShowTooltip ? '' : 'none';
		},


		updateAdStatus: function (element, status) {
			// status:
				// 0: 暂无提交
				// 1: 等待审核
				// 2: 审核通过
				// 3: 审核失败

			var _attr = false;

			switch (status) {
				case 0: _attr = 'zan-wu-ti-jiao';		break;
				case 1: _attr = 'deng-dai-shen-he';		break;
				case 2: _attr = 'shen-he-tong-guo';		break;
				case 3: _attr = 'shen-he-shi-bai';		break;
				default: break;
			}

			if (_attr) element.setAttribute('ad-status', _attr);
		}
	};
})();

(function () { // page-my-booth-create
	[
		document.querySelector('*[data-url="page-my-booth-create-step-1"] button.next-step'),
		document.querySelector('*[data-url="page-my-booth-create-step-2"] button.next-step'),
		document.querySelector('*[data-url="page-my-booth-create-step-3"] button.next-step')
	].forEach(function (button, i, buttons) {
		var nextStep = i+2;
		var nextStepUri = nextStep + ((nextStep===4) ? ((thisApp.env.os.ios ? '-ios' : '-android')) : '');
			nextStepUri = 'my-booth-create-step' + nextStepUri + '.html';
		l(nextStepUri);
		button.addEventListener('click', function (event) {
		});
	});


	var myBoothCategoryRow = document.querySelector('#my-booth-create-select-category');
	var myBoothCategory = document.querySelector('#my-booth-create-category');

	myBoothCategoryRow.addEventListener('click', function (event) {

		console.error('Logics are *FAKE*! Please popup a window and fetch real data by AJAX.');
		var category = '美食 西餐厅'; alert('从弹窗中选择了wifi类别为：' + category);

		myBoothCategory.innerHTML = category;
	});
})();


(function () { // page-my-booth-owner-verify
	var pageStep1 = document.querySelector('*[data-url="page-my-booth-owner-verify-step-1"]');
	var pageStep2 = document.querySelector('*[data-url="page-my-booth-owner-verify-step-2"]');

	// pageStep1.querySelector('[button].submit').addEventListener('click', function (event) {
	// });

	// pageStep2.querySelector('button.submit').addEventListener('click', function (event) {
	// });
})();


(function () { // page-my-booth-statistics-graphs-pies
	var graphPieControllers = [];

	graphPieControllers[0] = CreateLLyGraphPieController(
		document.querySelector('#my-booth-statistics-graph-pie-male'),
		{
			dataElement: document.querySelector('#my-booth-statistics-graph-pie-data-male'),
			dataValue: 0.07
			// ,onupdate: function () { console.log(this.dataValue, this.arcAngle); }
		}
	);

	graphPieControllers[1] = CreateLLyGraphPieController(
		document.querySelector('#my-booth-statistics-graph-pie-female'),
		{
			dataElement: document.querySelector('#my-booth-statistics-graph-pie-data-female'),
			dataValue: 0.72
		}
	);

	graphPieControllers[2] = CreateLLyGraphPieController(
		document.querySelector('#my-booth-statistics-graph-pie-unknown'),
		{
			dataElement: document.querySelector('#my-booth-statistics-graph-pie-data-unknown'),
			dataValue: 0.51
		}
	);



	// please delete codes below, cause they are simply codes for demo
	(function () { // GraphPieController sample codes
		console.warn('Test codes here.');
		// you may update by ratio
		graphPieControllers[0].update(0.4);

		// or update by endAngel
		graphPieControllers[1].updateByAngles(undefined, 19);

		// graphPieControllers[2].update(0.15, 20); // you may set startAngel a value other than zero.
	})();
})();


(function () { // page-my-booth-statistics-graphs-columns
	var graphColumnsFisrtShow = 1; // 1: 周末; 0: 平时
	var columnGraphs = Array.prototype.slice.apply(document.querySelectorAll('.graph-columns'));

	var switcherForGraphs = CreateLLYSwitcherController(
		document.querySelector('#switcher-graph-columns-visitors'),
		{
			switchTo: graphColumnsFisrtShow,
			onswitch: function () {
				// console.log('[',this.checked, ']', this.checkedValue);
				switchToGraph(this.checked);
			}
		}
	);

	function switchToGraph(i) { columnGraphs[i].style.display = '', columnGraphs[1-i].style.display = 'none'; }
})();


(function () { // page-my-booth-promo-link
	var helpButton = document.querySelector('.help-link');
	var helpImagesRoot = document.querySelector('.help-images');
	var helpImages = Array.prototype.slice.apply(document.querySelectorAll('.help-images i'));

	helpButton.addEventListener('click', function (event) { helpImagesRoot.style.display = 'block'; });
	helpImages.forEach(function (h, i, helpImages) {
		h.addEventListener('click', function (event) { helpImagesRoot.style.display = ''; });
	});





	var allOptionContents = Array.prototype.slice.apply(document.querySelectorAll('*[option-content]'));
	var prettyCheckboxController = CreateLLYPrettyCheckboxController(
		document.querySelector('#pretty-checkbox-promotion-link'),
		{
			// checked: true,
			onchange: function (event) {},
			oncheck: function (event) { $(allOptionContents).slideDown(); },
			onuncheck: function (event) { $(allOptionContents).slideUp(); }
		}
	);





	var adStatus = document.querySelector('#ad-status');
	console.warn('Test codes here. Please fetch real data by AJAX');
	thisApp.updateAdStatus(adStatus, 2);
	// $.json('http://lly.com/abc.json')
	// 	.success(function (data) {
	// 		var status = data.status;
	// 		updateAdStatus(adStatus, status);
	// 	})
	// ;
})();


(function () { // page-text-ad-list
	var thisPage = document.querySelector('*[data-url="page-my-booth-text-ad-list"]');



	var helpButton = thisPage.querySelector('.help-link');
	var helpImagesRoot = thisPage.querySelector('.help-images');
	var helpImages = Array.prototype.slice.apply(thisPage.querySelectorAll('.help-images i'));

	helpButton.addEventListener('click', function (event) { helpImagesRoot.style.display = 'block'; });
	helpImages.forEach(function (h, i, helpImages) {
		h.addEventListener('click', function (event) { helpImagesRoot.style.display = ''; });
	});




	var buttonSection = thisPage.querySelector('section.button');
	var adListContainer = document.querySelector('.ads-list .scroller');
	var ads = Array.prototype.slice.apply(document.querySelectorAll('section.ad'));
	var listMaxHeightEffectors = [
		'body > header',
		'section.message',
		'section.button'
	];


	// test: try to delete all hard-coded elements and show tooltip
	// var _a = ads.slice(); _a.forEach(function(e, i) {e.parentNode.removeChild(e); ads.splice(0,1); });


	window.addEventListener('resize', decideListContainerMaxHeight);
	window.setTimeout(decideListContainerMaxHeight, 1);
	tryShowTooltip();

	function tryShowTooltip() { thisApp.tryShowButtonSectionTooltip(buttonSection, ads.length <= 0); }
	function decideListContainerMaxHeight() { thisApp.setMaxHeight(adListContainer, listMaxHeightEffectors); }
})();


(function () { // page-text-ad-create
	var thisPage = document.querySelector('*[data-url="page-my-booth-text-ad-create"]');
})();


(function () { // page-rich-ad
	var thisPage = document.querySelector('*[data-url="page-my-booth-rich-ad-list"]');



	var helpButton = thisPage.querySelector('.help-link');
	var helpImagesRoot = thisPage.querySelector('.help-images');
	var helpImages = Array.prototype.slice.apply(thisPage.querySelectorAll('.help-images i'));

	helpButton.addEventListener('click', function (event) { helpImagesRoot.style.display = 'block'; });
	helpImages.forEach(function (h, i, helpImages) {
		h.addEventListener('click', function (event) { helpImagesRoot.style.display = ''; });
	});




	var buttonSection = thisPage.querySelector('section.button');
	var adListContainer = document.querySelector('.ads-list .scroller');
	var ads = Array.prototype.slice.apply(document.querySelectorAll('section.ad'));
	var listMaxHeightEffectors = [
		'body > header',
		'section.message',
		'section.button'
	];


	// test: try to delete all hard-coded elements and show tooltip
	// var _a = ads.slice(); _a.forEach(function(e, i) {e.parentNode.removeChild(e); ads.splice(0,1); });


	window.addEventListener('resize', decideListContainerMaxHeight);
	window.setTimeout(decideListContainerMaxHeight, 1);
	tryShowTooltip();

	function tryShowTooltip() { thisApp.tryShowButtonSectionTooltip(buttonSection, ads.length <= 0); }
	function decideListContainerMaxHeight() { thisApp.setMaxHeight(adListContainer, listMaxHeightEffectors); }
})();

(function () {
	var thisPage = document.querySelector('*[data-url="page-my-booth-rich-ad-create"]');
})();


(function () { // page-private-ad
	var thisPage = document.querySelector('*[data-url="page-my-booth-private-ad-list"]');
	var buttonSection = thisPage.querySelector('section.button');
	var adListContainer = document.querySelector('.ads-list .scroller');
	var ads = Array.prototype.slice.apply(document.querySelectorAll('section.ad'));
	var listMaxHeightEffectors = [
		'body > header',
		'section.message',
		'section.button'
	];


	// test: try to delete all hard-coded elements and show tooltip
	// var _a = ads.slice(); _a.forEach(function(e, i) {e.parentNode.removeChild(e); ads.splice(0,1); });


	window.addEventListener('resize', decideListContainerMaxHeight);
	window.setTimeout(decideListContainerMaxHeight, 1);
	tryShowTooltip();

	function tryShowTooltip() { thisApp.tryShowButtonSectionTooltip(buttonSection, ads.length <= 0); }
	function decideListContainerMaxHeight() { thisApp.setMaxHeight(adListContainer, listMaxHeightEffectors); }
})();

(function () {
	var thisPage = document.querySelector('*[data-url="page-my-booth-private-ad-create"]');
})();







function CreateLLyGraphPieController(rootElement, initOptions) {
	if (!rootElement instanceof HTMLElement || rootElement.id.length<1) return undefined;

	var _thisPieGraph = {
		rootElement: rootElement,
		dataElement: undefined,
		styleElement: undefined,
		startAngle: 0,
		endAngle: 0,
		arcAngle: 0,
		dataValue: 0,

		update: function (value, startAngle) { _update.call(this, value, startAngle); },
		updateByAngles: function (startAngle, endAngle) { _updateByAngles.call(this, startAngle, endAngle); },

		onupdate: undefined
	}

	return (function () {
		var _ok;

		_ok = _init.call(this);
		if (!_ok) return undefined;

		_ok = _config.call(this, initOptions);
		if (!_ok) return undefined;

		return this;
	}).call(_thisPieGraph);

	function _init () {
		var _ok = true;
		this.rootElement.setAttribute('graph-pie', ''); // just for sure
		this.styleElement = document.createElement('style');
		document.head.appendChild(this.styleElement);
		return _ok;
	}

	function _config(options) {
		var _ok = true;

		options = options || {};

		if (options.hasOwnProperty('onupdate') && typeof options.onupdate === 'function') {
			this.onupdate = options.onupdate;
		}

		if (options.hasOwnProperty('dataElement') && options.dataElement instanceof HTMLElement) {
			this.dataElement = options.dataElement;
		}


		if (options.hasOwnProperty('startAngle') || options.hasOwnProperty('endAngle') || options.hasOwnProperty('dataValue')) {
			if (options.hasOwnProperty('dataValue')) {
				this.update( options.dataValue, options.startAngle);
			} else {
				this.updateByAngles(options.startAngle, options.endAngle);
			}
		}

		return _ok;
	}

	function _update(value, startAngle) {
		startAngle = parseFloat(startAngle);
		value = parseFloat(value);

		if (isNaN(startAngle) && isNaN(value)) return;

		if (isNaN(startAngle)) startAngle = this.startAngle;

		if (isNaN(value)) {
			value = this.dataValue;
		} else {
			value = Math.min(1, Math.max(0, value));
		}

		this.updateByAngles(startAngle, startAngle+value*360);
	}

	function _updateByAngles(startAngle, endAngle) {
		startAngle = parseFloat(startAngle);
		endAngle = parseFloat(endAngle);

		if (isNaN(startAngle) && isNaN(endAngle)) return;

		if (isNaN(startAngle)) startAngle = this.startAngle;
		if (isNaN(endAngle))   endAngle   = this.endAngle;

		var _startAngle = startAngle % 360;
		var _endAngle   = endAngle % 360;

		if (_startAngle===_endAngle && startAngle != endAngle) {
			this.startAngle = _startAngle;
			this.endAngle   = _startAngle+360;
			this.arcAngle   = 360;
		} else {
			this.startAngle = _startAngle;
			this.endAngle   = _endAngle;
			this.arcAngle   = this.endAngle - this.startAngle;
		}


		this.dataValue = this.arcAngle / 360;

		var half1Angle = Math.max(-180, this.arcAngle - 360);
		var half2Angle = Math.min(0, this.arcAngle - 360 + 180);

		// console.log(this.startAngle, this.arcAngle, half1Angle, half2Angle);

		this.styleElement.innerHTML = ''
			+ '*[graph-pie]'
			+ '#' + this.rootElement.id
			+ ' *[graph-pie-half="1"]'
			+ ' { transform: rotateZ('+(this.startAngle)+'deg); }'

			+ '*[graph-pie]'
			+ '#' + this.rootElement.id
			+ ' *[graph-pie-half="2"]'
			+ ' { transform: rotateZ('+(this.startAngle+180)+'deg); }'

			+ '*[graph-pie]'
			+ '#' + this.rootElement.id
			+ ' *[graph-pie-half="1"]:before'
			+ ' { transform: rotateZ('+half1Angle+'deg); }'
			+ '*[graph-pie]'
			+ '#' + this.rootElement.id
			+ ' *[graph-pie-half="2"]:before'
			+ ' { transform: rotateZ('+half2Angle+'deg); }'
		;


		if (this.dataElement) {
			var _value = String(this.dataValue*100);
			_value = _value.slice(0, (_value.indexOf('.')>=0 ? _value.indexOf('.') : _value.length));
			this.dataElement.innerHTML = _value;
		}

		if (typeof this.onupdate === 'function') this.onupdate();

		// force IE to redraw this element
		this.rootElement.style.visibility = 'hidden';
		this.rootElement.style.visibility = '';
	}
}; // Factory:CreateLLyGraphPieController


function CreateLLYSwitcherController(rootElement, initOptions) {
	if (!rootElement instanceof HTMLElement) return undefined;

	var _thisSwitcher = {
		rootElement: rootElement,
		inputs: [],
		inputValues: [],
		checked: NaN,
		checkedValue: undefined,

		switchTo: function (i) {
			if (this.inputs.length === 2 && !isNaN(this.checked)) {
				_switchTo.call(this, 1-this.checked);
			} else {
				_switchTo.call(this, i);
			}
		},

		onswitch: undefined
	}

	return (function () {
		var _ok;

		_ok = _init.call(this);
		if (!_ok) return undefined;

		_ok = _config.call(this, initOptions);
		if (!_ok) return undefined;

		return this;
	}).call(_thisSwitcher);

	function _init () {
		var _ok = true;

		this.rootElement.classList.add('switcher');
		this.inputs = Array.prototype.slice.apply(this.rootElement.querySelectorAll('input[type="radio"]'));

		for (var _i = 0; _i < this.inputs.length; _i++) {
			var _input = this.inputs[_i];

			this.inputValues[_i] =_input.value;
			_input.addEventListener('click', function (event) {
				_thisSwitcher.switchTo(this);
			});
		};

		return _ok;
	}

	function _config(options) {
		var _ok = true;
		options = options || {};

		if (options.hasOwnProperty('onswitch') && typeof options.onswitch === 'function') {
			this.onswitch = options.onswitch;
		}

		if (options.hasOwnProperty('switchTo')) this.switchTo(options.switchTo);

		return _ok;
	}

	function _switchTo(i) {
		var _clickedInput;

		if ((i instanceof HTMLElement) && i.tagName.toLowerCase() === 'input') {
			_clickedInput = i;
		} else {
			i = parseInt(i);
			if (i<0 || i>=this.inputs.length) {
				console.warn('i =', i, '\tInvalid i for LLYSwitcher', this.rootElement);
				return;
			}
			_clickedInput = this.inputs[i];
		}

		this.inputs.forEach(function (input, i, inputs) {
			if (input === _clickedInput) {
				input.setAttribute('checked', '');
				_thisSwitcher.checked = i;
				_thisSwitcher.checkedValue = _thisSwitcher.inputValues[i];
				if (typeof _thisSwitcher.onswitch === 'function') _thisSwitcher.onswitch();
			} else {
				input.removeAttribute('checked');
			}
		});

		// force IE to redraw this element
		this.rootElement.style.visibility = 'hidden';
		this.rootElement.style.visibility = '';
	}
}; // Factory:CreateLLYSwitcherController


function CreateLLYPrettyCheckboxController(rootElement, initOptions) {
	if (!rootElement instanceof HTMLElement) return undefined;

	var _thisCheckbox = {
		rootElement: rootElement,
		input: undefined,

		check: function (checked, event) { return _check.call(this, checked, event); },
		onchange: undefined,
		oncheck: undefined,
		onuncheck: undefined,
	}

	return (function () {
		var _ok;

		_ok = _init.call(this);
		if (!_ok) return undefined;

		_ok = _config.call(this, initOptions);
		if (!_ok) return undefined;

		return this;
	}).call(_thisCheckbox);

	function _init () {
		var _ok = true;

		Object.defineProperty(this, 'checked', {
			get: function () { return this.input.checked; },
			set: function (checked) { return this.check(checked, null); }
		});

		this.rootElement.setAttribute('lly-pretty-checkbox', ''); // just for sure
		this.input = this.rootElement.querySelector('input[type="checkbox"]');

		if (!(this.input instanceof HTMLElement || this.input.tagName.toLowerCase() != 'input')) {
			_ok = false;
			return _ok;
		}

		this.rootElement.addEventListener('click', function (event) { _thisCheckbox.check(undefined, event); });
		this.input.addEventListener('click', function (event) { _thisCheckbox.check(undefined, event); });

		return _ok;
	}

	function _config(options) {
		var _ok = true;
		options = options || {};

		if (options.hasOwnProperty('onchange') && typeof options.onchange === 'function') {
			this.onchange = options.onchange;
		}

		if (options.hasOwnProperty('oncheck') && typeof options.oncheck === 'function') {
			this.oncheck = options.oncheck;
		}

		if (options.hasOwnProperty('onuncheck') && typeof options.onuncheck === 'function') {
			this.onuncheck = options.onuncheck;
		}

		if (options.hasOwnProperty('checked')) {
			this.check(options.checked, null);
		} else {
			this.check(this.input.checked, null);
		}
		return _ok;
	}

	function _check(checked, event) {
		// console.log('raw value:', checked, event.target);
		if (typeof checked==='undefined') {
			if (event && event.target && event.target === this.input ) {
				// auto toggle by browser
			} else {
				// console.log('not the input element');
				this.input.checked = !this.input.checked;
			}
		} else {
			checked = !!checked
			this.input.checked = checked;
		}

		if (this.input.checked) {
			this.rootElement.setAttribute('checked', '');
		} else {
			this.rootElement.removeAttribute('checked');
		}

		if (typeof _thisCheckbox.onchange === 'function') _thisCheckbox.onchange(event);
		if (typeof _thisCheckbox.oncheck === 'function' && this.input.checked) _thisCheckbox.oncheck(event);
		if (typeof _thisCheckbox.onuncheck === 'function' && !this.input.checked) _thisCheckbox.onuncheck(event);

		// force IE to redraw this element
		this.rootElement.style.visibility = 'hidden';
		this.rootElement.style.visibility = '';

		return this.input.checked;
	}
}; // Factory:CreateLLYPrettyCheckboxController
