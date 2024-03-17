//This is required to get input from the user in the console.
const readline = require('readline-sync');

/*
  Name:        Programming Assignment 1 - Walking
  Purpose:     Determine the distance and time the user has walked in the past week, and how weather and terrain affect these factors

  Author:      Sophie Wong
  Created:     23-Oct-2023
  Updated:     29-Oct-2023
*/

function speedPerhour(distance,time,hoursOrMinutesOrSeconds,terrain,weather){
  // lists for time units, terrain and weather options
  const hoursOrMinutesOrSecondsList = ["hours","minutes","seconds"];
  const terrainList = ["neighbourhood","mountain","trail","park","forest"];
  const newTerrainList = ["mountain","trail","park","forest"];
  const weatherList = ["sunny","cloudy","rainy","stormy","snowy","icy","windy"];
  const newWeatherList = ["cloudy","rainy","stormy","snowy","icy","windy"];

  // negative or invalid input results
  while (distance < 0 || isNaN(distance)){
    distance = readline.question("\nHow can distance be negative/a value that is not a number... input a positive number: ");
  }
  while (time < 0 || isNaN(time)){
    time = readline.question("\nHow can time be negative/a value that is not a number... input a positive number: ");
  }
  while (!hoursOrMinutesOrSecondsList.includes(hoursOrMinutesOrSeconds)) {
    hoursOrMinutesOrSeconds = readline.question("\nPlease make sure you are correctly spelling hours, minutes and seconds, and selecting only from these options: ");
  }
  while (!terrainList.includes(terrain)){
    terrain = readline.question("\nPlease make sure you are correctly spelling the options (neighbourhood, mountain, trail, park, or forest) and selecting only from these options: ");
  }
  while (!weatherList.includes(weather)){
    weather = readline.question("\nPlease make sure you are correctly spelling the options (sunny, cloudy, rainy, stormy, snowy, icy, or windy) and selecting only from these options: ");
  }
  // calculates time to hours
  if (hoursOrMinutesOrSeconds == "seconds"){
    time = time/3600;
  }
  else if (hoursOrMinutesOrSeconds == "minutes"){
    time = time/60;
  }
  // calculates speed (in km) per hour
  let speed = Math.round((distance/time)*100)/100;
  
  // calculates how terrain affects speed (in km) per hour + checks for invalid inputs
  let terrainSpeed;
  let newTerrain = readline.question("\nThink back to a day when you did not walk in your neighbourhood. Where did you walk? (choose between mountain, trail, park or forest): ");
  newTerrain = newTerrain.trim();
  newTerrain = newTerrain.toLowerCase();
  while (!newTerrainList.includes(newTerrain)){
    newTerrain = readline.question("\nPlease make sure you are correctly spelling the options (mountain, trail, park, or forest) and selecting only from these options: ");
    newTerrain = newTerrain.trim();
    newTerrain = newTerrain.toLowerCase();
  } 
  if (terrain == "neighbourhood"){
    terrainSpeed = readline.question("What was your speed (in km) per hour? (input numerical speed value only): ");
    while (terrainSpeed < 0 || isNaN(terrainSpeed)){
      terrainSpeed = readline.question("Please input a positive number: ");
    }
  }
  else if (terrain !== "neighbourhood"){
    terrainSpeed = readline.question("\nChoose a day that you walked in your neighbourhood. What was your speed (in km) per hour? (input numerical speed value only): ");
    while (terrainSpeed < 0 || isNaN(terrainSpeed)){
      terrainSpeed = readline.question("Please input a positive number: ");
    }
  }
  let terrainSpeedDifference = Math.round(Math.abs(terrainSpeed - speed)*100)/100;

  // calculates how weather affects speed (in km) per hour + chekcs for invalid inputs
  let weatherSpeed;
  let newWeather = readline.question("\nChoose a day that you walked in non-sunny conditions. What was the weather like? (choose between cloudy, rainy, stormy, snowy, icy or windy): ");
  newWeather = newWeather.trim();
  newWeather = newWeather.toLowerCase();
  while (!newWeatherList.includes(newWeather)){
    newWeather = readline.question("\nPlease make sure you are correctly spelling the options (cloudy, rainy, stormy, snowy, icy, or windy) and selecting only from these options: ");
    newWeather = newWeather.trim();
    newWeather = newWeather.toLowerCase();
  }
  if (weather !== "sunny"){
    weatherSpeed = readline.question("\nThink back to a sunny day that you walked. What was your speed (in km) per hour? (input numerical speed value only): ");
    while (weatherSpeed < 0 || isNaN(weatherSpeed)){
      weatherSpeed = readline.question("Please input a positive number: ")
    }
  }
  else if (weather == "sunny"){
    weatherSpeed = readline.question("What was your speed (in km) per hour? (input numerical speed value only): ");
    while (weatherSpeed < 0 || isNaN(weatherSpeed)){
      weatherSpeed = readline.question("Please input a positive number: ")
    }
  }
  let weatherSpeedDifference = Math.round(Math.abs(weatherSpeed - speed)*100)/100;
  
  // return message based on different conditions
  // neighbourhood, sunny
  if (terrain == "neighbourhood" && weather == "sunny"){
    return "\nYour speed was " + String(speed) + "km per hour. Additionally, there was a speed difference of " + String(weatherSpeedDifference) + "km per hour when you walked in your neighbourhood on a " + String(newWeather) + " day in your neighbourhood, and a speed difference of " + String(terrainSpeedDifference) + "km per hour when you walked on a sunny day in a " + String(newTerrain) + "."
  }
  // neighbourhood, not sunny
  else if (terrain == "neighbourhood" && weather !== "sunny"){
    return "\nYour speed was " + String(speed) + "km per hour. Additionally, when you walked in your neighbourhood on a(n) " + String(newWeather) + " day, there was a speed difference of " + String(weatherSpeedDifference) + "km per hour when compared to your walk in the neighbourhood on a sunny day, and a speed difference of " + String(terrainSpeedDifference) + "km per hour when you walked in a " + String(newTerrain) + "."
  }
  // not neighbourhood, sunny
  else if (terrain !== "neighbourhood" && weather == "sunny"){
    return "\nYour speed was " + String(speed) + "km per hour. Additionally, there was a speed difference of " + String(terrainSpeedDifference) + "km per hour when you walked in a " + String(newTerrain) + " on a sunny day, and a speed difference of " + String(weatherSpeedDifference) + "km per hour on a " + String(newWeather) + " day in a " + String(terrain) + "."
  }
  // not neighbourhood, not sunny
  else{
    return "\nYour speed was " + String(speed) + "km per hour. Additionally, there was a speed difference of " + String(terrainSpeedDifference) + "km per hour than in a " + String(newTerrain) + ", and a speed difference of " + String(weatherSpeedDifference) + "km per hour on a " + String(newWeather) + " day."
  }
}


// gathers data from today's walk
// today's distance
let todayDistance = readline.question("How far did you walk (in km) today? (only input the number): ");
todayDistance = todayDistance.trim();

// today's time
let todayTime = readline.question("How long did you walk for? (only input the number): ");
todayTime = todayTime.trim();

// today's time unit
let todayHoursOrMinutesOrSeconds = readline.question("In the answer above, did you put your time in hours, minutes, or seconds?: ");
todayHoursOrMinutesOrSeconds = todayHoursOrMinutesOrSeconds.trim();
todayHoursOrMinutesOrSeconds = todayHoursOrMinutesOrSeconds.toLowerCase();

// today's terrain
let todayTerrain = readline.question("How would you describe the area you walked? (choose between neighbourhood, mountain, forest, trail, park): ");
todayTerrain = todayTerrain.trim();
todayTerrain = todayTerrain.toLowerCase();

// today's weather
let todayWeather = readline.question("What was the weather like when you walked? (choose between sunny, cloudy, rainy, stormy, snowy, icy or windy): ");
todayWeather = todayWeather.trim();
todayWeather = todayWeather.toLowerCase();

// calls function + output message
console.log("\nToday's results: " + speedPerhour(todayDistance,todayTime,todayHoursOrMinutesOrSeconds,todayTerrain,todayWeather));

// weekly distance, days ago counter
let weeklyDistance = 0
let daysAgo = 3;

// for loop for 3 days of the week
for (let dayOfTheWeek = 1;dayOfTheWeek < 4;dayOfTheWeek++){
  console.log("\nDay " + String(dayOfTheWeek));
  // specific day distance // TRIM AND LOWERCASE
  let dayOfTheWeekDistance = readline.question("How far did you walk " + String(daysAgo) + " day(s) ago? (only input the number in km): ");
  dayOfTheWeekDistance = dayOfTheWeekDistance.trim();
  weeklyDistance = weeklyDistance + parseFloat(dayOfTheWeekDistance);
  // specific day time
  let dayOfTheWeekTime = readline.question("How long did you walk for? (only input the number in km): ");
  dayOfTheWeekTime = dayOfTheWeekTime.trim();
  // specific day time unit
  let dayOfTheWeekHoursOrMinutesOrSeconds = readline.question("In the answer above, did you put your time in hours, minutes, or seconds?: ");
  dayOfTheWeekHoursOrMinutesOrSeconds = dayOfTheWeekHoursOrMinutesOrSeconds.trim();
  // specific day terrain
  let dayOfTheWeekTerrain = readline.question("How would you describe the area you walked? (choose between neighbourhood, mountain, forest, trail, park): ");
  dayOfTheWeekTerrain = dayOfTheWeekTerrain.trim();
  // specific day weather
  let dayOfTheWeekWeather = readline.question("What was the weather like when you walked? (choose between sunny, cloudy, rainy, stormy, snowy, icy or windy): ");
  dayOfTheWeekWeather = dayOfTheWeekWeather.trim();
  
  daysAgo--;
  
  // calls function + output message for each day
  console.log("\nResults: " + speedPerhour(dayOfTheWeekDistance,dayOfTheWeekTime,dayOfTheWeekHoursOrMinutesOrSeconds,dayOfTheWeekTerrain,dayOfTheWeekWeather));
}

// total distance of 3 days
weeklyDistance = Math.round(weeklyDistance*100)/100
console.log("\nIn the past 3 days, you walked a total distance of " + String(weeklyDistance) + "km.");