// ---------------------------------------------------------------------------------------
// all about compass
// ---------------------------------------------------------------------------------------

// Init compassLib
//	var compass = new CompassLib();

// Is Web Audio API supported in this browser? Returns true if it is supported, false if
// it is not supported
//	compass.isOk();

// Watch the compass and get continued feedback of changes in degrees
//	compass.watch( function( degrees) {});

// Remove the watch callback
//	compass.unwatch();

// ---------------------------------------------------------------------------------------

function CompassLib()
{
	this.PHONEGAP = 1;
	this.WEBKITCOMPASS = 2;
	this.DEVICEORIENTATION = 3;
	this.NOCOMPASS = 4;

	this.support = this.NOCOMPASS;
	this.watcher = null;
	this.detectCompass = null;
	this.gpsDegree = 0;
	this.gpsDiff = 0;
	this.initing = false;

	try {
		if( navigator.compass) {
			this.support = this.PHONEGAP;
		} else if( window.DeviceOrientationEvent) {
			this.support = this.DEVICEORIENTATION;
			this.initing = 0;

			var watch = this;
			this.detectCompass = function(event) {
				++watch.initing;

				if( typeof event.webkitCompassHeading != "undefined") {
					watch.support = watch.WEBKITCOMPASS;
//				} else if(( typeof event.alpha != "undefined") && navigator.geolocation) {
				} else if( watch.initing == 1 ) {
					return;
				}

				watch.initing = false;
				watch.gpsDegree = -event.alpha;
				window.removeEventListener( 'deviceorientation', watch.detectCompass);
			};

			window.addEventListener( 'deviceorientation', this.detectCompass);
		} else {
			console.log('Compass does not supported');
		}
	} catch(e) {
		console.log('Compass does not supported');
	}
}

// ---------------------------------------------------------------------------------------

CompassLib.prototype.isOk = function()
{
	return this.support != this.NOCOMPASS;
}

// ---------------------------------------------------------------------------------------

CompassLib.prototype.resetNorth = function()
{
	this.gpsDiff = 0;
}

// ---------------------------------------------------------------------------------------

CompassLib.prototype.setNorth = function()
{
	this.gpsDiff = -this.gpsDegree;
}

// ---------------------------------------------------------------------------------------

CompassLib.prototype.watch = function( callback)
{
	this.watcher = null;
	var watch = this;

	if( this.PHONEGAP == this.support) {
		this.watcher = navigator.compass.watchHeading( function( degrees) {
			degrees += watch.gpsDiff;
			if( watch.gpsDegree != degrees) {
				watch.gpsDegree = degrees;
				callback( parseInt( watch.gpsDegree));
			}
		});
	} else if( this.WEBKITCOMPASS == this.support) {
		this.watcher = function( event) {
			var degrees = event.webkitCompassHeading + watch.gpsDiff;

			if( watch.gpsDegree != degrees) {
				watch.gpsDegree = degrees;
				callback( parseInt( watch.gpsDegree));
			}
		};
		window.addEventListener( 'deviceorientation', this.watcher);
	} else if( this.DEVICEORIENTATION == this.support) {
		this.watcher = function( event) {
			var degrees = -event.alpha + watch.gpsDiff;
			if( degrees < 0) {
				degrees += 360;
			} else if( degrees >= 360) {
				degrees -= 360;
			}

			if( watch.gpsDegree != degrees) {
				watch.gpsDegree = degrees;
				callback( parseInt( watch.gpsDegree));
			}
		};
		window.addEventListener( 'deviceorientation', this.watcher);
	}
}

// ---------------------------------------------------------------------------------------

CompassLib.prototype.unwatch = function()
{
	if( this.PHONEGAP == this.support) {
		navigator.compass.clearWatch( this.watcher);
	} else if( this.WEBKITCOMPASS == this.support) {
		window.removeEventListener( 'deviceorientation', this.watcher);
	} else if( this.DEVICEORIENTATION == this.support) {
		window.removeEventListener( 'deviceorientation', this.watcher);
	}
	delete this.watcher;
	this.watcher = null;
}

// ---------------------------------------------------------------------------------------
// eof
