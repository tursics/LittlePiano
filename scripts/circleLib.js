// ---------------------------------------------------------------------------------------
// all about main circle
// ---------------------------------------------------------------------------------------

function CircleLib()
{
	this.element = null;
	this.buttons = [];
	this.clickCallback = null;
	this.fontSize = 1;

	try {
		this.element = document.createElement('div');
		document.body.appendChild(this.element);

		var circle = this;
		window.addEventListener('resize', function(){
			circle.OnResize();
		}, true);
		this.element.onclick = function() {
			if( null != circle.clickCallback) {
				circle.clickCallback();
			}
		};

		this.create();
		this.init();
	} catch(e) {
		console.log('Circle not ready');
	}
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.create = function()
{
	var element = document.createElement('div');
	element.innerHTML = '<div id="volumePort"><i id="volumeDown1" class="fa fa-volume-down fa-fw"></i><span style="padding:.3em 0;margin:0 .1em;border:solid .06em rgba(255,255,255,0.6);"></span><i id="volumeUp1" class="fa fa-volume-up fa-fw"></i></div>';
	element.innerHTML += '<div id="volumeLand"><i id="volumeUp2" class="fa fa-volume-up fa-fw"></i><hr style="margin:.1em -.2em;border:solid .06em rgba(255,255,255,0.6);"><i id="volumeDown2" class="fa fa-volume-down fa-fw"></i></div>';
	element.style.bottom = '.4em';
	element.style.left = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'volume',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});

	element = document.createElement('div');
	element.innerHTML = '<i class="fa fa-info fa-fw"></i>';
	element.style.bottom = '.4em';
	element.style.left = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'info',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});

	element = document.createElement('div');
	element.innerHTML = '<i class="fa fa-question fa-fw"></i>'; // icon: a winder
	element.style.bottom = '.4em';
	element.style.right = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'help',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});

	element = document.createElement('div');
	element.innerHTML = '<i class="fa fa-lightbulb-o fa-fw"></i>';
	element.style.bottom = '.4em';
	element.style.right = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'light',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});

	element = document.createElement('div');
	element.innerHTML = '<i class="fa fa-eject fa-fw"></i>';
	element.style.bottom = '.4em';
	element.style.right = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'eject',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});

	element = document.createElement('div');
	element.innerHTML = '<i class="fa fa-arrow-up fa-fw"></i>';
	element.style.top = '.4em';
	element.style.right = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'north',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});

	element = document.createElement('div');
	element.innerHTML = '<i class="fa fa-close fa-fw"></i>';
	element.style.top = '.4em';
	element.style.right = '.4em';
	document.body.appendChild(element);

	this.buttons.push({
		title: 'close',
		element: element,
		show: false,
		callback: null,
		callback2: null
	});
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.init = function()
{
	this.OnResize();

	this.element.style.position = 'absolute';
	this.element.style.color = '#ffffff';
	this.element.style.zIndex = '10';
	this.element.style.textAlign = 'center';
	this.element.style.webkitTouchCallout = 'none';
	this.element.style.webkitUserSelect = 'none';
	this.element.style.MozUserSelect = 'none';
	this.element.style.msUserSelect = 'none';
	this.element.style.userSelect = 'none';
	this.setGradient();

	for( var i = 0; i < this.buttons.length; ++i) {
		var element = this.buttons[i].element;

		element.style.display = 'none';
		element.style.opacity = '0';
		element.style.filter = 'alpha(opacity=100)';
		element.style.position = 'absolute';
		element.style.background = 'rgba(255,255,255,.2)';
		element.style.color = '#ffffff';
		element.style.zIndex = '11';
		element.style.textAlign = 'center';
		element.style.webkitTouchCallout = 'none';
		element.style.webkitUserSelect = 'none';
		element.style.MozUserSelect = 'none';
		element.style.msUserSelect = 'none';
		element.style.userSelect = 'none';
		element.style.border = 'solid .1em rgba(255,255,255,0.5)';
		element.style.webkitBorderRadius = '3em';
		element.style.MozBorderRadius = '3em';
		element.style.borderRadius = '3em';
		element.style.padding = '.3em .2em';

		var circle = this;
		if( 'volume' == circle.buttons[i].title) {
			document.getElementById('volumeUp1').onclick = function() {
				for( var i = 0; i < circle.buttons.length; ++i) {
					if(( 'volume' == circle.buttons[i].title) && (null != circle.buttons[i].callback)) {
						circle.buttons[i].callback.call(this);
					}
				}
			};
			document.getElementById('volumeUp2').onclick = function() {
				for( var i = 0; i < circle.buttons.length; ++i) {
					if(( 'volume' == circle.buttons[i].title) && (null != circle.buttons[i].callback)) {
						circle.buttons[i].callback.call(this);
					}
				}
			};
			document.getElementById('volumeDown1').onclick = function() {
				for( var i = 0; i < circle.buttons.length; ++i) {
					if(( 'volume' == circle.buttons[i].title) && (null != circle.buttons[i].callback2)) {
						circle.buttons[i].callback2.call(this);
					}
				}
			};
			document.getElementById('volumeDown2').onclick = function() {
				for( var i = 0; i < circle.buttons.length; ++i) {
					if(( 'volume' == circle.buttons[i].title) && (null != circle.buttons[i].callback2)) {
						circle.buttons[i].callback2.call(this);
					}
				}
			};
		} else {
			element.onclick = function() {
				for( var i = 0; i < circle.buttons.length; ++i) {
					var element = circle.buttons[i].element;
					if(( this == element) && (null != circle.buttons[i].callback)) {
						circle.buttons[i].callback.call(this);
					}
				}
			};
		}
	}
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.rotate = function(degree)
{
	function rotateElement(element)
	{
		element.style.webkitTransform = 'rotate('+degree+'deg)';
		element.style.MozTransform = 'rotate('+degree+'deg)';
		element.style.transform = 'rotate('+degree+'deg)';
	}

	rotateElement(this.element);

	for( var i = 0; i < this.buttons.length; ++i) {
		rotateElement( this.buttons[i].element);
	}
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.show = function(title,on,callback,callback2)
{
	for( var i = 0; i < this.buttons.length; ++i) {
		if( this.buttons[i].title == title) {
			this.buttons[i].show = (on == true ? true : false);
			if( this.buttons[i].show) {
				if( undefined === callback) {
					callback = null;
				}
				if( undefined === callback2) {
					callback2 = null;
				}

				this.buttons[i].callback = callback;
				this.buttons[i].callback2 = callback2;
			} else {
				this.buttons[i].callback = null;
				this.buttons[i].callback2 = null;
			}
			break;
		}
	}
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

CircleLib.prototype.textMenu = function(array)
{
	var fontSize = 1;
	var str='';

	if(array.length < 3) {
		str+=this.formatButton(array[0].icon,'circle0');
		str+=this.formatButton(array[1].icon,'circle1');
	} else if(array.length < 4) {
		str+=this.formatButton(array[0].icon,'circle0');
		str+=this.formatButton(array[1].icon,'circle1');
		str+=this.formatButton(array[2].icon,'circle2');
	} else if(array.length == 4) {
		str+='<div style="position:absolute;top:0;left:0;width:100%;margin-top:1.1em;">';
		str+=this.formatButton(array[2].icon,'circle2');
		str+=this.formatButton(array[3].icon,'circle3');
		str+='</div><div style="position:absolute;top:0;left:0;width:100%;margin-top:-1.1em;">';
		str+=this.formatButton(array[0].icon,'circle0');
		str+=this.formatButton(array[1].icon,'circle1');
		str+='</div>';
	} else if(array.length == 5) {
		str+='<div style="position:absolute;top:0;left:0;width:100%;margin-top:1.1em;">';
		str+=this.formatButton(array[2].icon,'circle2');
		str+=this.formatButton(array[3].icon,'circle3');
		str+=this.formatButton(array[4].icon,'circle4');
		str+='</div><div style="position:absolute;top:0;left:0;width:100%;margin-top:-1.1em;">';
		str+=this.formatButton(array[0].icon,'circle0');
		str+=this.formatButton(array[1].icon,'circle1');
		str+='</div>';
	} else if(array.length == 6) {
		str+='<div style="position:absolute;top:0;left:0;width:100%;margin-top:-1.1em;">';
		str+=this.formatButton(array[0].icon,'circle0');
		str+=this.formatButton(array[1].icon,'circle1');
		str+=this.formatButton(array[2].icon,'circle2');
		str+='</div><div style="position:absolute;top:0;left:0;width:100%;margin-top:1.1em;">';
		str+=this.formatButton(array[3].icon,'circle3');
		str+=this.formatButton(array[4].icon,'circle4');
		str+=this.formatButton(array[5].icon,'circle5');
		str+='</div>';
	} else {
		str+='<div style="position:absolute;top:0;left:0;width:100%;margin-top:-2.2em;">';
		str+=this.formatButton(array[0].icon,'circle0');
		str+=this.formatButton(array[1].icon,'circle1');
		str+='</div><div style="position:absolute;top:0;left:0;width:100%;margin-top:0;">';
		str+=this.formatButton(array[2].icon,'circle2');
		str+=this.formatButton(array[3].icon,'circle3');
		str+=this.formatButton(array[4].icon,'circle4');
		str+='</div><div style="position:absolute;top:0;left:0;width:100%;margin-top:2.2em;">';
		str+=this.formatButton(array[5].icon,'circle5');
		str+=this.formatButton(array[6].icon,'circle6');
		str+='</div>';
	}

	var circle=this;
	this.changeContent( function() {
		circle.rotate(0);
		this.textNow(str,fontSize,true);
	},function() {
		for(var i=0;i<array.length;++i) {
			document.getElementById('circle'+i).onclick=array[i].callback;
		}
	});
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.formatButton = function(icon,id)
{
	var fontSize = .8;
	return '<div style="'
	+'display:inline;'
	+'background:rgba(255,255,255,.2);'
	+'-webkit-border-radius:3em;'
	+'-moz-border-radius:3em;'
	+'border-radius:3em;'
	+'padding:.3em .2em;'
	+'border:solid .1em rgba(255,255,255,0.5);'
	+'margin:.2em;'
	+'" id='+id+'><i class="fa fa-'+icon+' fa-fw" style="line-height:inherit;"></i></div>';
}

// ---------------------------------------------------------------------------------------

CircleLib.prototype.textSpinner = function(callback)
{
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

	for( var i = 0; i < this.buttons.length; ++i) {
		this.buttons[i].element.style.fontSize = fontSizeHeight+'px';
	}

	if( x > y) {
		document.getElementById('volumePort').style.display = 'none';
		document.getElementById('volumeLand').style.display = 'block';
	} else {
		document.getElementById('volumeLand').style.display = 'none';
		document.getElementById('volumePort').style.display = 'block';
	}
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
	var buttons = this.buttons;
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

			for( var i = 0; i < buttons.length; ++i) {
				if( !buttons[i].show) {
					buttons[i].element.style.display = 'none';
				}
			}

			next.call(nextThis);
		}

		element.style.opacity = opacity;
		element.style.filter = 'alpha(opacity='+opacity*100+')';

		for( var i = 0; i < buttons.length; ++i) {
			if( !buttons[i].show && (buttons[i].element.style.display != 'none')) {
				buttons[i].element.style.opacity = opacity;
				buttons[i].element.style.filter = 'alpha(opacity='+opacity*100+')';
			}
		}

		opacity-=opacity*0.4;
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
	var buttons = this.buttons;
	var next = this.changeContentStep4;
	var nextThis = this;

	element.style.display = 'block';

	for( var i = 0; i < buttons.length; ++i) {
		if( buttons[i].show) {
			if( buttons[i].element.style.display != 'block') {
				buttons[i].element.style.display = 'block';
			} else {
				buttons[i].show = false;
			}
		}
	}

	var timer = setInterval(function() {
		if(opacity >= 1) {
			clearInterval(timer);
			next.call(nextThis);
		}

		element.style.opacity = opacity;
		element.style.filter = 'alpha(opacity='+opacity*100+')';

		for( var i = 0; i < buttons.length; ++i) {
			if( buttons[i].show) {
				buttons[i].element.style.opacity = opacity;
				buttons[i].element.style.filter = 'alpha(opacity='+opacity*100+')';
			}
		}

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
