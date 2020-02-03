// Time functions
/* Convert user entered date to epoch time */
export function userDateToEpoch(date, hour, minute, ampm) {
    const dates = date.split('-'); // date from html date picker is in format: 2020-02-14
    const newYear = dates[0];
    const newMonth = dates[1]-1; // offset by -1. html date picker treats January as '01' rather than '00'
    const newDate = dates[2]
    hour = parseInt(hour);
    minute = parseInt(minute);
    if (ampm == 'pm' && hour != 12) { hour = hour + 12; } // convert 12hr to 24hr
    else if (ampm == 'am' && hour == 12){ hour = 0; }
    const newEpochDate = new Date(newYear, newMonth, newDate, hour, minute,0,0);
    return newEpochDate.getTime();
}
/* -- Get Displayable date from epoch time -- */
export function dateTimeToString(dateTime){
    return new Date(dateTime);
}

export function getFullDateFromTime(time) {
    return getDayFromTime(time)+' '+getMonthFromTime(time)+' '+getDateFromTime(time)+' '+getTimeFromTime(time);
}

export function getMonthFromTime(time) {
    const months = [];
    months[0] = 'Jan';
    months[1] = 'Feb';
    months[2] = 'Mar';
    months[3] = 'Apr';
    months[4] = 'May';
    months[5] = 'Jun';
    months[6] = 'Jul';
    months[7] = 'Aug';
    months[8] = 'Sep';
    months[9] = 'Oct';
    months[10] = 'Nov';
    months[11] = 'Dec';
    return months[time.getMonth()];
}

export function getDayFromTime(time) {
    const days = [];
    days[0] = 'Sunday';
    days[1] = 'Monday';
    days[2] = 'Tuesday';
    days[3] = 'Wednesday';
    days[4] = 'Thursday';
    days[5] = 'Friday';
    days[6] = 'Saturday';

    return days[time.getDay()];
}

export function getDateFromTime(time) {
    return time.getDate();
}

export function getTimeFromTime(time) {
    let hour = time.getHours();
    let ampm = 'am';
    if (hour >= 12) {
        ampm = 'pm';
        if (hour != 12) hour = hour - 12;
    } else if (hour == 0) {
        hour = 12;
    }
    let minutes = time.getMinutes().toString();
    if (minutes[1] == null) {
        minutes = '0' + minutes;
    }
    return hour+':'+minutes+' '+ampm;
}