// ---------------------------------------------------------------------------------------
// all about main circle
// ---------------------------------------------------------------------------------------

function CircleLib( elementID)
{
	this.element = null;
	this.clickCallback = null;
	this.fontSize = 1;

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
//	this.element.style.background = 'rgba(0,0,0,.3)';
	this.element.style.color = '#ffffff';
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

CircleLib.prototype.text = function(str,fontSize,callback)
{
	this.changeContent( function() {
		this.textNow(str,fontSize,true);
	},callback);
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.textNow = function(str,fontSize,hide)
{
	this.fontSize = fontSize;

	var elementHeight = parseInt(this.element.style.height);
	var fontSizeHeight = parseInt(elementHeight/10*this.fontSize);

	if( undefined === hide) {
		hide = false;
	}

	if( hide) {
		this.element.innerHTML = '<div style="display:none;opacity:0;filter:alpha(opacity=100);">'+str+'</div>';
	} else {
		this.element.innerHTML = '<div>'+str+'</div>';
	}
	this.element.style.fontSize = fontSizeHeight+'px';
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.textIcon = function(icon,callback)
{
	this.text('<i class="fa fa-'+icon+'" style="line-height:inherit;"></i>',2,callback);
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.textSpinner = function(callback)
{
//	this.text('<i class="fa fa-spinner fa-spin" style="line-height:inherit;"></i>',2,callback);
	this.text('<i class="fa fa-spinner fa-pulse" style="line-height:inherit;"></i>',2,callback);
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
	min *= .85;

	var fontSizeHeight = parseInt(min/10*this.fontSize);

	this.element.style.top = ((y-min)/2)+'px';
	this.element.style.left = ((x-min)/2)+'px';
	this.element.style.width = min+'px';
	this.element.style.height = min+'px';
	this.element.style.lineHeight = min+'px';
	this.element.style.webkitBorderRadius = min+'px';
	this.element.style.MozBorderRadius = min+'px';
	this.element.style.borderRadius = min+'px';
	this.element.style.fontSize = fontSizeHeight+'px';

	this.setGradient();
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.setGradient = function()
{
	var innerColor = 'rgba(0,0,0,0)';
	var borderColor = 'rgba(0,0,0,.2)';
	var outerColor = 'rgba(0,0,0,.05)';
	var frameColor = 'rgba(255,255,255,.1)';
	var innerPos = '54.5%';
	var borderPos = '55%';
	var outerPos = '61%';
	var frame1Pos = '65.5%';
	var frame2Pos = '66%';

	// old browsers
	this.element.style.background = innerColor;

	// firefox 3.6+
	this.element.style.background = '-moz-radial-gradient(center, ellipse cover,'+innerColor+' 0%,'+innerColor+' '+innerPos+','+borderColor+' '+borderPos+','+outerColor+' '+outerPos+','+outerColor+' '+frame1Pos+','+frameColor+' '+frame2Pos+','+frameColor+' 100%)';

	// chrome10+ and safari5.1+
	this.element.style.background = '-webkit-radial-gradient(center, ellipse cover,'+innerColor+' 0%,'+innerColor+' '+innerPos+','+borderColor+' '+borderPos+','+outerColor+' '+outerPos+','+outerColor+' '+frame1Pos+','+frameColor+' '+frame2Pos+','+frameColor+' 100%)';

	// opera 12+
	this.element.style.background = '-o-radial-gradient(center, ellipse cover,'+innerColor+' 0%,'+innerColor+' '+innerPos+','+borderColor+' '+borderPos+','+outerColor+' '+outerPos+','+outerColor+' '+frame1Pos+','+frameColor+' '+frame2Pos+','+frameColor+' 100%)';

	// ie10+
	this.element.style.background = '-ms-radial-gradient(center, ellipse cover,'+innerColor+' 0%,'+innerColor+' '+innerPos+','+borderColor+' '+borderPos+','+outerColor+' '+outerPos+','+outerColor+' '+frame1Pos+','+frameColor+' '+frame2Pos+','+frameColor+' 100%)';

	// modern css
	this.element.style.background = 'radial-gradient(ellipse at center,'+innerColor+' 0%,'+innerColor+' '+innerPos+','+borderColor+' '+borderPos+','+outerColor+' '+outerPos+','+outerColor+' '+frame1Pos+','+frameColor+' '+frame2Pos+','+frameColor+' 100%)';
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.changeContent = function( changeCallback, finishCallback)
{
	this.changeCallback = changeCallback;
	this.finishCallback = finishCallback;

	this.changeContentStep1();
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.changeContentStep1 = function()
{
	var opacity = 1;
	var element = this.element.firstChild;
	var next = this.changeContentStep2;
	var nextThis = this;

	if( '' == this.element.innerHTML) {
		this.changeContentStep2();
		return;
	}

	var timer = setInterval(function() {
		if(opacity <= 0.1) {
			clearInterval(timer);
			element.style.display = 'none';
			next.call(nextThis);
		}

		element.style.opacity = opacity;
		element.style.filter = 'alpha(opacity='+opacity*100+')';
		opacity-=opacity*0.3;
	},50);
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.changeContentStep2 = function()
{
	this.element.innerHTML = '';

	this.changeCallback.call(this);

	this.changeContentStep3();
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.changeContentStep3 = function()
{
	var opacity = 0.1;
	var element = this.element.firstChild;
	var next = this.changeContentStep4;
	var nextThis = this;

	element.style.display = 'block';
	var timer = setInterval(function() {
		if(opacity >= 1) {
			clearInterval(timer);
			next.call(nextThis);
		}

		element.style.opacity = opacity;
		element.style.filter = 'alpha(opacity='+opacity*100+')';
		opacity+=opacity*0.1;
	},10);
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.changeContentStep4 = function()
{
	this.finishCallback.call(this);
}

// ---------------------------------------------------------------------------------------
// eof
