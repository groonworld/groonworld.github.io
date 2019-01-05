/* --------------------------------------------------------------------*/
/*  GELD IST ZEIT                                                      */
/*  Copyright 2019 by @groonworld                                      */
/*  Published under MIT License: https://opensource.org/licenses/MIT   */
/* --------------------------------------------------------------------*/

(function() {
    let things = {
        cappuchino: 5,
        cheapCoffee: 1.20,
    };
    
    function setUpEventListeners() {
        document.querySelector('.calculate_btn').addEventListener('click', updateUI);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13){
                updateUI();
            }
        })
    };

    function getInput() {
        return {
            monatsgehalt: Number(document.querySelector('.input_gehalt').value),
            wochenstunden: Number(document.querySelector('.input_stunden').value),
        }
    };

    function calculate() {
        let input = getInput();
        let workdays = 5;
        const month = 52/12;
        return results = {
            hrSalary: input.monatsgehalt / (input.wochenstunden * month),
            dSalary: (input.monatsgehalt / (input.wochenstunden * month)) * (input.wochenstunden / workdays),
            minSalary: input.monatsgehalt / (input.wochenstunden * month) / 60,
            quartSalary: input.monatsgehalt / (input.wochenstunden * month) / 4,
        };
        logAll(input, results);
    };
    
    function coffeePrice(results, things) {
        let unit = ' Minuten';
        return {
            cappuchino: Math.round((things.cappuchino / results.minSalary)) + unit,
            cheapCoffee: Math.round((things.cheapCoffee / results.minSalary)) + unit,
        }
    };
    
    function updateUI() { // Prints all the results to the user interface
        let results = calculate();
        let prices = coffeePrice(results, things);
        let currency = '<span>&nbsp;€</span>';
        document.getElementById('value_day').innerHTML = results.dSalary.toFixed(2) + currency;
        document.getElementById('value_hr').innerHTML = results.hrSalary.toFixed(2) + currency;
        document.getElementById('value_quart').innerHTML = results.quartSalary.toFixed(2) + currency;
        document.getElementById('value_min').innerHTML = results.minSalary.toFixed(2) + currency;
        
        document.getElementById('cappuchino_price').innerHTML = 'Dein geliebter Mandelmilch-Cappuchino (€' + parseFloat(things.cappuchino).toFixed(2) + ') kostet dich <strong>' + prices.cappuchino + '</strong> Arbeitszeit.';
        document.getElementById('coffee_price').innerHTML = 'Der billig-Kaffee aus dem Bahnhofsautomat (€' + parseFloat(things.cheapCoffee).toFixed(2) + ') kostet dich <strong>' + prices.cheapCoffee + '</strong> Arbeitszeit.';

    };
    
    /* ////////////////// FOR TESTING PURPOSES ONLY ///////////////////////////////////////
    function logAll(input, results) {
        console.log('MonatsNettoGehalt: ' + input.monatsgehalt.toFixed(2) + '€');
        console.log('Wochenstunden: ' + input.wochenstunden.toFixed(2) + '€');
        console.log(' ');
        console.log('Tagesverdienst: ' + results.dSalary.toFixed(2) + '€');
        console.log('Stundenlohn: ' + results.hrSalary.toFixed(2) + '€');
        console.log('Viertelstundenlohn: ' + results.quartSalary.toFixed(2) + '€');
        console.log('Minutenlohn: ' + results.minSalary.toFixed(2) + '€');
    }; //////////////// FOR TESTING PURPOSES ONLY ////////////////////////////////////// */

    setUpEventListeners();
})();
