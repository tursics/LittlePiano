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


// ---------------------------------------------------------------------------------------

function SoundLib()
{
	this.context = null;
	this.loadAssetUrlList = [];
	this.loadAssetDataList = [];
	this.loadCallback = null;
	this.loadCount = 0;

	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = new AudioContext();
	} catch(e) {
		console.error('Web Audio API not supported');
	}
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.isOk = function()
{
	return null != this.context;
}

// ---------------------------------------------------------------------------------------

SoundLib.prototype.loadAssets = function(assetList, callback)
{
	if( !this.isOk()) {
		console.error('SoundLib not ready');
		return;
	}
	if( 0 != this.loadAssetUrlList.length) {
		console.error('SoundLib loaded assets already');
		return;
	}

	this.loadAssetUrlList = assetList;
	this.loadCallback = callback;
	this.loadAssetDataList = new Array();
	this.loadCount = 0;

	if( 0 != this.loadAssetUrlList.length) {
		for(var i = 0; i < this.loadAssetUrlList.length; ++i) {
			this.loadAssetBuffer(this.loadAssetUrlList[i], i);
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

//	var gainNode = {};
//	source.connect(this.context.destination);

	return {
		source: source,
		gainNode: gainNode
	};
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

SoundLib.prototype.loadAssetBuffer = function(url, index)
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
	}
	request.onerror = function() {
		console.error('SoundLib: XHR error');
	}
	request.send();
}

// ---------------------------------------------------------------------------------------
// eof
