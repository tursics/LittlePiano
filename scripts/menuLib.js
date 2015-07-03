// ---------------------------------------------------------------------------------------
// the complete menu structure
// ---------------------------------------------------------------------------------------

// Init MenuLib
//	var menu = new MenuLib();

// ---------------------------------------------------------------------------------------

function MenuLib(circle,compass,sound)
{
	this.circle = circle;
	this.compass = compass;
	this.sound = sound;
	this.mainSound = null;

	try {
	} catch(e) {
		console.log('Menu does not supported');
	}
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showMain = function()
{
	var menu = this;
	var menuArray=new Array(
	{
		icon:'play',
		callback:function() {
			menu.circle.show('info',false);
			menu.circle.show('help',false);

			menu.showSoundFiles(false);
		}
	},
	{
		icon:'rotate',
		callback:function() {
			menu.circle.show('info',false);
			menu.circle.show('help',false);

			menu.showSoundFiles(true);
		}
	});

	menu.circle.show('info',true,function() {
		menu.circle.show('info',false);
		menu.circle.show('help',false);

		menu.showInfo();
	});

	menu.circle.show('help',true,function() {
		menu.circle.show('info',false);
		menu.circle.show('help',false);

		menu.showHelp();
	});

	menu.circle.textMenu(menuArray);
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showPlay = function()
{
	var menu = this;

	menu.circle.show('volume',true,menu.volumeUp,menu.volumeDown);

//	menu.circle.show('light',true,function() {
//		menu.circle.show('volume',false);
//		menu.circle.show('light',false);
//		menu.circle.show('eject',false);
//		menu.circle.show('pause',false);
//
//		menu.showLight(false);
//	});

	menu.circle.show('eject',true,function() {
		menu.circle.show('volume',false);
		menu.circle.show('light',false);
		menu.circle.show('eject',false);
		menu.circle.show('pause',false);

		menu.mainSound.source.stop(0);

		menu.showMain();
	});

	menu.circle.show('pause',true,function() {
		// to do: pause the music
	});

//	menu.circle.image('assets/2001-1085.jpg',function() {
//	});
	menu.circle.image('assets/2014-1328.jpg',function() {
	});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showScratch = function()
{
	var menu = this;

	menu.circle.show('volume',true,menu.volumeUp,menu.volumeDown);

//	menu.circle.show('light',true,function() {
//		menu.circle.show('volume',false);
//		menu.circle.show('light',false);
//		menu.circle.show('north',false);
//		menu.circle.show('eject',false);
//
//		menu.showLight( true);
//	});

	if( menu.compass.isOk()) {
		menu.circle.show('north',true,function() {
			menu.compass.setNorth();
//			menu.circle.textNow( menu.compass.gpsDiff, 1, false);
		});
	}

	menu.circle.show('eject',true,function() {
		menu.circle.show('volume',false);
		menu.circle.show('light',false);
		menu.circle.show('north',false);
		menu.circle.show('eject',false);

		menu.mainSound.source.stop(0);

		if( menu.compass.isOk()) {
			menu.compass.resetNorth();
			menu.compass.unwatch();
		}

		menu.showMain();
	});

	menu.circle.text('Rotate your device',.8,function() {
	});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showSoundFiles = function(scratch)
{
	var menu = this;

	function playAsset() {
		menu.circle.show('close',false);

		menu.mainSound = menu.sound.play(0);
		menu.mainSound.source.loop = true;

		if(scratch) {
			menu.sound.setSpeed(menu.mainSound,0);

			menu.initScratch();
			menu.showScratch();
		} else {
			menu.sound.setSpeed(menu.mainSound,1);

			menu.showPlay();
		}
	}

	var menuArray=new Array(
	{
		image:'assets/2001-1085.jpg',
		callback:playAsset
	},
	{
		image:'assets/2001-843.jpg',
		callback:playAsset
	},
	{
		image:'assets/2004-396.jpg',
		callback:playAsset
	},
	{
		image:'assets/2006-488.jpg',
		callback:playAsset
	},
	{
		image:'assets/2006-489.jpg',
		callback:playAsset
	},
	{
		image:'assets/2006-506.jpg',
		callback:playAsset
	},
	{
		image:'assets/2014-1328.jpg',
		callback:playAsset
	}
	);

	menu.circle.show('close',true,function() {
		menu.circle.show('close',false);
		menu.showMain();
	});

	menu.circle.textMenu(menuArray);
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showInfo = function()
{
	var menu = this;

	menu.circle.show('close',true,function() {
		menu.circle.show('close',false);
		menu.showMain();
	});

	menu.circle.text('Some infos about "Little Piano"...',.5,function() {});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showHelp = function()
{
	var menu = this;

	menu.circle.show('close',true,function() {
		menu.circle.show('close',false);
		menu.showMain();
	});

	menu.circle.text('Rotate your device to change the speed of the music',.3,function() {});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showLight = function(scratch)
{
	var menu = this;

	menu.circle.show('close',true,function() {
		menu.circle.show('close',false);

		if( scratch) {
			menu.showScratch();
		} else {
			menu.showPlay();
		}
	});

	menu.circle.text('No Philips Hue found (to be done)',.5,function() {
	});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.volumeUp = function()
{
	var volume = menu.sound.getVolume(menu.mainSound);

	if( volume < .9) {
		volume += .1;
	} else {
		volume = 1;
	}

	menu.sound.setVolume(menu.mainSound,volume);
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.volumeDown = function()
{
	var volume = menu.sound.getVolume(menu.mainSound);

	if( volume > .1) {
		volume -= .1;
	} else {
		volume = 0;
	}

	menu.sound.setVolume(menu.mainSound,volume);
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.initScratch = function()
{
	var menu = this;

	if( !menu.compass.isOk()) {
		return;
	}

	menu.compass.setNorth();
	menu.compass.watch( function( degrees) {
		menu.circle.rotate( -degrees);
	});

	var slots = [0,0,0,0,0,0,0,0,0,0];
	var lastDegree = menu.compass.gpsDegree;
	var timer = setInterval( function() {
		speedTimer();
	}, 100);

	function speedTimer() {
		var diff = lastDegree - menu.compass.gpsDegree;
		if( diff > 90) {
			diff -= 360;
		} else if( diff < -90) {
			diff += 360;
		}
		lastDegree = menu.compass.gpsDegree;

		var sum = 0;
		for( var i = 1; i < slots.length; ++i) {
			slots[i-1] = slots[i];
			sum += slots[i];
		}
		slots[slots.length-1] = diff;
		sum += diff;

		var speed = sum / slots.length / 10;
		if( speed < 0) {
			menu.sound.setSpeed(menu.mainSound,0);
//			menu.circle.textNow(speed,1);
		} else if( speed < 0.8) {
			menu.sound.setSpeed(menu.mainSound,speed);
//			menu.circle.textNow(speed,1);
		} else if( speed > 1.2) {
			menu.sound.setSpeed(menu.mainSound,speed);
//			menu.circle.textNow(speed,1);
		} else {
			menu.sound.setSpeed(menu.mainSound,1);
//			menu.circle.textNow(speed,1);
		}

	}
}

// ---------------------------------------------------------------------------------------
// eof
