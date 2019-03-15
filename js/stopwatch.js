function Stopwatch(elem) {
	var interval;
	var prevTime;
	var usedTime = 0;



	function update() {
		usedTime += getDiff();
		let ttlTime = usedTime > 5400 ? usedTime - 5400 : 5400 - usedTime;
		let hours = Math.floor(ttlTime / 3600) % 24;
		let minutes = Math.floor(ttlTime / 60) % 60;
		let seconds = ttlTime % 60;
		elem.timer.textContent = checkSec(hours) + " : " + checkSec(minutes) + " : " + checkSec(seconds);

	}

	function getDiff() {
		let newTime = new Date();
		let date1, date2;
		date1 = new Date(newTime.toLocaleString());
		date2 = new Date(prevTime.toLocaleString());
		let timePassed = Math.abs(date1 - date2) / 1000;
		prevTime = newTime;
		console.log(timePassed);
		return timePassed;

	}

	function checkSec(n) {
		return n > 9 ? "" + n : "0" + n;
	}
	this.isOn = false;

	this.start = function () {
		if (!this.isOn) {

			interval = setInterval(update, 1000);
			prevTime = new Date();
			this.isOn = true;
		}

	};

	this.stop = function () {
		if (this.isOn) {
			clearInterval(interval);
			interval = null;
			this.isOn = false;
		}
	};

	this.reset = function () {
		usedTime = 0;
		elem.timer.textContent = "01 : 30 : 00";
		elem.timer.style.color = "black";
	};

}
