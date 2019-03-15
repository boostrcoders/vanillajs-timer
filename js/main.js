window.onload = () => {
	let input = {
		timer: document.querySelector('#timer'),
		toggleBtn: document.querySelector('#toggle'),
		resetBtn: document.querySelector('#reset'),
		breaksList: document.querySelector('#breaks-list'),
		consumetxt: document.querySelector('#consumetxt'),
		remaining: document.querySelector('#remaining'),
		datePicker: document.querySelector('#datepicker')
	};

	var watch = new Stopwatch(input);
	var rec = new Record(input);


	// Check db
	if ('record' in localStorage) {} else {
		rec.create();
	}

	input.toggleBtn.addEventListener('click', function () {

		if (input.toggleBtn.textContent == "Start") {
			watch.start();
			rec.add();
			rec.breakout();
			rec.load();
			input.toggleBtn.textContent = "Pause";
		} else {
			if (watch.isOn) {
				watch.stop();
				rec.breakin();
				rec.load();
				input.toggleBtn.textContent = "Continue";
				if (timer.style.color == "red") {
					input.toggleBtn.disabled = true;
					input.toggleBtn.textContent = "Over Break";
				}

			} else {
				watch.start();
				rec.breakout();
				rec.load();
				input.toggleBtn.textContent = "Pause";
			}
		}
	});

	input.resetBtn.addEventListener('click', function () {
		watch.reset();
		input.timer = document.querySelector('#timer');
		input.toggleBtn.textContent = "Start";
		input.consumetxt.textContent = "00 min/s";
		input.toggleBtn.disabled = false;


	});

	input.datePicker.addEventListener('change', function () {
		rec.load();

	});

};
