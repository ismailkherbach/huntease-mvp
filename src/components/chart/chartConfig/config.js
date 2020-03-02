export const lineOptions = {
  responsive: true,
  tooltips: {
    enabled: false,
    display: false,
    backgroundColor: "none",
    labelTextColor: "black",
    titleFontSize: 14,
    callbacks: {
      label: function(tooltipItem, data) {
        var label = data.datasets[tooltipItem.datasetIndex].label || "";

        if (label) {
          label += ": ";
        }
        label += Math.round(tooltipItem.yLabel * 100) / 100;
        return "Conversion rate " + label + " %";
      },
      labelColor: function(tooltipItem, chart) {
        return {
          labelTextColor: "#254ebe",
          backgroundColor: "#254ebe"
        };
      },
      labelTextColor: function(tooltipItem, chart) {
        return "#254ebe";
      }
    }
  },
  maintainAspectRatio: false,
  legend: { display: false },

  scales: {
    xAxes: [
      {
        barPercentage: 1,
        categoryPercentage: 1,
        gridLines: {
          offsetGridLines: true,
          color: "rgba(0, 0, 0, 0)"
        },
        ticks: {
          beginAtZero: true,
          fontFamily: "Rubik",
          fontColor: "#c4cfef",
          fontSize: 12,
          fontStyle: "bold"
        }
      }
    ],
    yAxes: [
      {
        display: false,

        gridLines: {
          offsetGridLines: true,
          display: false,
          color: "rgba(0, 0, 0, 0)"
        },
        ticks: {
          stepSize: 40,
          beginAtZero: true,
          fontFamily: "Rubik",
          fontColor: "#c4cfef",
          fontSize: 12
        }
      }
    ]
  },
  title: {
    display: false,
    text: ""
  }
};

export const barOptions = {
  maintainAspectRatio: false,
  responsive: true,
  cornerRadius: 20,

  barRoundness: 1,
  legend: { labels: { fontColor: "white", fontSize: 12 }, display: false },

  scales: {
    offset: true,
    xAxes: [
      {
        gridLines: {
          offsetGridLines: false,
          drawBorder: false,
          color: "rgba(0, 0, 0, 0)",
          margin: 3
        },
        ticks: {
          beginAtZero: true,
          fontFamily: "Rubik",
          fontColor: "#c4cfef",
          fontSize: 12,
          margin: 3,

          fontStyle: "regular"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          offsetGridLines: true,
          color: "#e9effb",
          drawBorder: false
        },
        ticks: {
          stepSize: 30,
          max: 120,
          min: 0,
          beginAtZero: true,
          fontFamily: "Rubik",
          fontColor: "#c4cfef",
          fontSize: 12,

          fontStyle: "regular"
        }
      }
    ]
  },
  title: {
    display: false,
    text: ""
  }
};

export const circleOptions = {
  /*tooltips: {
    callbacks: {
      title: (items, data) =>
        data.datasets[items[0].datasetIndex].data[items[0].index],
      label: (item, data) => data.datasets[item.datasetIndex].data[item.index]
    }
  },*/
  cutoutPercentage: 65,
  elements: {
    center: {
      text: `${"Total"}\ 416`,
      fontColor: "#c4cfef",
      fontFamily: "Rubik",
      fontStyle: "normal",
      padding: "4px",
      minFontSize: 22,
      maxFontSize: 22
    }
  },
  maintainAspectRatio: false,

  legend: {
    labels: {
      // This more specific font property overrides the global property
      defaultFontFamily: "Rubik",
      defaultFontColor: "#c4cfef"
    },
    display: false
  },

  title: {
    display: false,
    text: ""
  }
};
