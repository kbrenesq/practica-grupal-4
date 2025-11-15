import Chart from "chart.js/auto";

const DATES = ["2020-03-14", "2020-04-14", "2020-05-14", "2020-06-14", "2020-07-14", "2020-08-14", 
    "2020-09-14", "2020-10-14", "2020-11-14", "2020-12-14", "2021-01-14", "2021-02-14", "2021-03-14"]; // Array with the dates to analyze

// Fetches the data (Date // Deaths) from the API according to the date param
async function fetchData(date) {
  const url = `https://covid-api.com/api/reports/total?date=${date}&iso=USA`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Access the 'deaths' property from the nested 'data' object
    return data.data.deaths; 
  } catch (error) {
    console.error(`Error fetching data for ${date}:`, error);
    return 0;
  }
}

async function init() {
  const deathData = [];
  
  // Fetch data sequentially for the three years
  for (const date of DATES) {
    const deaths = await fetchData(date);
    deathData.push(deaths);
  }

  // Maps the dates by YEAR-MONTH found in the DATES array
  const labels = DATES.map(date => date.substring(0, 7)); // 
  
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Total COVID-19 Deaths in USA',
      data: deathData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      pointStyle: 'circle', 
      pointRadius: 6,
      pointHoverRadius: 10,
      tension: 0.1
    }]
  };
  
  //Chart configuration based on https://www.chartjs.org/docs/latest/samples/line/point-styling.html
  const config = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Total COVID-19 Deaths in USA (March 14th 2020 to March 14th 2021)',
          font: {
            size: 20
          }
        }
      },
      
      scales: {
        y: {
          title: {
            display: true,
            text: 'Total Deaths'
          },
          beginAtZero: false 
        },
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        }
      }
    }
  };

  // Create the chart on the new canvas element
  const ctx = document.getElementById("covid-deaths").getContext("2d");
  new Chart(ctx, config);
}

init();


/*
https://covid-api.com/api/reports/total?date=2021-03-14&iso=USA

{
  "data": {
    "date": "2021-03-14",
    "last_update": "2021-03-15 05:25:51",
    "confirmed": 29438222,
    "confirmed_diff": 38242,
    "deaths": 534880,
    "deaths_diff": 589,
    "recovered": 0,
    "recovered_diff": 0,
    "active": 28903342,
    "active_diff": 37653,
    "fatality_rate": 0.0182
  }
}
*/ 