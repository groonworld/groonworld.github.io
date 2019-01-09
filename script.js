/* --------------------------------------------------------------------*/
/*  GELD IST ZEIT                                                      */
/*  Copyright 2019 by @groonworld                                      */
/*  Published under MIT License: https://opensource.org/licenses/MIT   */
/* --------------------------------------------------------------------*/


/********************************************
 *    CALCULATOR Module                     *
 *******************************************/

let numberCruncher = (function() {  

    const currency = '&euro';
    const unit = ' Minuten'
    return {
        salaryCalc: function(input) {   
            if (!isNaN(input.monatsgehalt) && 
                !isNaN(input.wochenstunden) &&
                input.monatsgehalt !== '' &&
                input.wochenstunden !== '') {
                let workdays = 5;
                const month = 52/12;
                
                return {
                    hrSalary: input.monatsgehalt / (input.wochenstunden * month),
                    dSalary: (input.monatsgehalt / (input.wochenstunden * month)) * (input.wochenstunden / workdays),
                    minSalary: input.monatsgehalt / (input.wochenstunden * month) / 60,
                    quartSalary: input.monatsgehalt / (input.wochenstunden * month) / 4
                }
            } else {
                console.log('Function salaryCalc() received NaN input.')
            }
        },
    
        coffeePrice: function(data) {
            return Math.round(data.items.cappuccino / data.salary.minSalary) + unit;
        },
        
        customPrice: function(data) {
            return Math.round(data.items.custom / data.salary.minSalary);
        }
    }
})();


/********************************************
 *    UI CONTROLLER Module                  *
 *******************************************/

let publish = (function() {
    
    let currency = {
        money: '<span>&nbsp;&euro;</span>',
        time: '<span>&nbsp;min</span>' 
    };
    
    return {          
        removeElement: function(elementId) {    // Removes an element from the document
            let element = document.getElementById(elementId);
            element.parentNode.removeChild(element);
        },

        getInput: function() {
            return {
                monatsgehalt: Number(document.querySelector('.input_gehalt').value.replace(',','.')),
                wochenstunden: Number(document.querySelector('.input_stunden').value.replace(',','.')),
            }
        },
        
        getCustom: function() {
            return Number(document.querySelector('.input_custom').value.replace(',','.'));
        },
        
        update: function(salary, items, prices) {    // Prints all the results to the user interface
            
            document.getElementById('value_day').innerHTML = salary.dSalary.toFixed(2) + currency.money;
            document.getElementById('value_hr').innerHTML = salary.hrSalary.toFixed(2) + currency.money;
            document.getElementById('value_quart').innerHTML = salary.quartSalary.toFixed(2) + currency.money;
            document.getElementById('value_min').innerHTML = salary.minSalary.toFixed(2) + currency.money;
            
            document.getElementById('output').insertAdjacentHTML('afterbegin', '<div class="row" id="cappuccino_display"><div id="cappuccino_price"><p>Dein geliebter <span>' + items.cappuccino + '&euro;-Mandelmilch-Cappuchino</span> kostet dich <span>' + prices.cappuccino + '</span> deiner Arbeitszeit.</p></div></div>');
        },
            
        revealCustomResult: function(prices) {
            document.getElementById('value_custom').innerHTML = prices.custom + currency.time;
        }    
    }
})();


/********************************************
 *    GLOBAL APP CONTROLLER Module          *
 *******************************************/

let controller = (function(calc, ui){
    //console.log('Setting up Controller module.');
    const data = {
        input: {},
        salary: {},
        prices: {},
        items: {                     
            cappuccino: 5,                          
            custom: -1,
        }
    };
    
    function setUpEventListeners() {
        
        document.getElementById('calculate_btn').addEventListener('click', calculate);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13){ // KeyCode 13 is the "Enter"-key
                calculate() 
            }
        });
        document.getElementById('btn_custom_calc').addEventListener('click', custom);

    }
    
    function calculate() {
        
        data.input = ui.getInput();
        data.salary = calc.salaryCalc(data.input);      
        data.prices.cappuccino = calc.coffeePrice(data);
        
        ui.removeElement('cappuccino_display');
        ui.update(data.salary, data.items, data.prices);
        console.log(data);
    }
    
    function custom() {
        data.items.custom = ui.getCustom();
        data.prices.custom = calc.customPrice(data);
        ui.revealCustomResult(data.prices);
    }
    
    return {
        init: function() {
            setUpEventListeners();
        },
        
        addCustomData: function(number) {
            data.items.custom = number;
        },
    }
})(numberCruncher, publish);

controller.init();























