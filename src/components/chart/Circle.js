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
      chartOption: {}
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
  }

  render() {
    return (
      <div style={{ height: "150px", width: "180px", margin: "0" }}>
        <Doughnut
          data={{
            labels: ["Red", "Blue", "Yellow"],
            datasets: [
              {
                data: [70, 200, 100],
                backgroundColor: ["#ffc371", "#254ebe", "#f0f0f0"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
              }
            ]
          }}
          options={{ ...circleOptions }}
        />
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
