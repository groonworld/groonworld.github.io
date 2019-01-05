/* GELD IST ZEIT by @groonworld, Jan 2019 */


var setUpEventListeners = function() {
	document.querySelector('.calculate_btn').addEventListener('click', calculate);
	document.addEventListener('keypress', function(event) {
		if (event.keyCode === 13 || event.which === 13){
			calculate();
		}
	})
};

var getInput = function() {
	return {
		monatsgehalt: parseFloat(document.querySelector('.input_gehalt').value),
		wochenstunden: parseFloat(document.querySelector('.input_stunden').value),
	}
};

var calculate = function() {
	var input, results;

	input = getInput();
	results = {
		hrSalary: input.monatsgehalt / (input.wochenstunden * 4.3333),
		dSalary: (input.monatsgehalt / (input.wochenstunden * 4.3333)) * (input.wochenstunden / 5),
		minSalary: input.monatsgehalt / (input.wochenstunden * 4.3333) / 60,
        quartSalary: input.monatsgehalt / (input.wochenstunden * 4.3333) / 4,
	};

	// logAll(input, results);
    updateUI(results);
};

var logAll = function(input, results) {
	console.log('MonatsNettoGehalt: ' + input.monatsgehalt.toFixed(2) + '€');
	console.log('Wochenstunden: ' + input.wochenstunden.toFixed(2) + '€');
	console.log(' ');
	console.log('Tagesverdienst: ' + results.dSalary.toFixed(2) + '€');
	console.log('Stundenlohn: ' + results.hrSalary.toFixed(2) + '€');
    console.log('Viertelstundenlohn: ' + results.quartSalary.toFixed(2) + '€');
	console.log('Minutenlohn: ' + results.minSalary.toFixed(2) + '€');
}

var updateUI = function(results) {
    document.getElementById('value_day').innerHTML = results.dSalary.toFixed(2) + '<span>&nbsp;€</span>';
    document.getElementById('value_hr').innerHTML = results.hrSalary.toFixed(2) + '<span>&nbsp;€</span>';
    document.getElementById('value_quart').innerHTML = results.quartSalary.toFixed(2) + '<span>&nbsp;€</span>';
    document.getElementById('value_min').innerHTML = results.minSalary.toFixed(2) + '<span>&nbsp;€</span>';
}
// 1 Jahr  = 52 Wochen
// 1 Monat = 4.333 Wochen


setUpEventListeners();
