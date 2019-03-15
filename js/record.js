function Record(input) {
	var myRecord = JSON.parse(localStorage.getItem('record'));

	function overBreak() {
		return input.timer.style.color == "red" ? input.timer.textContent : "00 : 00 : 00";
	}

	function addrem() {
		var myRecord = JSON.parse(localStorage.getItem('record'));
		var addRem = {};
		var target = myRecord.rec.length - 1;
		var recentConsume = myRecord.rec[target].consumes;
		addRem.credit = 5400;
		addRem.min = (5400 / 60) % 60;
		addRem.hour = Math.floor((5400 / 60) / 60);
		myRecord.rec[target].remaining.push(addRem);
		localStorage.setItem('record', JSON.stringify(myRecord))
	}

	function consume(breakout) {
		var breakin = new Date();
		var date1, date2;
		date1 = new Date(breakin.toLocaleString());
		date2 = new Date(breakout.toLocaleString());
		var usedTime = Math.abs(date1 - date2) / 1000;
		return usedTime;

	}

	function checkTime(n) {
		return n > 9 ? "" + n : "0" + n;
	}

	function remmin(consumes) {
		var credit = 5400;
		var remainingMins = Math.floor(((credit - consumes) / 60) % 60);
		return input.timer.style.color != "red" ? remainingMins : 00;
	}

	function remhour(consumes) {
		var credit = 5400;
		var remainingHrs = Math.floor(((credit - consumes) / 60) / 60);
		return input.timer.style.color != "red" ? remainingHrs : 00;
	}

	function getTime(today) {
		var time = checkTime(today.getHours()) + ":" + checkTime(today.getMinutes()) + ":" + checkTime(today.getSeconds());
	}

	function formatTime(recentConsumes) {
		var hours = Math.floor(recentConsumes / 3600) % 24;
		var minutes = Math.floor(recentConsumes / 60) % 60;
		var seconds = recentConsumes % 60;
		var usedBreak = checkTime(hours) + " : " + checkTime(minutes) + " : " + checkTime(seconds);
		return usedBreak;

	}

	function formatDate(recentDate) {
		var viewDate = new Date(recentDate);
		var hours = viewDate.getHours();
		var minutes = viewDate.getMinutes();
		var seconds = viewDate.getSeconds();
		return recentDate != '' ? checkTime(hours) + " : " + checkTime(minutes) + " : " + checkTime(seconds) : "00 : 00 : 00";

	}

	function checkDatePicker() {
		let today = new Date();
		return input.datePicker.value == '' ? today.toLocaleDateString() : input.datePicker.value;
	}


	//Create Record
	this.create = function () {
		var obj = {};
		obj.rec = [];
		var myRecord = JSON.stringify(obj);
		var setItem = localStorage.setItem('record', myRecord);
	};

	//Add for Record
	this.add = function () {
		var myRecord = JSON.parse(localStorage.getItem('record'));
		var newRecord = {};
		newRecord.date = checkDatePicker();
		newRecord.breaks = [];
		newRecord.consumes = 00;
		newRecord.remaining = [];
		newRecord.ob = overBreak();
		myRecord.rec.push(newRecord);
		localStorage.setItem('record', JSON.stringify(myRecord));
		addrem();
	};

	//Update Record in Breaking Out
	this.breakout = function () {
		var timer2 = input.timer.textContent.split("");
		var myRecord = JSON.parse(localStorage.getItem('record'));
		var addBreakOut = {};
		var dateOut = new Date();
		var target = myRecord.rec.length - 1;
		addBreakOut.breakout = dateOut.toLocaleString();
		addBreakOut.breakin = "";
		addBreakOut.consume = 00;
		myRecord.rec[target].breaks.push(addBreakOut);
		localStorage.setItem('record', JSON.stringify(myRecord));
	}

	//Update Record in Breaking In
	this.breakin = function () {
		var timer2 = input.timer.textContent.split("");
		var myRecord = JSON.parse(localStorage.getItem('record'));
		var dateIn = new Date();
		var target = myRecord.rec.length - 1;
		var target2 = myRecord.rec[target].breaks.length - 1;
		var recentConsume = myRecord.rec[target].consumes;
		var getBreakOut = myRecord.rec[target].breaks[target2].breakout;
		myRecord.rec[target].consumes = checkTime(consume(getBreakOut) + parseInt(recentConsume));
		myRecord.rec[target].breaks[target2].breakin = dateIn.toLocaleString();
		myRecord.rec[target].breaks[target2].consume = consume(getBreakOut);
		myRecord.rec[target].remaining[0].min = checkTime(remmin(checkTime(consume(getBreakOut) + parseInt(recentConsume))));
		myRecord.rec[target].remaining[0].hour = checkTime(remhour(checkTime(consume(getBreakOut) + parseInt(recentConsume))));
		myRecord.rec[target].ob = overBreak();
		localStorage.setItem('record', JSON.stringify(myRecord));
		input.remaining.textContent = "Remaining: " + myRecord.rec[target].remaining[0].hour + ":" + myRecord.rec[target].remaining[0].min;
	}

	//Load Data to Table
	this.load = function () {
		var myRecord = JSON.parse(localStorage.getItem('record'));
		var date = input.datePicker.value;
		input.breaksList.innerHTML = '';
		var lastRec = myRecord.rec.length - 1;
		for (let z in myRecord.rec) {
			for (let w in myRecord.rec[z]) {
				if (w == "date" && myRecord.rec[z].date == date) {
					for (let x in myRecord.rec[z].breaks) {
						let row = document.createElement('tr');
						for (let y in myRecord.rec[z].breaks[x]) {
							let cell = document.createElement('td');
							let celltext = document.createTextNode(myRecord.rec[z].breaks[x][y]);
							if (y == "consume") {
								cell.textContent = formatTime(celltext.textContent);
							} else {
								cell.textContent = formatDate(celltext.textContent);
							}

							row.appendChild(cell);
						}
						input.breaksList.appendChild(row);
					}
					input.consumetxt.textContent = formatTime(myRecord.rec[z].consumes);
				}
			}
		}


	}



	this.delete = function () {};

	this.ob = function () {};
}
