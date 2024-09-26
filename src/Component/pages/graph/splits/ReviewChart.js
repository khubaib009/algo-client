import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph2 extends Component {
    constructor(props) {
      console.log('props',props);
      super(props);
      const { Graphdata } = props;
      const indices = {
        oMonth: Math.floor((Graphdata.length * 30) / 100).toFixed(2),
        sixMonth: Math.floor((Graphdata.length * 60) / 100).toFixed(2),
        nineMonth: Math.floor((Graphdata.length * 75) / 100).toFixed(2),
        twelveMonth: Graphdata.length,
      };

      this.dataPoints = {};
  
      // Using reduce to accumulate the Close values for each percentage range
      Object.keys(indices).forEach((key) => {
        const endIndex = indices[key];
        const slicedData = Graphdata.slice(0, endIndex);
  
        // Calculate cumulative count for each percentage range
        const cumulativeCount = slicedData.reduce(
          (accumulator, item) => accumulator + item.Close,
          0
        );
  
        this.dataPoints[key] = {
          label: `${key} (${endIndex}%)`,
          y: cumulativeCount,
          indexLabel: `$${cumulativeCount.toFixed(2)}`,
          indexLabelFontColor: "#ffff",
          indexLabelPlacement: "inside",
        };
      });
    }
  
    render() {
      const options = {
        backgroundColor: "transparent",
        height: 300,
        axisX: {
          label: false,
        },
        axisY: {
          labelFormatter: () => "",
        },
        data: [
          {
            type: "column",
            color: "#295f4f",
            dataPoints: Object.values(this.dataPoints),
          },
        ],
      };
  
      return (
        <div className="col-lg-6">
        <div className="card">
          <div className="pb-0 p-3">
            <h5 className="mb-0 font-weight-bolder">
              Performance Review
            </h5>
          </div>
          <div className="card-body p-3">
          <CanvasJSChart options={options} />
          </div>
              </div>
            </div>
      );
    }
  }
  
  
  

export default Graph2;
