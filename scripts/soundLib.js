// ---------------------------------------------------------------------------------------
// all about sounds
// inspired by http://www.html5rocks.com/en/tutorials/webaudio/intro/
// ---------------------------------------------------------------------------------------

// Init soundLib
//	var sound = new SoundLib();

// Is Web Audio API supported in this browser? Returns true if it is supported, false if
// it is not supported
//	sound.isOk();

// Load list of sound assets asynchronously. If another instance of loadAssets() is
// running this function does nothing. If all sound assets loaded the callback function
// will be called
//	sound.loadAssets(['sound1.mp3','sound2.mp3'], function() {});

// Get the current time
//	var startTime = sound.getCurrentTime() + 0.100;

// Play a sound sample. Set the number of the sample to play and the start time (default
// is immediately)
//	sound.play(0);
//	sound.play(0, sound.getCurrentTime() + 0.100);

// Get the volume of an asset. Initial state is 1.0
//	sound.getVolume(asset);

// Set the volume of an asset. From 0.0 to 1.0
//	sound.setVolume(asset, 0.5);

// Get the speed (playback rate) of an asset. 1.0 is normal speed
//	sound.getSpeed(asset);

// Set the speed (playback rate) of an asset. 1.0 is normal speed, 2.0 double speed,
// -1.0 is backwards normal speed (not fully supported yet)
//	sound.setSpeed(asset, 0.5);

// ---------------------------------------------------------------------------------------

function SoundLib()
{
	this.WEBAUDIOAPI = 1;
	this.AUDIOELEMENT = 2;
	this.NOAUDIO = 3;

	this.support = this.NOAUDIO;
	this.context = null;
	this.loadAssetUrlList = [];
	this.loadAssetDataList = [];
	this.loadCallback = null;
	this.loadCount = 0;

	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = new AudioContext();
		this.support = this.WEBAUDIOAPI;
	} catch(e) {
		console.log('Web Audio API not supported');

		var audio = document.createElement('audio');
		if( '' != audio.canPlayType('audio/mpeg')) {
			this.support = this.AUDIOELEMENT;
		} else {
			console.log('HTML Audio Element does not support mp3');
		}
	}
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.isOk = function()
{
	return this.support != this.NOAUDIO;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.loadAssets = function(assetList, callback)
{
	if( !this.isOk()) {
		console.error('SoundLib not ready');
		return;
	}
	if( 0 != this.loadAssetUrlList.length) {
		console.error('SoundLib load assets already');
		return;
	}

	this.loadAssetUrlList = assetList;
	this.loadCallback = callback;
	this.loadAssetDataList = new Array();
	this.loadCount = 0;

	if( 0 != this.loadAssetUrlList.length) {
		for(var i = 0; i < this.loadAssetUrlList.length; ++i) {
			if( this.WEBAUDIOAPI == this.support) {
				this.loadAssetAudioAPI(this.loadAssetUrlList[i], i);
			} else if( this.AUDIOELEMENT == this.support) {
				this.loadAssetAudioElement(this.loadAssetUrlList[i], i);
			} else {
				console.error('Unknown audio');
			}
		}
	} else {
		this.loadCallback();
	}
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.play = function(number, time)
{
	if( !this.isOk()) {
		console.error('SoundLib not ready');
		return;
	}
	if( number >= this.loadAssetDataList.length) {
		console.error('Play not existing asset', number);
		return;
	}

	if( this.WEBAUDIOAPI == this.support) {
		var source = this.context.createBufferSource();
		if(!source.start) {
			source.start = source.noteOn;
		}
		if(!source.stop) {
			source.stop = source.noteOff;
		}

		source.buffer = this.loadAssetDataList[number];

		if( typeof time == "undefined") {
			source.start(0);
		} else {
			source.start(time);
		}

		var gainNode = this.context.createGain();
		source.connect(gainNode);
		gainNode.connect(this.context.destination);

		return {
			source: source,
			gainNode: gainNode
		};
	} else if( this.AUDIOELEMENT == this.support) {
		var audio = document.getElementById(this.loadAssetDataList[number]);
		audio.play();

		if( typeof time != "undefined") {
			console.error('Time parameter ignored');
		}

		return {
			source: audio,
		};
	} else {
		console.error('Unknown audio');
	}

	return {
		source: null,
		gainNode: null
	};
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.getVolume = function(asset)
{
	if( this.WEBAUDIOAPI == this.support) {
		return asset.gainNode.gain.value;
	} else if( this.AUDIOELEMENT == this.support) {
		return asset.source.volume;
	} else {
		console.error('Unknown audio');
	}

	return 1;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.setVolume = function(asset, value)
{
	if( this.WEBAUDIOAPI == this.support) {
		asset.gainNode.gain.value = value;
	} else if( this.AUDIOELEMENT == this.support) {
		asset.source.volume = value;
	} else {
		console.error('Unknown audio');
	}
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.getSpeed = function(asset)
{
	if( this.WEBAUDIOAPI == this.support) {
		return asset.source.playbackRate.value;
	} else if( this.AUDIOELEMENT == this.support) {
		return asset.source.playbackRate;
	} else {
		console.error('Unknown audio');
	}

	return 1;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.setSpeed = function(asset, value)
{
	if( value < 0.01) {
		value = 0.01;
	}

	if( this.WEBAUDIOAPI == this.support) {
		asset.source.playbackRate.value = value;
	} else if( this.AUDIOELEMENT == this.support) {
		asset.source.playbackRate = value;
	} else {
		console.error('Unknown audio');
	}
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.getCurrentTime = function()
{
	if( !this.isOk()) {
		console.error('SoundLib not ready');
		return 0;
	}

	return this.context.currentTime;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.setCurrentTime = function(timestamp)
{
	if( !this.isOk()) {
		console.error('SoundLib not ready');
		return 0;
	}

	this.context.currentTime = timestamp;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.getDuration = function(asset)
{
	if( !this.isOk()) {
		console.error('SoundLib not ready');
		return 0;
	}

	return asset.source.buffer.duration;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.loadAssetAudioAPI = function(url, index)
{
	var loader = this;

	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		loader.context.decodeAudioData(request.response, function(buffer) {
			if(!buffer) {
				console.error('Error decoding file data: ' + url);
			}
			loader.loadAssetDataList[index] = buffer;
			if(++loader.loadCount == loader.loadAssetUrlList.length) {
				loader.loadAssetUrlList = [];
				loader.loadCallback();
			}
		}, function(error) {
			console.error('Decode audio data error', error);
		});
	};
	request.onerror = function() {
		console.error('SoundLib: XHR error');
	};
	request.send();
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.loadAssetAudioElement = function(url, index)
{
	var loader = this;

	var audioElement = document.createElement('audio');
	audioElement.id = 'audio' + index;
	audioElement.innerHTML = '<source src="' + url + '" type="audio/mpeg">';
	audioElement.preload = 'auto';
	audioElement.addEventListener('canplaythrough', function() {
		loader.loadAssetDataList[index] = this.id;
		if(++loader.loadCount == loader.loadAssetUrlList.length) {
			loader.loadAssetUrlList = [];
			loader.loadCallback();
		}
	});
	audioElement.onerror = function() {
		console.error('SoundLib: loading error');
	};
	document.body.appendChild(audioElement);
}

// ---------------------------------------------------------------------------------------
// eof
