//(AD(mod 19)*11)mod 30
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

//The original function, not personal work
function easter(){
    //Reading year from user
    var y = parseInt(document.getElementById("year").value);
    //Lunar Cycle
    var luncyc = y%19;
    //Bitshifting year
    var bit = y >> 2;
    var floor = Math.floor(bit/25+1);
    var d = (floor*3) >> 2;
    var e = ((luncyc*19) - Math.floor((floor*8+5)/25) + d + 15) % 30;
    e += (29578 - luncyc - e * 32) >> 10;
    e -= ((y%7) + bit - d + e + 2) % 7;
    d = e >> 5;
    var date = e - d * 31;
    var month = "April";
    if(d + 3 == 3){
        month = "March";
    }

    document.getElementById('modernEasterCalculation').innerHTML = "In the current Calendar, Easter falls on the " + ordinal_suffix_of(date) + " of " + month + ", " + y + ".";
    document.getElementById('oldEasterCalculation').innerHTML = "If we were to consider the old Calendar, then Easter falls on the " + ordinal_suffix_of(date-13) + " of " + month + ", " + y + ".";
}

// Gauss' Easter Algorithm - Derived from original by Taidgh Murray
function tMurrayEaster(){
    var y = parseInt(document.getElementById("year").value);



    var lunarCyc = y%19;
    var leapCyc = y%4;
    var weekDay = y%7;
    var century = Math.floor(y/100);
    var leapException = Math.floor(century/4);

    var lunarCorrectionValue = Math.floor((13 + 8*century)/25);
    var lunarCorrection = (15 + century - lunarCorrectionValue - leapException)%30;
    var solarCorrection = (4 + century - leapException)%7;

    var lunar14Gap = ((19 * lunarCyc) + lunarCorrection)%30;
    var easterSunday = (2*leapCyc + 4*weekDay + 6*lunar14Gap + solarCorrection)%7;

    var easterDate = 22 + easterSunday + lunar14Gap;
    var easterMonth = "March";

    if (easterDate>31){
        easterMonth = "April";
        easterDate =  easterSunday + lunar14Gap - 9;
    }

    if(easterSunday == 6 && lunar14Gap == 29){
        easterMonth = "April";
        easterDate = 19;
    }

    if(easterSunday == 6 && lunar14Gap == 28 && lunarCyc>10){
        easterMonth = "April";
        easterDate = 18;
    }

    document.getElementById('modernEasterCalculation').innerHTML = "In the current Calendar, Easter falls on the " + ordinal_suffix_of(easterDate) + " of " + easterMonth + ", " + y + "(Catholic Date).";
    if(y < 1582){
        document.getElementById('modernEasterCalculation').innerHTML = "In year " + y + " does not exist in the Gregorian Calendar.";
    }

}

function tMurrayEasterJulian(){
    var y = parseInt(document.getElementById("year").value);

    var lunarCyc = y%19;
    var leapCyc = y%4;
    var weekDay = y%7;

    var lunarCorrection = 15;
    var solarCorrection = 6;

    var lunar14Gap = ((19 * lunarCyc) + lunarCorrection)%30;
    var easterSunday = (2*leapCyc + 4*weekDay + 6*lunar14Gap + solarCorrection)%7;

    var easterDate = 22 + easterSunday + lunar14Gap;
    var easterMonth = "March";

    if (easterDate>31){
        easterMonth = "April";
        easterDate =  easterSunday + lunar14Gap - 9;
    }

    if(easterSunday == 6 && lunar14Gap == 29){
        easterMonth = "April";
        easterDate = 19;
    }

    if(easterSunday == 6 && lunar14Gap == 28 && lunarCyc>10){
        easterMonth = "April";
        easterDate = 18;
    }

    document.getElementById('julianEaster').innerHTML = "In the Julian Calendar, Easter falls on the " + ordinal_suffix_of(easterDate) + " of " + easterMonth + ", " + y + "(Orthodox Date).";
}
