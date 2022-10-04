//This calculates the time based on rounded Start Time and End Time entries. 
//Final result is also rounded. Rounded to quarter hours. If either start time or end time is blank, returns blank.

function roundTimeQuarterHour(time) {
    var timeToReturn = new Date(time);
    
    timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    return timeToReturn;
} 

var time1 = this.getField("StartTimeRow10").value;
var time2 = this.getField("EndTimeRow10").value;

// convert to date
var datetime1 = new Date('1970/01/01 ' + time1);
var datetime2 = new Date('1970/01/01 ' + time2);

var rounded_dt1 = roundTimeQuarterHour(datetime1)
var rounded_dt2 = roundTimeQuarterHour(datetime2)

var diffInMilliSeconds = Math.abs(rounded_dt1 - rounded_dt2) / 1000;

// calculate hours
var hours = Math.floor(diffInMilliSeconds / 3600) % 24;
diffInMilliSeconds -= hours * 3600;

// calculate minutes
var minutes = Math.floor(diffInMilliSeconds / 60) % 60;

var m = ((((minutes + 7.5)/15 | 0) * 15) % 60)*100/60;
var h = ((((minutes/105) + .5) | 0) + hours) % 24;

//error handling and result
if ((this.getField("StartTimeRow10").value == "") ||
    (this.getField("EndTimeRow10").value == "") ||
    (rounded_dt1 > rounded_dt2))
    {
    event.value = "";
  }
else if (diffInMilliSeconds!=0 && h+"."+m=="0.0"){event.value = "24.00"}
else event.value =h + "." +m;
