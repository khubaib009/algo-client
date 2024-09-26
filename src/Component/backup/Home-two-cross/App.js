import React, { useState } from 'react';
import DatetimeRangePicker from "react-datetime-range-picker";
import './index.css';
import { useMediaQuery } from 'react-responsive';




const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [Str_Data_key, setStr_Data_key] = useState([]);
  const [StrData_key, setStrData_key] = useState([]);
  const [TableData_key, setTableData_key] = useState([]);

  const handleClick = (key, setKey, value) => {
    // Check if value exists in the array
    const index = key.indexOf(value);

    if (index !== -1) {
      // If value exists, remove it from the array
      setKey((prevState) => prevState.filter((item) => item !== value));
    } else {
      // If value does not exist, push it to the array
      setKey((prevState) => [...prevState, value]);
    }
  };

  const TableData = () => {
    return (
      <div >
        <div className="matrix-container m-2">
          {/* <table className="matrix-table"> */}
          <table className={`matrix-table strategy ${TableData_key.includes(1) ? 'active' : ''}`}>
            <thead>
              <tr >
                <th
                className='p-1'
                  style={{ cursor: "pointer" }}
                  colSpan={2}
                  onClick={() => handleClick(TableData_key, setTableData_key, 1)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Instrument Y</span>
                    <span><i className={`fa fa-chevron-${TableData_key.includes(1) ? 'up' : 'down'}`} /></span>
                  </div>
                </th>


              </tr>
            </thead>
            <thead
              className={`${TableData_key.includes(1) ? '' : 'none'}`}
            >
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody
              className={`collapse ${TableData_key.includes(1) ? 'show' : ''}`}
              id={`collapseExample${1}`}
            >
              <tr>
                <td>Capital Investment</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Profit / Loss</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>ROI</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Total Number of Trades</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Number of Positive Trades</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Number of Negative Trades</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Sharpe Ratio</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Number of Days Trading</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Exchange</td>
                <td>
                  0.5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`Y-connect ${TableData_key.includes(1) ? 'show' : ''}`}></div>
        <div className="matrix-container m-2">
          {/* <table className="matrix-table"> */}
          <table className={`matrix-table strategy ${TableData_key.includes(2) ? 'active' : ''}`}
                        
          >
            <thead>
              <tr >
                <th
                  style={{ cursor: "pointer" }}
                  colSpan={2}
                  className='p-1'
                  onClick={() => handleClick(TableData_key, setTableData_key, 2)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Instrument X</span>
                    <span><i className={`fa fa-chevron-${TableData_key.includes(2) ? 'up' : 'down'}`} /></span>
                  </div>
                </th>
              </tr>
            </thead>
            <thead
              className={`${TableData_key.includes(2) ? '' : 'none'}`}
            >
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody
              className={`collapse ${TableData_key.includes(2) ? 'show' : ''}`}
              id={`collapseExample${1}`}
            >
              <tr>
                <td>Capital Investment</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Profit / Loss</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>ROI</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Total Number of Trades</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Number of Positive Trades</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Number of Negative Trades</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Sharpe Ratio</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Number of Days Trading</td>
                <td>
                  0.5
                </td>
              </tr>
              <tr>
                <td>Exchange</td>
                <td>
                  0.5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`Y-connect ${TableData_key.includes(2) ? 'show' : ''}`}></div>
      </div>
    )
  }

  const Str_Data = ({ id = 0 }) => {
    const componentsArray = [];
    for (let i = 1; i <= 8; i++) {
      componentsArray.push(
        <div >
          <div className="matrix-container m-2">
            <table className={`matrix-table strategy ${Str_Data_key.includes(i) ? 'active' : ''}`}>
              <thead>
                <tr >
                  <th
                    style={{ cursor: "pointer" }}
                    colSpan={2}
                    className='p-1'
                    onClick={() => handleClick(Str_Data_key, setStr_Data_key, i)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Strategy {i}</span>
                      <span><i className={`fa fa-chevron-${Str_Data_key.includes(i) ? 'up' : 'down'}`} /></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <thead
                className={`${Str_Data_key.includes(i) ? '' : 'none'}`}
              >
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody
                className={`collapse ${Str_Data_key.includes(i) ? 'show' : ''}`}
                id={`collapseExample${i}`}
              >
                <tr>
                  <td>Capital Investment</td>
                  <td>
                    0.5
                  </td>
                </tr>
                <tr>
                  <td>Profit / Loss</td>
                  <td>
                    0.5
                  </td>
                </tr>
                <tr>
                  <td>ROI</td>
                  <td>
                    0.5
                  </td>
                </tr>
                <tr>
                  <td>Number of Days Trading	</td>
                  <td>
                    0.5
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className={`Y-connect ${Str_Data_key.includes(i) ? 'show' : ''}`}></div>
          <div className={`X-connect ${Str_Data_key.includes(i) ? 'show' : 'none'}`}></div>
        </div>
      );
    }
    return componentsArray;
  }

  const StrData = () => {
    return (<div >
      <div className="matrix-container m-2">
        <table className="matrix-table">
          <thead>
            <tr>
              <th
                className="head"
                style={{ cursor: "pointer" }}
                colSpan={2}
                onClick={() => handleClick(StrData_key, setStrData_key, 1)}
              >
                Overall Stratagem Fund{"  "}<i className={`fa fa-chevron-${StrData_key.includes(1) ? 'up' : "down"}`} aria-hidden="true" />
              </th>
            </tr>
          </thead>
          <thead
            className={`${StrData_key.includes(1) ? '' : 'none'}`}
          >
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody
            className={`collapse ${StrData_key.includes(1) ? 'show' : ''}`}
            id={`collapseExample${1}`}
          >
            <tr>
              <td>Number of Strategies Deployed	</td>
              <td>
                0.5
              </td>
            </tr>
            <tr>
              <td>Overall Capital Investment	</td>
              <td>
                0.5
              </td>
            </tr>
            <tr>
              <td>ROI</td>
              <td>
                0.5
              </td>
            </tr>
            <tr>
              <td>Number of Days Trading	</td>
              <td>
                0.5
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>);
  }

  return (
    <div>
      <div className={`light-mode`}>
        <div className="header-nav">
          <div className="">
            <div style={{ display: 'flex', justifyContent:"space-around",alignItems:"center"}}>
              <div
                className='logoimg'
                style={{color: 'white', cursor: "pointer"}}
              >
                <img src="logo.png" width="150px" alt="Logo" /></div>
           <span className='Range'>
            <DatetimeRangePicker />
           </span>
            </div>
          </div>
        </div>
        <div className="parent adjusted">
          <div className={`div1 ${Str_Data_key.length > 0 ? 'half_s show' : StrData_key.includes(1) > 0 ? 'half show' : "full"}`}>
            <StrData id={1} />
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line1' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line2' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line3' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line4' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line5' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line6' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line7' : 'none'}`}></div>
            <div className={`line-connect ${Str_Data_key.length > 0 ? 'show' : StrData_key.includes(1) ? 'show line8' : 'none'}`}></div>
          </div>
          <div className={`div2 ${Str_Data_key.length > 0 ? 'half_s show' : StrData_key.includes(1) > 0 ? 'half' : "none"}`}>
            <Str_Data id={1} />
          </div>
          <div className={`div3 ${Str_Data_key.length > 0 ? 'half_s show' : StrData_key.includes(1) ? 'none' : "none"}`}>
            <TableData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
