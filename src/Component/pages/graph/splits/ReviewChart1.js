import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph2 extends Component {

    constructor(props) {
      super(props);
      this.state = {
        performance: false
      };
      const { Graphdata } = props;
      console.log(Graphdata)
      var indices =[];
      if(Graphdata.length <= 4){
         var indices = {
            threeMonth: 0, 
            sixMonth:1,
           nineMonth:2,
            twelveMonth: Graphdata.length-1
        };
      }else{
      var indices = {
        oneMonth: 0, // First value of the array
        threeMonth: Math.floor((Graphdata.length * 25) / 100), // 30% of the array
        sixMonth: Math.floor((Graphdata.length * 50 ) / 100), // 60% of the array
        nineMonth: Math.floor((Graphdata.length * 70 ) / 100), // 60% of the array
        twelveMonth: Graphdata.length -1 // Last value of the array
    };
}
      this.dataPoints = {};
      console.log('indices:', indices);
      // Using reduce to accumulate the Close values for each percentage range
      Object.keys(indices).forEach((key) => {
        const endIndex = indices[key];
        const slicedData = Graphdata[endIndex];
        const cumulativeCount = slicedData?.Close;
        console.log('slicedData',slicedData);
        console.log('cumulativeCount:', cumulativeCount);
        
         const date = slicedData.Date
  
  
        this.dataPoints[key] = {    
          label: `${date.split("T")[0]}`,
          y: cumulativeCount,
          indexLabel: `$${cumulativeCount.toFixed(2)}`,
          indexLabelFontColor: "#ffff",
          indexLabelPlacement: "inside",
        };
      });
    }
  
    render() {
      const { performance } = this.state;

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
              <i className="bi bi-info-circle m-2 iconesize"
                        onMouseEnter={() => {
                          this.setState({ performance: true });
                        }}
                        onMouseLeave={() => {
                          this.setState({ performance: false });
                        }}
                        ></i>
                         {performance && (
                <div className="notification-box-drag-tran">
                  Discover the transformative potential of our "Optimized S&P
                  Strategy," a groundbreaking approach meticulously crafted by
                  our distinguished Quant Team. Set against the backdrop of th
                </div>
              )}
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
