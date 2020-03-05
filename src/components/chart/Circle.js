import React from "react";
import { Chart, Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import { getCalls } from "../../redux/actions";
import { circleOptions } from "./chartConfig/config";

class CircleChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      chartData: {},
      chartOption: {},
      circleData: {}
    };
  }

  componentDidMount() {
    Chart.pluginService.register({
      afterUpdate(chart) {
        let helpers;
        let centerConfig;
        let globalConfig;
        let ctx;
        let fontStyle;
        let fontFamily;
        let fontSize;
        if (chart.config.options.elements.center) {
          helpers = Chart.helpers;
          centerConfig = chart.config.options.elements.center;
          globalConfig = Chart.defaults.global;
          ctx = chart.chart.ctx;

          fontStyle = helpers.getValueOrDefault(
            centerConfig.fontStyle,
            globalConfig.defaultFontStyle
          );
          fontFamily = helpers.getValueOrDefault(
            centerConfig.fontFamily,
            globalConfig.defaultFontFamily
          );

          if (centerConfig.fontSize) {
            fontSize = centerConfig.fontSize;
          } else {
            ctx.save();
            fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);

            ctx.restore();
          }
          const newChart = chart;
          newChart.center = {
            font: helpers.fontString(fontSize, fontStyle, fontFamily),
            fillStyle: helpers.getValueOrDefault(
              centerConfig.fontColor,
              globalConfig.defaultFontColor
            )
          };
        }
      },
      afterDraw(chart) {
        if (chart.center) {
          const centerConfig = chart.config.options.elements.center;
          const ctx = chart.chart.ctx;

          ctx.save();
          ctx.font = chart.center.font;
          ctx.fillStyle = chart.center.fillStyle;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

          let helpers = Chart.helpers;
          let fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
          let text = centerConfig.text.split(" ");
          ctx.fillText(text[0], centerX, centerY - fontSize / 2);
          ctx.fillText(text[1], centerX, centerY + fontSize / 2);

          ctx.restore();
        }
      }
    });

    var ctx = document.getElementById("canvas").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 70);
    gradient.addColorStop(0, "#FFCF9F");
    gradient.addColorStop(0.5, "#FFB089");
    gradient.addColorStop(1, "#FF9A7A");

    const circleData = {
      labels: ["Calls past 2 minutes", "Answered calls", "All calls"],
      datasets: [
        {
          data: [80, 150, 100],
          backgroundColor: [gradient, "white", "white"],
          hoverBackgroundColor: [gradient, "white", "white"],
          borderWidth: 0,
          label: "Doughnut 2"
        },
        {
          data: [80, 150, 100],
          backgroundColor: [gradient, "#254EBE", "#F0F0F0"],
          hoverBackgroundColor: [gradient, "#254EBE", "#F0F0F0"],
          borderWidth: 1,
          borderColor: [gradient, "#254EBE", "#F0F0F0"],
          label: "Doughnut 3"
        },
        {
          data: [80, 150, 100],
          backgroundColor: [gradient, "#254EBE", "white"],
          hoverBackgroundColor: [gradient, "#254EBE", "white"],
          borderWidth: 0,

          label: "Doughnut 4"
        },
        {
          data: [80, 150, 100],
          backgroundColor: [gradient, "white", "white"],
          hoverBackgroundColor: [gradient, "white", "white"],
          borderWidth: 1,
          borderColor: [gradient, "white", "white"],
          label: "Doughnut 5"
        }
      ]
    };

    this.setState({ circleData: circleData });
  }

  render() {
    return (
      <div style={{ height: "150px", width: "180px", margin: "0" }}>
        <Doughnut data={this.state.circleData} options={{ ...circleOptions }} />
      </div>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard
  };
};
export default connect(mapStateToProps, {
  getCalls
})(CircleChart);
