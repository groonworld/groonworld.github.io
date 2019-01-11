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
    let workdays = 5;
    
    return {
        salaryCalc: function(input) {   
            
            // 1. Check if user input is present and is a number
            if (!isNaN(input.monatsgehalt) && 
                !isNaN(input.wochenstunden) &&
                input.monatsgehalt !== '' &&
                input.wochenstunden !== '') {
                
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
        },
        
        customConvert: function(price, dailyHrs) {
            
            let fullMin = price / 60;
            let minutes = price % 60;
            let hours = Math.floor(fullMin % dailyHrs);
            let days = Math.floor(fullMin / dailyHrs);
                                    
            return {
                days: days,
                hours: hours,
                minutes: minutes
            }                
        }
    }
})();


/********************************************
 *    UI CONTROLLER Module                  *
 *******************************************/

let publish = (function() {
    
    let currency = {
        money: '&nbsp;&euro;',
    };
    
    return {  
        /******* Common functions ********/
        toggleElement: function(elementID, action) {  // 'action' must be either 'hide' or 'show'
            
            let element = document.getElementById(elementID);
            
            if (action === 'hide') {
                element.style.display = "none";
            } else if (action === 'show') {
                element.style.display = "block";
            } else {
                console.log('ui.toggleElement() has received invalid argument of ' + action);
            }
        },

        getInput: function() {
            return {
                monatsgehalt: Number(document.querySelector('.input_gehalt').value.replace(',','.')),
                wochenstunden: Number(document.querySelector('.input_stunden').value.replace(',','.')),
            }
        },
        
        update: function(salary, items, prices) {    // Prints all the results to the user interface
            
            document.getElementById('value_day').innerHTML = salary.dSalary.toFixed(2);
            document.getElementById('value_hr').innerHTML = salary.hrSalary.toFixed(2);
            //document.getElementById('value_quart').innerHTML = salary.quartSalary.toFixed(2);
            document.getElementById('value_min').innerHTML = salary.minSalary.toFixed(2);
            
            document.getElementById('cappuccino').textContent = prices.cappuccino;
        },
        
        getCustom: function() {
            return Number(document.querySelector('.input_custom').value.replace(',','.'));
        },
        
        updateCustom: function(obj) {
            // pad(); converts numbers to a string and padds numbers below 10 with a leading zero (3 --> '03').
            let pad = function(number) {
                return (number < 10) ? '0' + number.toString() : number.toString();
            };
            // Displays the resulting strings in the UI
            document.getElementById('custom_days').textContent = pad(obj.days);
            document.getElementById('custom_hours').textContent = pad(obj.hours);
            document.getElementById('custom_minutes').textContent = pad(obj.minutes);
        }
    }
})();


/********************************************
 *    GLOBAL APP CONTROLLER Module          *
 *******************************************/

let controller = (function(calc, ui){

    let dailyHrs; // See comment in calculate().
    const data = {
        workdays: 5,
        input: {},
        salary: {},
        prices: {},
        items: {                     
            cappuccino: 5,                          
            custom: -1,
        }
    };
    
    function hasInput() {
        // Calls either calculate() or custom(), depending on which fields have input.
        let input_gehalt = document.querySelector('.input_gehalt').value !== '';        //
        let input_stunden = document.getElementById('input_stunden').value !== '';      // TRUE if fields contain input
        let input_custom = document.getElementById('input_custom').value !== '';        //            
        
        if ((input_gehalt || input_stunden) && !input_custom) {
            calculate(); 
        } else if (input_custom) {
            custom();
        } else {
            console.log('Insufficient user input.')
        };
    } 
    
    function setUpEventListeners() {
        
        document.getElementById('calculate_btn').addEventListener('click', calculate);
        document.getElementById('btn_custom_calc').addEventListener('click', custom);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13){ // KeyCode 13 is the "Enter"-key
                hasInput();  // Checks which fields have input and calls either calculate() or custom() accordingly.
            }
        });
    }
    
    function calculate() {
        
        // 1. Get initial user input
        data.input = ui.getInput();
        data.input.dailyHrs = data.input.wochenstunden / data.workdays;
        dailyHrs = data.input.dailyHrs;  // Can't seem to base a calculation on a property within the same object as it is being created. Surely there must be a better way than this workaround.
        
        // 2. Calculate salary values
        data.salary = calc.salaryCalc(data.input);  
        
        // 3. Calculate value for cappuccino example
        data.prices.cappuccino = calc.coffeePrice(data);
        
        // 4. Update and display cappuccino example
        ui.update(data.salary, data.items, data.prices);
        ui.toggleElement('output_cappuccino', 'show');
        
        // 5. Reveal the next section
        ui.toggleElement('output_custom', 'show');
        
    }
    
    function custom() {
        
        // 1. Get user input from "custom" field
        data.items.custom = ui.getCustom();
        
        // 2. Calculate custom price in minutes
        data.prices.custom = calc.customPrice(data);
        
        // 2a. Convert custom price to DD:HH:MM-format
        data.prices.convertedCustom = calc.customConvert(data.prices.custom, data.input.dailyHrs);
        
        // 3. Update and display converted custom price
        ui.updateCustom(data.prices.convertedCustom);
        
        // 4. Reveal the next section
        ui.toggleElement('output_hours', 'show');
        
    }
    
    return {
        init: function() {
            
            // 1. Hide results section
            ui.toggleElement('output_cappuccino', 'hide');
            ui.toggleElement('output_custom', 'hide');
            ui.toggleElement('output_hours', 'hide');
            
            // 2. Setup Event Listeners
            setUpEventListeners();
        },
        /*** FOR TESTING ONLY *****
        logData: function() {
            console.log(data);
        }
        /*** FOR TESTING ONLY ****/
    }
})(numberCruncher, publish);

controller.init();






/***************************************************
*               Some useless stuff:                *
***************************************************/

/*
// This won't work. If the user de-selects the input field before pressing the 'enter' key, neither condition is met.
// A better idea is to check for contents (fieldContent ! = '' ) in all fields, and then select action based on that.

function activeElement() {
    // Calls either calculate() or custom(), depending on which element is active
    let input_gehalt = document.activeElement.tagName === 'input_gehalt';
    let input_stunden = document.activeElement.tagName === 'input_stunden';
    let input_custom = document.activeElement.tagName === 'input_custom'; 
    console.log(input_gehalt);
    console.log(input_stunden);
    console.log(input_custom);
    
    if (input_gehalt || input_stunden) {
        return calculate;
    } else if (input_custom) {
        return custom;
    } else {
        console.log('No input element active.')
    };
}  */


















