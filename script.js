/* --------------------------------------------------------------------*/
/*  GELD IST ZEIT                                                      */
/*  Copyright 2019 by @groonworld                                      */
/*  Published under MIT License: https://opensource.org/licenses/MIT   */
/* --------------------------------------------------------------------*/

(function() {  
    
    let items = {                      // Will soon be expanded to include a range of everyday items people tend 
        cappuchino: 5,                  // to spend a lot of money on without thinking much about it.
        custom: -1,                     // "custom" will allow for calculations based on a user-defined price tag.
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
    
    function coffeePrice(results, items) {
        let unit = ' Minuten';
        return {
            cappuchino: Math.round((items.cappuchino / results.minSalary)) + unit,
        }
    };
    
    function updateUI() { // Prints all the results to the user interface
        let results = calculate();
        let prices = coffeePrice(results, items);
        let currency = '<span>&nbsp;€</span>';
        document.getElementById('value_day').innerHTML = results.dSalary.toFixed(2) + currency;
        document.getElementById('value_hr').innerHTML = results.hrSalary.toFixed(2) + currency;
        document.getElementById('value_quart').innerHTML = results.quartSalary.toFixed(2) + currency;
        document.getElementById('value_min').innerHTML = results.minSalary.toFixed(2) + currency;
        
        document.getElementById('cappuchino_price').innerHTML = '<p>Dein geliebter ' + items.cappuchino + '&euro;-Mandelmilch-Cappuchino kostet dich <span>' + prices.cappuchino + '</span> deiner Arbeitszeit.</p>';
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
