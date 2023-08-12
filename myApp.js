const app = {
  init: () => {
    document
      .getElementById('dhakaButton1')
      .addEventListener('click', app.urlDhaka);
    document
      .getElementById('dhakaButton2')
      .addEventListener('click', app.urlDhaka);
    document
      .getElementById('sydneyButton1')
      .addEventListener('click', app.urlSydney);
    document
      .getElementById('sydneyButton2')
      .addEventListener('click', app.urlSydney);
    document
      .getElementById('sfButton1')
      .addEventListener('click', app.urlSF);
    document
      .getElementById('sfButton2')
      .addEventListener('click', app.urlSF);
    document
      .getElementById('rdjButton1')
      .addEventListener('click', app.urlRDJ);
    document
      .getElementById('rdjButton2')
      .addEventListener('click', app.urlRDJ);
    document
      .getElementById('londonButton1')
      .addEventListener('click', app.urlLondon);
    document
      .getElementById('londonButton2')
      .addEventListener('click', app.urlLondon);
    document
      .getElementById('coordinatesButton')
      .addEventListener('click', app.urlCoordinates);
    document
      .getElementById('currentLocationButton')
      .addEventListener('click', app.urlCurrent);
  },

  // URL FUNCTIONS -> FETCH DATA -> UPDATE HTML

  //////////////// 1. Generating api URL according to selected location

  urlDhaka: (ev) => {
    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in Dhaka, Bangladesh";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let lat = 23.81;
    let lon = 90.40;
    let key = '4fc7e5ddb0c84ba7105644a07709c167';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    app.fetchData(url);
  },
  urlSydney: (ev) => {
    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in Sydney, Australia";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let lat = -33.87;
    let lon = 151.14;
    let key = '4fc7e5ddb0c84ba7105644a07709c167';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    app.fetchData(url);
  },
  urlSF: (ev) => {
    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in San Francisco, USA";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let lat = 37.76;
    let lon = -122.45;
    let key = '4fc7e5ddb0c84ba7105644a07709c167';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    app.fetchData(url);
  },
  urlRDJ: (ev) => {
    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in Rio de Jeneiro, Brazil";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let lat = -22.94;
    let lon = -43.22;
    let key = '4fc7e5ddb0c84ba7105644a07709c167';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    app.fetchData(url);
  },
  urlLondon: (ev) => {
    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in London, UK";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let lat = 51.49;
    let lon = -0.11;
    let key = '4fc7e5ddb0c84ba7105644a07709c167';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    app.fetchData(url);
  },
  urlCoordinates: (ev) => {
    let lat = document.getElementById('latitudeInput').value;
    let lon = document.getElementById('longitudeInput').value;

    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in coordinates ("+lat+", "+lon+")";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let key = '4fc7e5ddb0c84ba7105644a07709c167';
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    app.fetchData(url);
  },
  urlCurrent: (ev) => {
    const targetElement = document.getElementById('feelsLikeLocation');
    if (targetElement){
      targetElement.textContent = "in current location";
    } else { console.error('Element with ID "feelsLikeLocation" not found.');}

    let lat=0;
    let lon=0;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(2,lat,lon)
        let key = '4fc7e5ddb0c84ba7105644a07709c167';
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
        app.fetchData(url);
      }, function(error) {
        console.error("Error getting location: " + error.message);
      });
    } else { console.error("Geolocation not supported by the browser"); }
  }, 

  //////////////// 2. Fetching all necessary data from api response

  fetchData: (url) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Main weather information:
        let temp=Math.floor(data.list[0].main.temp);
        let feelslike=Math.floor(data.list[0].main.feels_like);
        let desc=data.list[0].weather[0].description;
        let humidity=Math.floor(data.list[0].main.humidity);
        let temp_max=Math.floor(data.list[0].main.temp_max);
        let temp_min=Math.floor(data.list[0].main.temp_min);
        let forecastHour=data.list[0].dt;



        // Calculating and converting current time of coordinates:
        let myDate=new Date();
        let myOffset=myDate.getTimezoneOffset();
        let currentMinute=myDate.getMinutes();
        let currentHour=myDate.getHours();
        myOffset=Math.floor(Math.abs(myOffset) / 60);
        currentHour=currentHour-myOffset;
        let utcOffset=data.city.timezone;
        utcOffset/=3600;
        currentHour+=utcOffset;
        utcHour=currentHour;

        let minuteString="";
        if(currentMinute<10){minuteString="0"+String(currentMinute);}
        else {minuteString=String(currentMinute);}
        if(currentHour<12){
          if(currentHour<0){
            currentHour+=12;
            minuteString=minuteString+" pm";
          }
          else{minuteString=minuteString+" am";}
        }
        else if(currentHour>=12){
          currentHour-=12;
          minuteString=minuteString+" pm";
        }
        if(currentHour==0){currentHour+=12;}
        else if(currentHour==24){currentHour-=12;}

        if(utcHour<0){utcHour+=24;}
        console.log(currentHour+":"+minuteString);
        console.log(utcHour);

        // Forecast chart data
        let forecast1=Math.floor(data.list[8].main.temp);
        let forecast2=Math.floor(data.list[16].main.temp);
        let forecast3=Math.floor(data.list[24].main.temp);
        let forecast4=Math.floor(data.list[32].main.temp);
        let forecast5=Math.floor(data.list[39].main.temp);
        let forecastDesc1=data.list[8].weather[0].main;
        let forecastDesc2=data.list[16].weather[0].main;
        let forecastDesc3=data.list[24].weather[0].main;
        let forecastDesc4=data.list[32].weather[0].main;
        let forecastDesc5=data.list[29].weather[0].main;

        let forecastDate1=data.list[8].dt_txt;
        let forecastDate2=data.list[16].dt_txt;
        let forecastDate3=data.list[24].dt_txt;
        let forecastDate4=data.list[32].dt_txt;
        let forecastDate5=data.list[39].dt_txt;
        forecastDate1 = forecastDate1.split(" ")[0];
        forecastDate2 = forecastDate2.split(" ")[0];
        forecastDate3 = forecastDate3.split(" ")[0];
        forecastDate4 = forecastDate4.split(" ")[0];
        forecastDate5 = forecastDate5.split(" ")[0];
        forecastDate1 = forecastDate1.split("-")[2]+"/"+forecastDate1.split("-")[1];
        forecastDate2 = forecastDate2.split("-")[2]+"/"+forecastDate2.split("-")[1];
        forecastDate3 = forecastDate3.split("-")[2]+"/"+forecastDate3.split("-")[1];
        forecastDate4 = forecastDate4.split("-")[2]+"/"+forecastDate4.split("-")[1];
        forecastDate5 = forecastDate5.split("-")[2]+"/"+forecastDate5.split("-")[1];

        // Sending data to show on website
        app.updateHTML(temp,feelslike,desc,humidity,temp_max,temp_min,
          utcHour,currentHour,minuteString,
          forecast1,forecast2,forecast3,forecast4,forecast5,
          forecastDesc1,forecastDesc2,forecastDesc3,forecastDesc4,forecastDesc5,
          forecastDate1,forecastDate2,forecastDate3,forecastDate4,forecastDate5);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  },

  //////////////// 3. Updating HTML to show data on webpage
  
  updateHTML: (temp,feelslike,desc,humidity,temp_max,temp_min,
    utcHour,currentHour,minuteString,
    forecast1,forecast2,forecast3,forecast4,forecast5,
    forecastDesc1,forecastDesc2,forecastDesc3,forecastDesc4,forecastDesc5,
    forecastDate1,forecastDate2,forecastDate3,forecastDate4,forecastDate5) => {

    // Changing stylesheet based on time
    let stylesheetLink = document.getElementById('stylesheet');
    var themeCol=""
    if(utcHour>=4 && utcHour<19)
    {
      if(utcHour>=7 && utcHour<16) {stylesheetLink.href = 'styleDay.css'; themeCol="#00375a";}
      else{stylesheetLink.href = 'styleDawndusk.css'; themeCol="#fff06d";}
    }
    else{stylesheetLink.href = 'styleNight.css'; themeCol="#83fbff";}

    // Main weather information
    let targetElement = document.getElementById('mainTempText');
    if (targetElement){
      targetElement.textContent = String(temp) + "°c";
    } else { console.error('Element not found.');}
    targetElement = document.getElementById('feelsLikeText');
    if (targetElement){
      targetElement.textContent = "Feels like " + String(feelslike) + "°c";
    } else { console.error('Element not found.');}
    targetElement = document.getElementById('feelsLikeTime');
    if (targetElement){
      targetElement.textContent = currentHour+":"+minuteString;
    } else { console.error('Element not found.');}
    targetElement = document.getElementById('weatherType');
    if (targetElement){
      targetElement.textContent = String(desc);
    } else { console.error('Element not found.');}
    targetElement = document.getElementById('humidity');
    if (targetElement){
      targetElement.textContent = "Humidity: " + String(humidity) + "%";
    } else { console.error('Element not found.');}
    targetElement = document.getElementById('temp_max');
    if (targetElement){
      targetElement.textContent = "Maximum Temperature: " + String(temp_max) + "°c";
    } else { console.error('Element not found.');}
    targetElement = document.getElementById('temp_min');
    if (targetElement){
      targetElement.textContent = "Minimum Temperature: " + String(temp_min) + "°c";
    } else { console.error('Element not found.');}

    // Line Chart Data:
      let newForecastData = [String(forecast1), String(forecast2), String(forecast3), String(forecast4), String(forecast5)];
      let newLabels = [String(forecastDate1), String(forecastDate2), String(forecastDate3), String(forecastDate4), String(forecastDate5)];

      let existingChart = Chart.getChart('temperatureChart');
      if (existingChart) {
        existingChart.destroy();
      }
      const chartConfig = {
        type: 'line',
        data: {
          labels: newLabels,
          datasets: [{
            label: 'Temperature',
            data: newForecastData,
            borderColor: themeCol,
            backgroundColor: 'transparent',
            pointBackgroundColor: themeCol,
            pointBorderColor: themeCol,
            pointHoverBackgroundColor: themeCol,
            pointHoverBorderColor: themeCol
          }]
        },

        options: {
          layout: {
            padding: {
              left: 50, right: 50, top: 50, bottom: 50
            }
          },

          scales: {
            y: {
              display: false
            },
            x: { 
              ticks: {color: themeCol, font: {size: 20}}
            }
          },

          plugins: {
            legend: 
            { 
              display: false 
            },
            datalabels: 
            {
              font: {family: 'Montserrat, sans-serif', weight: 'bold', size: 25},
              align: 'top', color: themeCol, 
              formatter: function(value) {return value + '°C';}     
            }
          }
        }
      };
      
      const ctx = document.getElementById('temperatureChart').getContext('2d');
      const myChart = new Chart(ctx, chartConfig);

      // Weather descriptions under line chart:
      targetElement = document.getElementById('forDesc1');
      if (targetElement){
        targetElement.textContent = forecastDesc1;
      } else { console.error('Element not found.');}
      targetElement = document.getElementById('forDesc2');
      if (targetElement){
        targetElement.textContent = forecastDesc2;
      } else { console.error('Element not found.');}
      targetElement = document.getElementById('forDesc3');
      if (targetElement){
        targetElement.textContent = forecastDesc3;
      } else { console.error('Element not found.');}
      targetElement = document.getElementById('forDesc4');
      if (targetElement){
        targetElement.textContent = forecastDesc4;
      } else { console.error('Element not found.');}
      targetElement = document.getElementById('forDesc5');
      if (targetElement){
        targetElement.textContent = forecastDesc5;
      } else { console.error('Element not found.');}

  },
};

app.init();
app.urlCurrent();