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