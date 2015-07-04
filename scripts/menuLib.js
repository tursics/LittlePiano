// ---------------------------------------------------------------------------------------
// the complete menu structure
// ---------------------------------------------------------------------------------------

// Init MenuLib
//	var menu = new MenuLib();

// ---------------------------------------------------------------------------------------

function MenuLib(background,circle,compass,sound)
{
	this.thresholdMin = 1;
	this.thresholdMax = 1.4;
	this.thresholdScratchMin = 10;
	this.thresholdScratchMax = 50;

	this.background = background;
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

MenuLib.prototype.showPlay = function(image)
{
	var menu = this;

	menu.circle.show('volume',true,menu.volumeUp,menu.volumeDown);

//	menu.circle.show('light',true,function() {
//		menu.circle.show('volume',false);
//		menu.circle.show('light',false);
//		menu.circle.show('eject',false);
//		menu.circle.show('pause',false);
//
//		menu.showLight(image,false);
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

	menu.circle.image(image,function() {
	});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showScratch = function(image)
{
	var menu = this;

	menu.circle.show('volume',true,menu.volumeUp,menu.volumeDown);

//	menu.circle.show('light',true,function() {
//		menu.circle.show('volume',false);
//		menu.circle.show('light',false);
//		menu.circle.show('north',false);
//		menu.circle.show('eject',false);
//
//		menu.showLight(image,true);
//	});

//	if( menu.compass.isOk()) {
//		menu.circle.show('north',true,function() {
//			menu.compass.setNorth();
//		});
//	}

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

		menu.background.setTheme(menu.background.RED);

		menu.showMain();
	});

//	menu.circle.text('Rotate your device',.8,function() {
//	});
	menu.circle.image(image,function() {
	});
}

// ---------------------------------------------------------------------------------------

MenuLib.prototype.showSoundFiles = function(scratch)
{
	var menu = this;

	function playAsset() {
		var image=this.children[0].src;

		menu.circle.show('close',false);

		menu.mainSound = menu.sound.play(0);
		menu.mainSound.source.loop = true;

		if(scratch) {
			menu.sound.setSpeed(menu.mainSound,0);

			menu.initScratch();
			menu.showScratch(image);
		} else {
			menu.sound.setSpeed(menu.mainSound,1);

			menu.showPlay(image);
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

MenuLib.prototype.showLight = function(image,scratch)
{
	var menu = this;

	menu.circle.show('close',true,function() {
		menu.circle.show('close',false);

		if( scratch) {
			menu.showScratch(image);
		} else {
			menu.showPlay(image);
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
	var perfectSpeed = false;
	var direction = 1;
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

		var scratch = false;
		var i = slots.length - 1;
		if(( slots[i-0] >  menu.thresholdScratchMin) && (slots[i-0] <  menu.thresholdScratchMax) &&
		    (slots[i-1] < -menu.thresholdScratchMin) && (slots[i-1] > -menu.thresholdScratchMax) &&
		    (slots[i-2] >  menu.thresholdScratchMin) && (slots[i-2] <  menu.thresholdScratchMax))
		{
			scratch = true;
		} else if(( slots[i-0] < -menu.thresholdScratchMin) && (slots[i-0] > -menu.thresholdScratchMax) &&
		           (slots[i-1] >  menu.thresholdScratchMin) && (slots[i-1] <  menu.thresholdScratchMax) &&
		           (slots[i-2] < -menu.thresholdScratchMin) && (slots[i-2] > -menu.thresholdScratchMax))
		{
			scratch = true;
		}

		var speed = sum / slots.length / 10;
		var goodSpeed = false;
		var currentDirection = speed < 0 ? -1 : 1;

		if(scratch) {
			if(( direction == -1) || (direction == 1)) {
				menu.background.setTheme(menu.background.ORANGE);

				if(direction == -1) {
					menu.mainSound.source.stop(0);
					menu.mainSound = menu.sound.play(0);
					menu.mainSound.source.loop = true;
				}
			}
			if( direction > 0) {
				direction = -2;
				menu.sound.setSpeed(menu.mainSound,.8);
			} else {
				direction = 2;
				menu.sound.setSpeed(menu.mainSound,3);
			}

			return;
		} else if(( direction < -1) || (direction > 1)) {
			menu.background.setTheme(menu.background.RED);
			direction = !currentDirection;
		}

		if( direction != currentDirection) {
			direction = currentDirection;
//			var timestamp = menu.sound.getCurrentTime();
//			timestamp = menu.sound.getDuration(menu.mainSound) - timestamp;

			menu.mainSound.source.stop(0);
			menu.mainSound = menu.sound.play(direction<0 ? 1 : 0);
			menu.mainSound.source.loop = true;
//			menu.sound.setValueAtTime(timestamp,menu.sound.setCurrentTime());
		}

		if( speed < 0) {
			speed = -speed;
		}
		if( speed < menu.thresholdMin) {
			menu.sound.setSpeed(menu.mainSound,speed / menu.thresholdMin);
		} else if( speed > menu.thresholdMax) {
			menu.sound.setSpeed(menu.mainSound,speed / menu.thresholdMax);
		} else {
			menu.sound.setSpeed(menu.mainSound,1);
			goodSpeed = true;
		}

		if( perfectSpeed != goodSpeed) {
			perfectSpeed = goodSpeed;
			menu.background.setTheme(perfectSpeed?menu.background.GREEN:menu.background.RED);
		}
	}
}

// ---------------------------------------------------------------------------------------
// eof
