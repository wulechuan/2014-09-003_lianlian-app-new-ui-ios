(function () {
	var _fakeHeader = document.querySelector('body > header');

	_fakeHeader.addEventListener('click', function() {
		window.location.assign('my-booth--index.html');
	});
	
	return false;
	document.body.removeChild(_fakeHeader);
	delete _fakeHeader;
})();



var appEnv = {
	isIOS: true
};




function CreateGraphPieController(rootElement, initOptions) {
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

		if (options.hasOwnProperty('dataElement') && options.dataElement instanceof HTMLElement) {
			this.dataElement = options.dataElement;
		}

		if (options.hasOwnProperty('onupdate') && typeof options.onupdate === 'function') {
			this.onupdate = options.onupdate;
		}


		if (options.hasOwnProperty('startAngle') || options.hasOwnProperty('endAngle') || options.hasOwnProperty('dataValue')) {
			if (options.hasOwnProperty('dataValue')) {
				this.update( options.dataValue, options.startAngle);
			} else {
				this.updateByAngles(options.startAngle, options.endAngle);
			}
		}

		if (options.hasOwnProperty('onupdate') && typeof options.onupdate === 'function') {
			this.onupdate = options.onupdate;
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
} // Factory:CreateGraphPieController



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

		if (options.hasOwnProperty('onswitch') && typeof options.onswitch === 'function') {
			this.onswitch = options.onswitch;
		}

		options = options || {};
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
} // Factory:CreateLLYSwitcherController
