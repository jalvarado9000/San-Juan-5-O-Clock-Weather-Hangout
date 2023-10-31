// API url
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=18.4663&longitude=-66.1057&hourly=temperature_2m";

// Months array
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];

//Days name array
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//Weather Status
const weatherConditions = ['Rainy', 'Cloudy', 'Sunny'];

// Temperature below 15C it's considered rainy
const rainy = 15; 
// Temperature below 20C it's considered cloudy
const cloudy = 20; 
// Temperature above 25C its considered sunny
const sunny = 25; 


// Fetch weather data from api
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        
        //get hours array
        const timestamps = data.hourly.time;
        //gets temperture
        const temperaturCondition = data.hourly.temperature_2m;
        // Fill in the table with temperature and time data
        const table = document.querySelector("table");
        //24hrs format 17:00 is 5 Oclock
        let noon = 17;


   


        for (let i = 0; i < 7; i++) {

            //selects temperture row
            const termpertureRow = document.getElementById(`${daysOfWeek[i].toLowerCase()}-temperature`);
            //selects weekday row
            const timeRow = document.getElementById(`${daysOfWeek[i].toLowerCase()}-time`);
            //selects condition row
            const conditionRow = document.getElementById(`${daysOfWeek[i].toLowerCase()}-condition`);

            //selects temperture row
            const daysRow = document.getElementById(`${daysOfWeek[i].toLowerCase()}`);

            const iconRow = document.getElementById(`${daysOfWeek[i].toLowerCase()}-icon`);

            
           

            //selects 5:00pm of each day, creates date object
            const timestamp = new Date(timestamps[noon]);

            //Matches month number with monthName array
            const month = monthNames[timestamp.getMonth()];
        
            //gets day of the week
            const day = timestamp.getDate();

            //temperture condition at 5:00pm
            tempertureAtFive = temperaturCondition[noon];
            

            //Convert from Celsius to Fahrenheit
             const temperatureFahrenheit = (tempertureAtFive * 9/5) + 32;

            //selects weather condition from array
            let selectWeather = -1;
        
            //depending on temperture we can estimate if the weather is rainy, cloudy or sunny
            if (tempertureAtFive < rainy) {
                //Writes condition on html
                selectWeather = 0;
                conditionRow.textContent = weatherConditions[selectWeather];
                iconRow.src = `${weatherConditions[selectWeather].toLowerCase()}-weather.png`;
                
            } else if (tempertureAtFive >= cloudy && tempertureAtFive < sunny) {
                //Writes condition on html
                selectWeather = 1;
                conditionRow.textContent = weatherConditions[selectWeather];
                iconRow.src = `${weatherConditions[selectWeather].toLowerCase()}-weather.png`;
            } else {
                //Writes condition on html
                selectWeather = 2;
                conditionRow.textContent = weatherConditions[selectWeather];
                iconRow.src = `${weatherConditions[selectWeather].toLowerCase()}-weather.jpg`;
            }

            
            
            console.log(iconRow)

            daysRow.textContent = daysOfWeek[i];
          
            //Writes Farenheit temperture on html
            termpertureRow.textContent = temperatureFahrenheit.toFixed(0) + "°F";
            //Write time on html
            timeRow.textContent = `${month} ${day}`;
            //adds 24hrs to give next day 5:00pm data
            noon += 24;

        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });





    