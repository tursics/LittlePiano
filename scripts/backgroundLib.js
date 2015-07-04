// ---------------------------------------------------------------------------------------
// the colorfull background gradient
// ---------------------------------------------------------------------------------------

function BackgroundLib()
{
	this.element = null;

	this.RED = 0;
	this.YELLOW = 1;
	this.GREEN = 2;
	this.CYAN = 3;
	this.ORANGE = 4;
	this.ORANGE2 = 5;

	try {
		this.element = document.getElementsByTagName('body')[0];

		var background = this;
		window.addEventListener('resize', function(){
			background.OnResize();
		}, true);

		this.init();
	} catch(e) {
		console.log('Background not ready');
	}
}

// ---------------------------------------------------------------------------------------

BackgroundLib.prototype.init = function()
{
	this.OnResize();

	this.element.style.fontFamily = 'inglobal';
	this.element.style.overflow = 'hidden';

	this.setTheme(this.RED);
}

// ---------------------------------------------------------------------------------------

BackgroundLib.prototype.setTheme = function(theme)
{
	if(this.YELLOW==theme) {
		this.setGradient('#cc3c82','#fac209');
	} else if(this.GREEN==theme) {
		this.setGradient('#ffc805','#31ab34');
	} else if(this.CYAN==theme) {
		this.setGradient('#26a939','#017ebe');
	} else if(this.ORANGE==theme) {
		this.setGradient('#0d7ab3','#ee4e1e');
	} else if(this.CYAN==theme) {
		this.setGradient('#ee491c','#e38b06');
	} else {
		this.setGradient('#204490','#d0367f');
	}
	// 7: eb9105 ffc702
	// 8: ffcc00 089edd
	// 9: 00a1e5 302b7d
	// 10: 36287f dc6e3d
	// 11: d2783a a4261a
	// 12: 9c2715 243b98
}

// ---------------------------------------------------------------------------------------

BackgroundLib.prototype.OnResize = function()
{
	var body = document.getElementsByTagName('body')[0];
	var w = window.innerWidth  || document.documentElement.clientWidth  || body.clientWidth;
	var h = window.innerHeight || document.documentElement.clientHeight || body.clientHeight;

	this.element.style.height = h+'px';
}

// ---------------------------------------------------------------------------------------

BackgroundLib.prototype.setGradient = function(colorFrom,colorTo)
{
	// old browsers
	this.element.style.background = colorFrom;

	// firefox 3.6+
	this.element.style.background = '-moz-linear-gradient(left,'+colorFrom+' 0%,'+colorTo+' 100%)';

	// chrome and safari4+
	this.element.style.background = '-webkit-gradient(linear,left top,right top,color-stop(0%,'+colorFrom+'),color-stop(100%,'+colorTo+'))';
	// chrome10+ and safari5.1+
	this.element.style.background = '-webkit-linear-gradient(left,'+colorFrom+' 0%,'+colorTo+' 100%)';

	// opera 11.10+
	this.element.style.background = '-o-linear-gradient(left,'+colorFrom+' 0%,'+colorTo+' 100%)';

	// ie10+
	this.element.style.background = '-ms-linear-gradient(left,'+colorFrom+' 0%,'+colorTo+' 100%)';

	// modern css
	this.element.style.background = 'linear-gradient(to right,'+colorFrom+' 0%,'+colorTo+' 100%)';

	// ie6-9
	this.element.style.filter = 'progid:DXImageTransform.Microsoft.gradient( startColorstr="'+colorFrom+'", endColorstr="'+colorTo+'",GradientType=1)';
}

// ---------------------------------------------------------------------------------------
// eof
