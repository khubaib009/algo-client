import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class StockGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performance: false
    };
  }
  generateDataPoints() {
    const { date, Another } = this.props;
    if (!date || !Another || date.length !== Another.length) {
      return [];
    }
    const dataPoints = date.map((data, index) => {
      const dataPoint = {
        x: new Date(data),
      };
     

      // Add values for each index to the data point
      Object.keys(Another[index]).forEach((key) => {
        if (key !== "Date") {
          // Exclude 'Date' property
          dataPoint[key] = Another[index][key];
        }
      });
      return dataPoint;
    });
    return dataPoints;
  }
  render() {
    const { performance } = this.state;
    const { width, height } = this.props;
    const dataKeys = this.props.Another[0]
      ? Object.keys(this.props.Another[0]).filter((key) => key !== "Date")
      : [];
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: false,
            },
            maximum: new Date(), // Set maximum to current date
            minimum: new Date(new Date().setMonth(new Date().getMonth() - 3)), 
          },
          axisY: {
            crosshair: {
              enabled: true,
            },
          },
          data: dataKeys.map((key) => ({
            type: "spline",
            dataPoints: this.generateDataPoints().map((dataPoint) => ({
              x: dataPoint.x,
              y: dataPoint[key],
            })),
            showInLegend: true,
            legendText: key.replace("_", " "), // Replace underscores with spaces for legend
          })),
        },
      ],
    };

    const containerProps = {
      width: width || "100%",
      height: height || "300px",
      margin: "auto",
    };

    return (
      <div>
       
        <div>
        <i className="bi bi-info-circle iconesize"
          onMouseEnter={() => {
            this.setState({ performance: true });
          }}
          onMouseLeave={() => {
            this.setState({ performance: false });
          }}
          ></i>
           {performance && (
  <div className="notification-box-drag-graph">
    Discover the transformative potential of our "Optimized S&P
    Strategy," a groundbreaking approach meticulously crafted by
    our distinguished Quant Team. Set against the backdrop of th
  </div>
)}
        
        

          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
          />
        </div>
       
        
      </div>
    );
  }
}

export default StockGraph;
