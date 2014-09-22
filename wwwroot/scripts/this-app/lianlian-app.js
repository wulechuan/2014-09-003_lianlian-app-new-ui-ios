(function () {
	return false;
	var _fakeHeader = document.querySelector('body > header');
	document.body.removeChild(_fakeHeader);
	delete _fakeHeader;
})();