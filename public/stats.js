function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}

function populateChart(data) {
  let pounds = Object.values(calculateTotalWeight(data));
  let workouts = Object.keys(calculateTotalWeight(data));
  const colors = generatePalette();
  let durations = Object.values(calculateTotalDurations(data));
  let durationsWorkout = Object.keys(calculateTotalDurations(data));

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    console.log(date);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      // responsive: false,
      title: {
        display: true,
        text: "Exercise Duration",
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: durationsWorkout,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed",
      },
    },
  });
}

function calculateTotalWeight(data) {
  let weightObject = {};

  data.forEach((workout) => {
    workout.exercises.reduce((total, { type, name, weight, duration }) => {
      if (type === "resistance") {
        if (!weightObject.hasOwnProperty(name)) {
          weightObject[name] = weight;
        } else {
          weightObject[name] += weight;
        }
      }
    }, 0);
  });
  return weightObject;
}

function calculateTotalDurations(data) {
  let durationObject = {};

  data.forEach((workout) => {
    workout.exercises.reduce((total, { type, name, weight, duration }) => {
      if (!durationObject.hasOwnProperty(name)) {
        durationObject[name] = duration;
      } else {
        durationObject[name] += duration;
      }
    }, 0);
  });
  return durationObject;
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
