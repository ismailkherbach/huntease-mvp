import * as React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject
} from "@syncfusion/ej2-react-charts";
export let data1 = [
  {
    x: "United States",
    y: 45,
    text: "USA",
    fill: "#FF9A7A",
    explodeOff: "10%"
  },
  {
    x: "Australia",
    y: 53,
    text: "AUS: 14%",
    fill: "#FF9A7A",
    explodeOff: "20%"
  },
  { x: "China", y: 56, text: "CHN", fill: "#FF9A7A", explodeOff: "5%" }
];
export default class AccumulationDoughnut extends React.Component {
  render() {
    return (
      <div className="control-pane">
        <div style={{ height: "350px", width: "350px", margin: "0" }}>
          <AccumulationChartComponent
            id="pie-chart"
            //title="Project Cost Breakdown"
            legendSettings={{
              visible: false,
              position: "left"
            }}
            enableSmartLabels={true}
            //load={this.load.bind(this)}
            tooltip={{ enable: true }}
            //loaded={this.onChartLoad.bind(this)}
          >
            <Inject
              services={[AccumulationLegend, PieSeries, AccumulationDataLabel]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                //    name="Project"
                dataSource={data1}
                xName="y"
                yName="y"
                innerRadius="40%"
                fill="fill"
                startAngle={0}
                endAngle={360}
                radius="40%"
                explode={true}
                explodeOffset="10%"
                explodeIndex={0}
                explodeIndex={1}
                dataLabel={{
                  visible: true,
                  name: "y",
                  position: "Inside",
                  font: {
                    fontWeight: "600",
                    color: "#ffffff"
                  }
                }}
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    );
  }
  onChartLoad(args) {
    document.getElementById("pie-chart").setAttribute("title", "");
  }
}
