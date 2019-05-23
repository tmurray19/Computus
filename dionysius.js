// Define a boolean variable to change whether user wants simplifed or detailed calculations
var simplified = true;

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

//This function calculates the indiction
function easterDate(simplified){
    //parseInt is required, otherwise the value is read as a string
    var y = parseInt(document.getElementById("year").value);
    if(!(isNaN(y))){
        //Creating an array for the days of the week
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        //Indiction calculation
        var indiction = (y+3)%15;
        if(indiction == 0){
            indiction = 15;
        }

        //Epact calculation
        var epact = (((y%19)*11) %30);

        //Concurrent calculation
        var concurrent = Math.floor((y + (y/4) +4)%7);
        if (concurrent == 0){
            concurrent = 7;
        }


        //Lunar Cycle calculation
        var luncyc = ((y-2)%19);
        if (luncyc == 0){
            luncyc = 19;
        }


        //Caluclating the month for the easter full moon
        var easterFullMoonMonth;
        if(epact>15 || epact<5){
            easterFullMoonMonth="April";
        }
        else{
            easterFullMoonMonth="March";
        }
        //document.getElementById('easterFullMoon').innerHTML = "The full moon that determines easter falls on the " + ordinal_suffix_of(l14) + " of " + easterFullMoonMonth + '.';

        //Calculating Lunar 14
        var l14;
        if(easterFullMoonMonth == "April"){
            l14 = (35-epact)%30;
        }
        else{
            l14 = 36-epact;
        }
        //document.getElementById('easterFullMoon').innerHTML = "The Full Moon that determines Easter falls on the " + ordinal_suffix_of(l14) + " of " + easterFullMoonMonth + '(a ' + weekday[pascMoon-1] + ').';

        //Calculating Pascal Moon (& related day)
        var pascMoon;
        if (easterFullMoonMonth=="March"){
            //lunar 14 + concurrent + 4 mod 7
            pascMoon = (l14 + concurrent + 4)%7;
        }
        else{
            pascMoon = (l14 + concurrent)%7;
        }
        if(pascMoon==0){
            pascMoon = 7;
        }
        //document.getElementById('pascalMoon').innerHTML = "The Pascal Moon day is " + pascMoon + ", which is a " + weekday[pascMoon-1] + '.';

        //Calculating Month of Easter
        var eMonth = "March";

        //Calculating date of Easter
        //((l14+(8-pascMoon))%31)
        var eDate = (l14+(8-pascMoon))%31;
        if(eDate == 0){
            eDate = 31;
        }
        if(easterFullMoonMonth == "April"){
            eMonth = "April";
        }
        if(eDate<8){
            eMonth = "April";
        }


        var drift = Math.floor(y/100) - Math.floor(y/400) - 2;

        var modernEDate = eDate+drift;
        var modernEMonth = 'April';
        if(modernEDate > 31){
            modernEDate -= 31;
            if(y>1600){
                modernEMonth = 'May';
            }
        }

        //Calculating Lunar Age
        var lunAge;
        if(easterFullMoonMonth=="March" && eMonth=="April"){
            lunAge = (14 + (31 - l14) + eDate );
        }
        else{
            lunAge = (14 + (eDate - l14));
        }


        var old = "<b>According to Dionysius' Easter Table, the Orthodox Easter falls on the " + ordinal_suffix_of(eDate) + " of " + eMonth + '. <br/>';

        var newD = "The Gregorian Calendar was not widely in use before 1583. </b><br/>";

        if(y>1582){
             newD = "If we were to consider the modern Gregorian calendar, then the Orthodox Easter falls on the " + ordinal_suffix_of(modernEDate) + " of " + modernEMonth + '. </b><br/>';
        }


        if(simplified){
            document.getElementById('date').innerHTML = old + newD;
        }
        else{

          var ind = y + " is the " +  ordinal_suffix_of(indiction) + " Indiction. <br/>";

          var ep = "The age of the Moon on the 22nd of March (the Epact) is " + epact + '. <br/>';

          var con = "The 24th of March (the Concurrent) is a "+ (weekday[concurrent-1]) + ". <br/>";

          var lc = y + " is the " + ordinal_suffix_of(luncyc) + " year of the 19-year Lunar Cycle. <br/>";

          var eFullMoon = "The Full Moon that determines Easter falls on the " + ordinal_suffix_of(l14) + " of " + easterFullMoonMonth + ' (a ' + weekday[pascMoon-1] + '). <br/>';

          var lun = "The Lunar Age is " + lunAge + '. <br/>';

          document.getElementById('date').innerHTML = ind + ep+ con + lc + eFullMoon + old + newD + lun;
        }
    }else{
        document.getElementById('date').innerHTML = "Please enter a year.";
    }
}
