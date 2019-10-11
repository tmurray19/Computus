// Define a boolean variable to change whether user wants simplifed or detailed calculations
var simplified = true;
var just_values = false;
var dionysius_year;

// Weekday accessed in multiple places
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

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
function easterDate(simplified, just_values, dionysius_year=0){
    //parseInt is required, otherwise the value is read as a string
    var y = parseInt(document.getElementById("year").value);
    if(!(isNaN(y)) || dionysius_year != 0){

        if(dionysius_year != 0){
            y = dionysius_year;
        }
        

        // This is the index of the year in the dionysian table
        var dionysius_index = (y%19)+1;

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

        // Return just the values
        // I'm lazy and don't want to rewrite the whole code
        if(just_values){
            // return index of all values
            return [dionysius_index, indiction, epact, concurrent, luncyc, l14, easterFullMoonMonth, pascMoon, lunAge];
        }


        if(simplified){
            document.getElementById('date').innerHTML = old + newD;
        }
        else{
            var dion_ind = y + " is the " + ordinal_suffix_of(dionysius_index) + " year in the Dionysian Table. <br/>";
            document.getElementById('dion_ind').innerHTML = dion_ind;

            var ind = y + " is the " +  ordinal_suffix_of(indiction) + " Indiction. <br/>";
            document.getElementById('ind').innerHTML = ind;

            var ep = "The age of the Moon on the 22nd of March (the Epact) is " + epact + '. <br/>';
            document.getElementById('ep').innerHTML = ep;

            var con = "The 24th of March (the Concurrent) is a "+ (weekday[concurrent-1]) + ". <br/>";
            document.getElementById('con').innerHTML = con;

            var lc = y + " is the " + ordinal_suffix_of(luncyc) + " year of the 19-year Lunar Cycle. <br/>";
            document.getElementById('lc').innerHTML = lc;

            var eFullMoon = "The Full Moon that determines Easter falls on the " + ordinal_suffix_of(l14) + " of " + easterFullMoonMonth + ' (a ' + weekday[pascMoon-1] + '). <br/>';
            document.getElementById('eFullMoon').innerHTML = newD;

            var lun = "The Lunar Age is " + lunAge + '. <br/>';
            document.getElementById('lun').innerHTML = lun;

            document.getElementById('date').innerHTML = old + newD;
        }
    }else{
        document.getElementById('date').innerHTML = "Please enter a year.";
    }
}


function generate_easter_table(){
    let year_loop;
    //let dion_table = "<table><tr><th>Year</th><th>Index</th><th>Indiction</th><th>Epact</th><th>Year</th><th>Year</th><th>Year</th><th>Year</th><th>Year</th><th>Year</th></tr></table>";
    let table = document.getElementById('table');
    //document.getElementById('dion').innerHTML = dion_table;
    for (year_loop = 532; year_loop<626; year_loop++){
        // Get values
        let table_filler = easterDate(simplified=true, just_values=true, dionysius_year=year_loop);

        // Define each value
        let dionysius_index = table_filler[0];
        let indiction = table_filler[1];
        let epact = table_filler[2];
        let concurrent = table_filler[3];
        let luncyc = table_filler[4];
        let l14 = table_filler[5];
        let easterFullMoonMonth = table_filler[6];
        let pascMoon = table_filler[7];
        let lunAge = table_filler[8];

        // Create a row and cell for each value
        let row = table.insertRow();  
        row.id = year_loop;      
        let year_cell = row.insertCell();
        let dionysius_index_cell = row.insertCell();            
        let indiction_cell = row.insertCell();
        let epact_cell = row.insertCell();
        let concurrent_cell = row.insertCell();
        let luncyc_cell = row.insertCell();
        let l14_cell = row.insertCell();
        let easterFullMoonMonth_cell = row.insertCell();
        let pascMoon_cell = row.insertCell();
        let lunAge_cell = row.insertCell();

        // Fill cells with values
        year_cell.innerHTML = year_loop;
        dionysius_index_cell.innerHTML = dionysius_index;
        indiction_cell.innerHTML = indiction;
        epact_cell.innerHTML = epact;
        concurrent_cell.innerHTML = concurrent;
        luncyc_cell.innerHTML = luncyc;
        l14_cell.innerHTML = l14;
        easterFullMoonMonth_cell.innerHTML = easterFullMoonMonth;
        pascMoon_cell.innerHTML = pascMoon;
        lunAge_cell.innerHTML = lunAge;
        
        
    }
}