const MEAS_INTERVAL = 60000; // 60 sec
const UPDATE_INTERVAL = 1000; // 1 sec
const INTEGRATE_COEFF = MEAS_INTERVAL / UPDATE_INTERVAL;


class KeySpeedometer {
	_speed;
	_timeInit;
	_numKeys;
	_intervalId;

	constructor() {
		this._numKeys = 0;
		this._speed = 0;
	}

	run() {
		this._timeInit = new Date();
		this._intervalId = setInterval(() => this.calcSpeed(), UPDATE_INTERVAL);
	}

	destruct() {
		clearInterval(this._intervalId);
	}

	updateSpeed(numKeys) {
		this._numKeys = numKeys;
	}

	calcSpeed() {
		const currentTime = new Date();
		const timeDiff = (currentTime - this._timeInit) / 1000;  //in sec
		this._speed = Math.floor(this._numKeys / timeDiff * INTEGRATE_COEFF );
	}

	get speed() {
		return this._speed;
	}

}

export default KeySpeedometer;
