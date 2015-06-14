// ---------------------------------------------------------------------------------------
// all about main circle
// ---------------------------------------------------------------------------------------

function CircleLib( elementID)
{
	this.element = null;
	this.clickCallback = null;

	try {
		this.element = document.getElementById(elementID);

		var circle = this;
		window.addEventListener('resize', function(){
			circle.OnResize();
		}, true);
		this.element.onclick = function() {
			if( null != circle.clickCallback) {
				circle.clickCallback();
			}
		};

		this.init();
	} catch(e) {
		console.log('Circle not ready');
	}
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.init = function()
{
	this.OnResize();

	this.element.style.position = 'absolute';
	this.element.style.background = 'rgba(0,0,0,.3)';
	this.element.style.zIndex = '10';
	this.element.style.textAlign = 'center';
	this.element.style.webkitTouchCallout = 'none';
	this.element.style.webkitUserSelect = 'none';
	this.element.style.MozUserSelect = 'none';
	this.element.style.msUserSelect = 'none';
	this.element.style.userSelect = 'none';
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.rotate = function(degree)
{
	this.element.style.webkitTransform = 'rotate('+degree+'deg)';
	this.element.style.MozTransform = 'rotate('+degree+'deg)';
	this.element.style.transform = 'rotate('+degree+'deg)';
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.text = function(str,fontSize)
{
	var elementHeight = parseInt(this.element.style.height);
	var lineHeight = parseInt(elementHeight/10*fontSize);

	this.element.innerHTML = str;
	this.element.style.fontSize = lineHeight+'px';
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.click = function(callback)
{
	this.clickCallback = callback;
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.OnResize = function()
{
	var body = document.getElementsByTagName('body')[0];
	var x = window.innerWidth  || document.documentElement.clientWidth  || body.clientWidth;
	var y = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;
	var min = x > y ? y : x;

	this.element.style.top = ((y-min)/2)+'px';
	this.element.style.left = ((x-min)/2)+'px';
	this.element.style.width = min+'px';
	this.element.style.height = min+'px';
	this.element.style.lineHeight = min+'px';
	this.element.style.webkitBorderRadius = min+'px';
	this.element.style.MozBorderRadius = min+'px';
	this.element.style.borderRadius = min+'px';
}

// ---------------------------------------------------------------------------------------
// eof
