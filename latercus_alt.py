# 1 = Sunday




# Dabhi paper version of latercus
year = []
index = []
easter = []

feria = [7]
# 19 for oxford
# 20 for dabhi
smart_epact = [20]


def epacter(e, idx):
    incrementer = 11
    if idx%14 == 0:
        incrementer = 12
    epact_pre = (e + incrementer)%30
    if epact_pre==0:
        epact_pre = 30
    return epact_pre

def marchEpact(e, year):
    feb = 28
    if y%4==0:
        feb = 29
    e = e + 31 + feb
    print("e: ", e)
    march_epact = e%30
    if march_epact==0:
        march_epact = 30
    return march_epact

for i in range(438, 522):
    year.append(i)
    index.append(year.index(i)+1)
    #print("Year: ", i)
    if i%4==0:
        x = ((feria[-1] + 2)%7)
    else:
        x = ((feria[-1] + 1)%7)
    if x == 0:
        x = 7
    feria.append(x)
    #print(feria)
    idx = (year.index(i)+1)
    if(len(smart_epact)<84):
        smart_epact.append(epacter( (smart_epact[-1]), idx) )


for e in range(len(smart_epact)):
    y = year[e]
    print("Year: ", y)

    h = smart_epact[e]
    m_e = h

    print("Epact: ", m_e)

    fer = feria[e]
    print("Feria (Jan 1st): ", fer)

    feb = 28
    if y%4==0:
        feb = 29

    march_fer = (fer + 31 + feb)%7
    if march_fer == 0:
        march_fer = 7
    print("Feria (March 1st): ", march_fer)

    day_of_march = 1
    mon = "March"

    if m_e < 14:
        print("________________________________EPACT < 14 ________________________")
        day_of_march += 30
        march_fer = (march_fer+30)%7
        if march_fer ==0:
            march_fer =7
        print("March 31st Feria = ", march_fer)
        epact_filler = 14-m_e
        print("Filler: ", epact_filler)
        #next_full_moon = m_e + epact_filler
        day_of_march += epact_filler
        march_fer = (march_fer + epact_filler)%7
        print("march_fer: ", march_fer)
        if march_fer == 0:
            march_fer = 7
        get_to_sunday = 8-march_fer
        if(march_fer) == 1:
            get_to_sunday = 0

        day_of_march += get_to_sunday
        print("DAY OF MARCH: {}".format(day_of_march))

        if(day_of_march)>31:
            mon = "April"
            day_of_march -= 31

        print("Easter falls on : {} {}".format(mon, day_of_march) )

        #print("Feria in april for {}: {}".format(next_full_moon,march_fer))

    if m_e == 14:
        print("==================================EPACT = 14 ================================================")
        day_of_march += 30
        march_fer = (march_fer+30)%7
        if march_fer == 0:
            march_fer = 7
        print("March 31st Feria = ", march_fer)
        get_to_sunday = 8-march_fer
        if(march_fer) == 1:
            get_to_sunday = 0

        day_of_march += get_to_sunday
        print("DAY OF MARCH: {}".format(day_of_march))

        if(day_of_march)>31:
            mon = "April"
            day_of_march -= 31

        print("Easter falls on : {} {}".format(mon, day_of_march) )


    if m_e > 14:
        print("March Epact: ", m_e)
        # gets distance between beginning of lunar cycle
        reset_epact = 30-m_e
        # gets to the full moon (eg if epact is 20, value is 10+14)
        get_to_14 = reset_epact + 14
        print("This is the the amount of days to move forward before a full moon: ", get_to_14)
        # set march date as first full moon
        day_of_march += get_to_14
        print("Date is now ", day_of_march)
        print("Epact: ", (m_e+get_to_14)%30)

        # get feria on the day
        march_fer = (march_fer + get_to_14)%7
        # set it to 7 if it equals 0, same number just reads different
        if march_fer == 0:
            march_fer = 7
        # get feria on full moon march
        print("feria on {} : {}".format(day_of_march, march_fer))
        # get distance from feria to easter sunday
        get_to_sunday = 8-march_fer
        if march_fer == 1:
            get_to_sunday = 0
        # get easter sunday
        day_of_march += get_to_sunday
        print("DAY OF MARCH: {}".format(day_of_march))

        # if 'easter sunday' is smaller than 26
        # at the very least, need to rethink strategy

        # if the easter date falls on or before the 26th, its too early
        if(day_of_march)<26:
            # define the date and epact that are too early
            too_early_date = day_of_march
            too_early_moon_age = get_to_sunday + 14
            too_early_feria = 7
            print("Date : {}, Moon Age: {}".format(too_early_date, too_early_moon_age))

            # reset to next lunar age, then go back to lunar 14 once more
            too_early_moon_age_reset = 30-too_early_moon_age
            get_to_14_2 = too_early_moon_age_reset + 14

            day_of_march += get_to_14_2
            march_fer = (too_early_feria + get_to_14_2)%7

            if march_fer == 0:
                march_fer = 7
            get_to_sunday = 8-march_fer
            if march_fer == 1:
                get_to_sunday = 0

            # get easter sunday (Taking one away solves a discrepency with the table, if the code gets this far, then the days_of_march value is always out by one)
            day_of_march += get_to_sunday - 1
            print("DAY OF MARCH: {}".format(day_of_march+1))

        print("Moon Age: ", 14 + get_to_sunday)

        if(day_of_march)>31:
            mon = "April"
            day_of_march -= 31

        print("Easter falls on : {} {}".format(mon, day_of_march) )


    print()
