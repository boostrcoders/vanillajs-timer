var startBreak = document.querySelector('#start'),
	stopBreak = document.querySelector('#stop');
var hour = 0, min = 0, sec = 0;
var myTime = setInterval(myClock, 1000);
	startBreak.addEventListener('click', ()=>{myTime});
	stopBreak.addEventListener('click', ()=>{clearTimeout(myTime);console.log('test');});


function myClock() {
	sec++;
	if (sec == 3){
		min++;
		sec = 0;
		if (min == 3){
			hour++;
			min = 0;
		}
	}
    document.getElementById("demo").innerHTML =
    checkSec(hour) + ":" + checkSec(min) + ":" + checkSec(sec);

}
function checkSec(n){
	return n > 9 ? "" + n: "0" + n;
}

function stopClock() {
    clearInterval(myClock);f
}