import React, { Component } from "react";
import { Chart, Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { getPerformance } from "../../redux/actions";
import { lineOptions } from "./chartConfig/config";
class PerformanceGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      chartOption: {},
      colorBack: "red",
      cack: {},
      compareArray: [],
      compare: null,
      lineLabels: [],
      lineData: [],
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

  DrawShadow() {
    let draw = Chart.controllers.line.prototype.draw;

    Chart.controllers.line = Chart.controllers.line.extend({
      draw: function() {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function() {
          ctx.save();
          ctx.shadowColor = "#FFF0E8";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          _stroke.apply(this, arguments);
          ctx.restore();
        };
      },
    });

    Chart.pluginService.register({
      beforeRender: function(chart) {
        if (chart.config.options.showAllTooltips) {
          // create an array of tooltips
          // we can't use the chart tooltip because there is only one tooltip per chart
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function(dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function(sector, j) {
              chart.pluginTooltips.push(
                new Chart.Tooltip(
                  {
                    _chart: chart.chart,
                    _chartInstance: chart,
                    _data: chart.data,
                    _options: chart.options.tooltips,
                    _active: [sector],
                  },
                  chart
                )
              );
            });
          });

          // turn off normal tooltips
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: function(chart, easing) {
        if (chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
            if (easing !== 1) return;
            chart.allTooltipsOnce = true;
          }

          // turn on tooltips
          chart.options.tooltips.enabled = true;
          Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
            tooltip.initialize();
            tooltip.update();
            // we don't actually need this since we are not animating tooltips
            tooltip.pivot();
            tooltip.transition(easing).draw();
          });
          chart.options.tooltips.enabled = false;
        }
      },
    });

    Chart.defaults.lineWithLine = Chart.defaults.line;
    Chart.controllers.lineWithLine = Chart.controllers.line.extend({
      draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0];
          var ctx = this.chart.ctx;
          var x = activePoint.tooltipPosition().x;
          var topY = this.chart.scales["y-axis-0"].top;
          var bottomY = this.chart.scales["y-axis-0"].bottom;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(0,0,0,0.1)";
          ctx.stroke();
          ctx.restore();
        }
      },
    });

    Chart.helpers.extend(Chart.controllers.line.prototype, {
      fireSliderEvent: function(point, canvas, boundingRect) {
        var mouseX = Math.round(
          (((boundingRect.left + point._view.x) /
            (boundingRect.right - boundingRect.left)) *
            canvas.width) /
            this.chart.chart.currentDevicePixelRatio
        );
        var mouseY = Math.round(
          (((boundingRect.top + point._view.y) /
            (boundingRect.bottom - boundingRect.top)) *
            canvas.height) /
            this.chart.chart.currentDevicePixelRatio
        );
        var oEvent = document.createEvent("MouseEvents");
        oEvent.initMouseEvent(
          "click",
          true,
          true,
          document.defaultView,
          0,
          mouseX,
          mouseY,
          mouseX,
          mouseY,
          false,
          false,
          false,
          false,
          0,
          canvas
        );
        canvas.dispatchEvent(oEvent);
      },
      highlightPoints: function(point) {
        var canvas = this.chart.chart.canvas;
        var boundingRect = canvas.getBoundingClientRect();
        var points = this.getDataset().metaData;
        this.fireSliderEvent(points[point], canvas, boundingRect);
      },
    });
  }

  componentDidMount() {
    //your code
    // console.log(this.props.dashboard.lineLabels);
    //console.log(this.props.dashboard.lineData);
    this.DrawShadow();

    var ctx = document.getElementById("canvas").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 70);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "#FFF8EF");
    gradient.addColorStop(1, "#FFEED8");
    // console.log(gradient);
    this.setState({ colorBack: gradient }, () =>
      //console.log(this.state.colorBack),
      this.setState({ colorBack: "white" })
    );

    const newData = {
      labels: this.props.lineLabels,
      datasets: [
        {
          type: "line",
          backgroundColor: "#FFB58D",
          pointRadius: 0,
          pointHoverBorderWidth: 10,
          pointHoverRadius: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 5,
          borderColor: "#FFB58D",
          fill: false,
          pointBackgroundColor: "white",
          pointBorderColor: "white",
          data: this.props.lineData,
          datalabels: {
            align: "end",
            anchor: "end",
            fontStyle: "bold",
          },
        },
        {
          type: "bar",

          backgroundColor: "white",

          pointRadius: 4,
          hoverBackgroundColor: gradient,
          pointHoverRadius: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderRadius: 5,
          fill: false,
          data: [200, 200, 200, 200, 200, 200, 200],
          datalabels: {
            fontStyle: "bold",
          },
        },
      ],
    };

    var newOptions = {
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
              backgroundColor: "#254ebe",
            };
          },
          labelTextColor: function(tooltipItem, chart) {
            return "#254ebe";
          },
        },
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
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              beginAtZero: true,
              fontFamily: "Rubik",
              fontColor: "#c4cfef",
              fontSize: 12,
              fontStyle: "bold",
            },
          },
        ],
        yAxes: [
          {
            display: false,

            gridLines: {
              offsetGridLines: true,
              display: false,
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              stepSize: 40,
              beginAtZero: true,
              fontFamily: "Rubik",
              fontColor: "#c4cfef",
              fontSize: 12,
            },
          },
        ],
      },
      title: {
        display: false,
        text: "",
      },
    };
    this.setState({ chartData: newData, chartOption: newOptions });
    this.setState({ colorBack: gradient });
  }

  render() {
    return (
      <div>
        <div className="graph">
          <Line
            height={220}
            width={400}
            id="canvas"
            data={{
              labels: this.props.lineLabels,
              datasets: [
                {
                  type: "line",
                  backgroundColor: "#FFB58D",
                  pointRadius: 0,
                  pointHoverBorderWidth: 10,
                  pointHoverRadius: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderWidth: 5,
                  borderColor: "#FFB58D",
                  fill: false,
                  pointBackgroundColor: "white",
                  pointBorderColor: "white",
                  data: this.props.lineData,
                  datalabels: {
                    align: "end",
                    anchor: "end",
                    fontStyle: "bold",
                  },
                },
                {
                  type: "bar",

                  backgroundColor: "white",

                  pointRadius: 4,
                  //   hoverBackgroundColor: gradient,
                  hoverBackgroundColor: "white",
                  pointHoverRadius: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderRadius: 5,
                  fill: false,
                  data: [200, 200, 200, 200, 200, 200, 200],
                  datalabels: {
                    fontStyle: "bold",
                  },
                },
              ],
            }}
            options={{ ...lineOptions }}
            getDatasetAtEvent={(dataset) => console.log(dataset[0])}
            onElementsClick={async (elems) => {
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

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard,
  };
};
export default connect(mapStateToProps, {
  getPerformance,
})(PerformanceGraph);
