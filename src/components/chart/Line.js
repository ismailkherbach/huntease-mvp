import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class PerformanceGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      colorBack: "red",
      cack: {},
      compareArray: [],
      compare: null
    };
    this.handleClickColor = this.handleClickColor.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }
  handleClickColor() {
    this.setState({ colorBack: this.state.colorBack });
  }

  updateChart() {
    this.setState({ colorBack: "red" });
  }

  componentDidMount() {
    //your code
    var ctx = document.getElementById("canvas").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 70);

    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "#FFF8EF");
    gradient.addColorStop(1, "#FFEED8");

    console.log(gradient);
    this.setState(
      { colorBack: gradient },
      () => console.log(this.state.colorBack),
      this.setState({ colorBack: "white" })
    );

    const newData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          type: "line",
          backgroundColor: "#ffc371",
          pointRadius: 0,
          pointHoverBorderWidth: 10,
          pointHoverRadius: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 5,
          borderColor: "#ffc371",
          fill: false,
          pointBackgroundColor: "white",
          pointBorderColor: "#ffc371",
          data: [50, 30, 70, 40, 60, 30, 90],

          datalabels: {
            align: "end",
            anchor: "end",
            fontStyle: "bold"
          }
        },
        {
          type: "bar",

          backgroundColor: [
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white"
          ],

          pointRadius: 4,
          hoverBackgroundColor: gradient,
          pointHoverRadius: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderRadius: 5,
          fill: false,
          data: [200, 200, 200, 200, 200, 200, 200],
          datalabels: {
            fontStyle: "bold"
          }
        }
      ]
    };
    this.setState({ chartData: newData });
    this.setState({ colorBack: gradient });
  }

  //more of your code

  render() {
    return (
      <div>
        <div className="mx-0 mt-0">
          <Line
            height={210}
            id="canvas"
            data={this.state.chartData}
            options={{
              responsive: true,
              tooltips: {
                enabled: false,
                display: false,
                backgroundColor: "none",
                labelTextColor: "black",
                titleFontSize: 14,
                callbacks: {
                  label: function(tooltipItem, data) {
                    var label =
                      data.datasets[tooltipItem.datasetIndex].label || "";

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
            }}
            getDatasetAtEvent={dataset => console.log(dataset[0])}
            onElementsClick={async elems => {
              var activePoint = elems[0];
              var data = activePoint._chart.data;
              var datasetIndex = activePoint._datasetIndex;
              var value = data.datasets[datasetIndex].data[activePoint._index];

              console.log(value);
              this.handleClickColor();
              var ismail =
                elems[0]._chart.config.data.datasets[0].backgroundColor;
              ismail = "red";
              console.log(ismail);
              this.setState({ colorBack: "white" });
            }}
          />
        </div>
      </div>
    );
  }
}
