//latercus.js
//Implementation of Latercus easter table used in Ireland & UK
//Formula & Program by Taidgh Murray

// Creating epact list
// This can definitely be automted, but I can't think of a way of
// Automating is right now
var epact = [];
var feria = [];

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

//This function stops non integer values being input
function allowNumbersOnly(e) {
    //This checks the corresponding keyCode value for each e passed through it
    var code = (e.which) ? e.which : e.keyCode;
    if (code > 31 && (code < 48 || code > 57)) {
        e.preventDefault();
    }
}
//For Calculating ordinal suffix (th, rd, nd)
function ordinal_suffix_of(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

// Resets 0 fer to 7
function reset(feria_val){
    if(feria_val==0){
        return 7;
    }
    else{
        return feria_val;
    }
}


// Function to fill feria and epact arrays with appropriate values
// This would be painful to calculate dynamically
// But is probably possible
// Worth looking at in the future
function arrayFiller(){
    for(var i = 0; i<84; i++){
        if(i==0){
            epact.push(20);
            feria.push(7);
        }
        else{
            var incrementer = 11;
            if(i%14==0){
                incrementer = 12;
            }
            var next_epact = (epact[epact.length-1]+incrementer)%30;
            if(next_epact == 0){
                next_epact = 30;
            }
            epact.push(next_epact);
            var x = 1;

            // This is the same as saying if the year is divisible by 4
            if((i+1)%4==0){
                x=2;
            }
            var f = reset((feria[feria.length - 1] + x)%7);
            feria.push(f);
        }
    }
}


// For calculating the index of the year
// In the 84 year cycle
function indexer(year){
    var idx = (year-17)%84;
    if(idx==0){
        idx=84;
    }
    return idx;
}

function negativeMod(n,m){
    return ((n % m) + m) % m;
}

// For calculating the Feria (day of) March 1st
function marchFeria(fer, year){
    // if it's a leap year, february has 29 days
    var feb = 28;
    if(year%4==0){
        feb = 29;
    }

    // adding from Jan 1st to March 1st
    var march_feria = reset((fer + 31 + feb) % 7);
    return march_feria;
}

// calculates feria on march 31st
function march31stFeria(fer){
    fer = reset((fer+30)%7);
    return fer;
}


// gives the date and month of Easter
// Also gives related lune
function easterDetermine(day, ep, year){
    ep = ep%30;
    if(ep==0){
        ep = 30;
    }
    if(indexer(year) == 75){
        ep = 14;
    }
    if(indexer(year)== 10){
        ep = 19;
    }
    var epact = ". Its epact is " + ep + ".</br>";
    var month = " of March";
    if(day>31){
        day -= 31;
        month = " of April";
    }

    return " according to the Latercus Easter Table, Easter falls on the " + ordinal_suffix_of(day) + month + epact;
}

// Gives date and month of Initium
// Also gives related lune
function initiumDetermine(day, year, ep){
    ep = negativeMod((ep-40), 30);
    var epact = ". Its epact is " + ep + ".</br>";
    var feb = 28;
    if (year%4==0){
        feb = 29;
    }
    var month = " of March";
    var init = day - 39;

    if(init<=0){
        month = " of February";
        init = feb - -init;
    }

    return "The Initium falls on " + ordinal_suffix_of(init) + month + epact;
}

// moves to next sunday in calendar
function moveToSunday(fer){
    if(fer==1){
        return 0;
    }
    else{
        return 8-fer;
    }
}

function getDayofFeria(fer){
    return weekday[fer - 1];
}


function tMurrayLatercusTableFormula(simplified){
    // Gets year from html doc
    var y = parseInt(document.getElementById("year").value);
    // If the user entered a year
    if(!(isNaN(y))){
        // generate epacts
        arrayFiller();

        // get index from year, minus 1 to work with arrays
        var id = indexer(y) - 1;
        // get epact from list
        var ep = epact[id];

        // Calcuating ferias for Jan & Mar 1st
        var jan_fer = feria[id];
        var march_fer = marchFeria(jan_fer, y);


        var epact_for_year = "The Epact for the year (both January 1st & March 1st), " + y + " is " + (ep-1) +". The value we use for calculation is incremeted by one.</br>";

        var jan_feria = "The Feria for January's Epact is " + jan_fer + " (a " + getDayofFeria(jan_fer) + ").</br>";
        var mar_feria = "The Feria for March's Epact is " + march_fer + " (a " + getDayofFeria(march_fer) + ").</br></br>";

        // Algorithm works as follows:

        // Combine March & April into one month
        var day_of_march = 1;

        // Initialise these variables for more detailed printout
        // These can be safely ignored if you're reading the source code

        var begin = "We begin at March 1st. For the calculation, take March & April to be one, 61 day long month.</br>";
        var easter_date = "";

        // Apologies for the terrible variable names, but
        // Given how the code is written
        // I don't think giving them meaningful names would help understanding
        var a = "";
        var b = "";
        var c = "";
        var d = "";
        var e = "";
        var f = "";
        var g = "";
        var h = "";
        var i = "";

        var easter_sunday = "";
        var initium = "";
        var final_answer = "";
        // If the Epact is smaller than 14:
        if(ep<14){
            a = "Epact is less than 14.</br>";
            // Increment day of march by 30, to move to the end of the month & set feria as day
            b = "Easter cannot fall in March if Epact is less than 14, so we move 30 days to the next lunar cycle.</br>";
            day_of_march += 30;
            march_fer = march31stFeria(march_fer);
            c = "Feria on March 31st is " + march_fer + " (a " + getDayofFeria(march_fer) + "). Epact is the same value at " + ep + ".</br>";

            // Get distance from epact to full moon
            var epact_filler = 14 - ep;
            d = "We move ahead " + epact_filler+ " days to find our next Full Moon.</br>";

            // Add the days of march to the epact filler to move to the full moon
            day_of_march += epact_filler;

            // set march feria as full moon in april
            march_fer = reset((march_fer + epact_filler)%7);
            e = "Our 'Days of March' is now " + day_of_march + ". Our feria is " + march_fer +" (a " + getDayofFeria(march_fer) + ").</br>";

            // Move to the sunday in MarchApril
            day_of_march += moveToSunday(march_fer);
            easter_sunday = "Moving forward " + moveToSunday(march_fer) +  " days, we see that Easter Sunday now falls on day " + day_of_march + " of March. In Calendar Terms:</br>";

            // Determine if Easter is in April or March and return answer
            easter_date = easterDetermine(day_of_march, (ep+(day_of_march - 31)), y);
            initium = initiumDetermine(day_of_march, y, (ep+(day_of_march - 31)) );
        }
        // If Epact IS 14
        if(ep==14){
            a = "Epact is 14.</br>";
            // Increment day of march by 30, to move to the end of the month & set feria as day
            b = "Easter cannot fall in March if Epact 14, so we move ahead 30 days to the next lunar cycle.</br>";
            day_of_march += 30;
            march_fer = march31stFeria(march_fer);
            c = "Feria on March 31st is " + march_fer + " (a " + getDayofFeria(march_fer) + "). This is our full moon, so all we need to do is look for the next Sunday.</br>";

            day_of_march += moveToSunday(march_fer);
            easter_sunday = "Easter Sunday now falls on day " + day_of_march + " of March. In Calendar Terms:</br>";

            easter_date = easterDetermine(day_of_march, (ep + moveToSunday(march_fer)), y);
            initium = initiumDetermine(day_of_march, y, (ep + moveToSunday(march_fer)) );
        }
        // If Epact is greater than 14
        if(ep>14){
            a = "Epact is greater than 14.</br>";
            // Get distance between epact and new cycle
            var reset_epact = 30 - ep;

            var easterEpact;

            // Get distance to next Luanr 14 in cycle
            var get_to_14 = reset_epact + 14;
            b = "We get the distance from our current Epact of " + ep + " & find the total number of days to get to the next Full Moon, " + get_to_14 + " days.</br>";

            // Move march date to next lunar 14
            day_of_march += get_to_14;
            c = "Our next Full Moon is on day " + day_of_march + " of March.</br>";

            // Get feria on this March date
            march_fer = reset((march_fer + get_to_14)%7);
            d = "Feria for this day is " + march_fer + " (a " + getDayofFeria(march_fer) + ").</br>";

            // Move to next sunday after full moon
            day_of_march += moveToSunday(march_fer);
            e = "We find our next sunday on day " + day_of_march + " of March.</br>";

            //If this day falls before the 26th, its too early
            if(day_of_march<26){
                f = "But, this Sunday falls before the 26th, so we must look for the next viable Sunday.</br>";

                // Gets Epact on date that's too early
                var too_early_moon_age = moveToSunday(march_fer) + 14;

                // Define feria as 7, as the date that's too early will always be a Sunday
                var too_early_feria = 7;
                g = "The Epact on this Sunday is " + too_early_moon_age + ".</br>";

                // Reset the lunar cycle once more
                var too_early_moon_age_reset = 30 - too_early_moon_age;

                // Move to the following full moon
                var get_to_next_14 = too_early_moon_age_reset + 14;

                // Move the date up to coencide with the lunar movement above
                day_of_march += get_to_next_14;

                // Get the feria on this date
                march_fer = reset((too_early_feria + get_to_next_14)%7);
                h = "So, we reset the lunar cycle once more. Move forward " + (get_to_next_14 - 1) + " days to the next Full Moon on day " + (day_of_march - 1) + " of March, with a feria of " + march_fer + " (a " + getDayofFeria(march_fer) + ").</br>";

                // Move to next Sunday after full moon
                day_of_march += moveToSunday(march_fer) - 1;
                i = "Finally, the Sunday that occurs after this Full Moon is on day " + day_of_march + " of March.</br>";
                easterEpact = too_early_moon_age + get_to_next_14 + (moveToSunday(march_fer));

            }else{
                easter_sunday = "easter_sunday: We find our next Sunday on day " + day_of_march + " of March. This is acceptable within the Latercus rules of when Easter should fall.</br>";
                easterEpact = ep + get_to_14 + moveToSunday(march_fer);
            }


            // Define date
            initium = initiumDetermine(day_of_march, y, easterEpact);
            easter_date = easterDetermine(day_of_march, easterEpact, y);

        }

        final_answer = "<b>On the year " + y + easter_date;
        if(simplified){
            document.getElementById('date').innerHTML = final_answer;
        }
        else{
            document.getElementById('date').innerHTML = begin + epact_for_year + jan_feria + mar_feria + a + b + c + d + e + f + g + h + i +easter_sunday + initium + final_answer;
        }
    }else{
        document.getElementById('date').innerHTML = "Please enter a year.";
    }
}
