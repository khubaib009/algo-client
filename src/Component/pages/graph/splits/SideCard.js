import React, { useState } from "react";

const SideCard = ({ ArrData }) => {

  const [cumulativereturn, setcumulativevalue] = useState(false);
  const [ratiovalue, setRatiovalue] = useState(false);

  const [positivevaluentification, setPositivenotification] = useState(false);

  const [negativevaluenotification, setnegativevaluenotificaion] = useState(false);


  const circumference = 2 * Math.PI * 45;

  const cumulative = ArrData.cumulative_pct_change;
  const cumulativevalue = Math.round(cumulative * 100) / 100;
  var persentagecumulativevalue = Math.round(cumulativevalue);
  const strokeDasharraycumulative = persentagecumulativevalue > 100 ? (100 / 100) * circumference : (persentagecumulativevalue / 100) * circumference;  // Calculate the strokeDasharray based on the percentage
  const strokeDashoffsetcumulative = circumference - strokeDasharraycumulative;


  const hit_radio = ArrData.hit_ratio;
  const hit_ratio_value = Math.round(hit_radio * 100) / 100;
  const percentagehit_ratio_value = hit_ratio_value * 100; // Convert 0.88 to 88
  const strokeDasharrayhit_ratio_value = (percentagehit_ratio_value / 100) * circumference;
  const strokeDashoffsethit_ratio_value = circumference - strokeDasharrayhit_ratio_value;


  const positive_week = ArrData.positive_weeks_pct;
  const positive_week_value = Math.round(positive_week * 100) / 100;
  const persentagepositive_week_value = Math.round(positive_week_value);
  const strokeDasharraypositive_week = (persentagepositive_week_value / 100) * circumference;
  const strokeDashoffsetpositive_week = circumference - strokeDasharraypositive_week;


  const negative_week = ArrData.negative_weeks_pct;
  const negative_week_value = Math.round(negative_week * 100) / 100;
  const persentagenegative_week_value = Math.round(negative_week_value);
  const strokeDasharray = (persentagenegative_week_value / 100) * circumference;
  const strokeDashoffset = circumference - strokeDasharray;
  return (
    <div className="col-lg-6">
      <div className="row bottomboxvalue">
        <div
          className="card col-5 graph"
          style={{ height: "140px", borderRadius: "20px" }}
        >
          <div className="numbers">
            <div className="row">
              <div className="col-6 p-3">
                <p className="text-sm mb-0 font-weight-bold cardtext">
                  Cumulative
                  Returns
                  <i className="bi bi-info-circle circlicone"
                    onMouseEnter={() => {
                      setcumulativevalue(true);
                    }}
                    onMouseLeave={() => {
                      setcumulativevalue(false);
                    }}
                  ></i>
                  {cumulativereturn && (
                    <div className="notification-box-drag-card">
                      Discover the transformative potential of our "Optimized S&P
                      Strategy," a groundbreaking approach meticulously crafted by
                      our distinguished Quant Team. Set against the backdrop of th
                    </div>
                  )}
                </p>
                <h5 className="font-weight-bolder"></h5>
                <p className="mb-0 mt-4">
                  <span className="text-sm font-weight-bolder amountcard">
                    {cumulativevalue}
                  </span>
                  {/* <p className="text-sm font-weight-bolder secondtext">
                  7.28% ROI
                </p> */}
                </p>
              </div>
              <div className="col-6">
                <div id="circleProgress6" className="progressbar-js-circle rounded p-3" >
                  <svg
                    viewBox="0 0 100 100"
                    style={{ display: "block", width: "70px" }}
                    className="circle"
                  >
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#437769"
                      strokeWidth={10}
                      fillOpacity={0}
                    />
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#b5f1d5"
                      strokeWidth={10}
                      fillOpacity={0}
                      style={{
                        strokeDasharray: `${strokeDasharraycumulative}, ${circumference}`,
                        strokeDashoffset: strokeDashoffsetcumulative,
                      }}
                    />
                    <text
                      x="50"
                      y="50"
                      fontFamily="Arial"
                      fontSize="1rem"
                      fontWeight="700"
                      fill="rgb(181, 241, 213)"
                      textAnchor="middle"
                      transform="translate(-50%, -50%)"
                    >
                      {cumulativevalue}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card col-5 graph"  style={{ height: "140px", borderRadius: "20px" }} >
          <div className="numbers">
            <div className="row">
              <div className="col-6 p-3">
                <p className="text-sm mb-0 font-weight-bold cardtext">
                  Hit Ratio
                  <i
                    className="bi bi-info-circle circlicone"
                    onMouseEnter={() => {
                      setRatiovalue(true);
                    }}
                    onMouseLeave={() => {
                      setRatiovalue(false);
                    }}
                  ></i>
                  {ratiovalue && (
                    <div className="notification-box-drag-card">
                      Discover the transformative potential of our "Optimized S&P
                      Strategy," a groundbreaking approach meticulously crafted by
                      our distinguished Quant Team. Set against the backdrop of th
                    </div>
                  )}
                </p>
                <h5 className="font-weight-bolder"></h5>
                <p className="mb-0 mt-4">
                  <span className="text-sm font-weight-bolder amountcard">
                    {hit_ratio_value}
                  </span>
                  {/* <p className="text-sm font-weight-bolder secondtext">
                  7.28% ROI
                </p> */}
                </p>
              </div>
              <div className="col-6">
                <div
                  id="circleProgress6"
                  className="progressbar-js-circle rounded p-3"
                >
                  <svg
                    viewBox="0 0 100 100"
                    style={{ display: "block", width: "70px" }}
                    className="circle"
                  >
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#437769"
                      strokeWidth={10}
                      fillOpacity={0}
                    />
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#b5f1d5"
                      strokeWidth={10}
                      fillOpacity={0}
                      style={{
                        strokeDasharray: `${strokeDasharrayhit_ratio_value}, ${circumference}`,
                        strokeDashoffset: strokeDashoffsethit_ratio_value,
                      }}
                    />
                    <text
                      x="50"
                      y="50"
                      fontFamily="Arial"
                      fontSize="1rem"
                      fontWeight="700"
                      fill="rgb(181, 241, 213)"
                      textAnchor="middle"
                      transform="translate(-50%, -50%)"
                    >
                      {percentagehit_ratio_value}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row bottomboxvalue">
        <div
          className="card col-5 graph"
          style={{ height: "140px", borderRadius: "20px" }}
        >
          <div className="numbers">
            <div className="row">
              <div className="col-6 p-3">
                <p className="text-sm mb-0 font-weight-bold cardtext">
                  Positive Week
                  <i
                    className="bi bi-info-circle circlicone"
                    onMouseEnter={() => {
                      setPositivenotification(true);
                    }}
                    onMouseLeave={() => {
                      setPositivenotification(false);
                    }}
                  ></i>
                  {positivevaluentification && (
                    <div className="notification-box-drag-card">
                      Discover the transformative potential of our "Optimized S&P
                      Strategy," a groundbreaking approach meticulously crafted by
                      our distinguished Quant Team. Set against the backdrop of th
                    </div>
                  )}
                </p>
                <h5 className="font-weight-bolder"></h5>
                <p className="mb-0 mt-4">
                  <span className="text-sm font-weight-bolder amountcard">
                    {persentagepositive_week_value}{" "}
                  </span>
                  {/* <p className="text-sm font-weight-bolder secondtext">
                  7.28% ROI
                </p> */}
                </p>
              </div>
              <div className="col-6">
                <div
                  id="circleProgress6"
                  className="progressbar-js-circle rounded p-3"
                >
                  <svg
                    viewBox="0 0 100 100"
                    style={{ display: "block", width: "70px" }}
                    className="circle"
                  >
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#437769"
                      strokeWidth={10}
                      fillOpacity={0}
                    />
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#b5f1d5"
                      strokeWidth={10}
                      fillOpacity={0}
                      style={{
                        strokeDasharray: `${strokeDasharraypositive_week}, ${circumference}`,
                        strokeDashoffset: strokeDashoffsetpositive_week,
                      }}
                    />
                    <text
                      x="50"
                      y="50"
                      fontFamily="Arial"
                      fontSize="1rem"
                      fontWeight="700"
                      fill="rgb(181, 241, 213)"
                      textAnchor="middle"
                      transform="translate(-50%, -50%)"
                    >
                      {persentagepositive_week_value}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card col-5 graph"
          style={{ height: "140px", borderRadius: "20px" }}
        >
          <div className="numbers">
            <div className="row">
              <div className="col-6 p-3">
                <p className="text-sm mb-0 font-weight-bold cardtext">
                  Negative Weeks
                  <i
                    className="bi bi-info-circle circlicone"
                    onMouseEnter={() => {
                      setnegativevaluenotificaion(true);
                    }}
                    onMouseLeave={() => {
                      setnegativevaluenotificaion(false);
                    }}
                  ></i>
                  {negativevaluenotification && (
                    <div className="notification-box-drag-card">
                      Discover the transformative potential of our "Optimized S&P
                      Strategy," a groundbreaking approach meticulously crafted by
                      our distinguished Quant Team. Set against the backdrop of th
                    </div>
                  )}
                </p>
                <h5 className="font-weight-bolder"></h5>
                <p className="mb-0 mt-4">
                  <span className="text-sm font-weight-bolder amountcard">
                    {persentagenegative_week_value}
                  </span>
                </p>
              </div>
              <div className="col-6">
                <div
                  id="circleProgress6"
                  className="progressbar-js-circle rounded p-3"
                >
                  <svg
                    viewBox="0 0 100 100"
                    style={{ display: "block", width: "70px" }}
                    className="circle"
                  >
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#437769"
                      strokeWidth={10}
                      fillOpacity={0}
                    />
                    <path
                      d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
                      stroke="#b5f1d5"
                      strokeWidth={10}
                      fillOpacity={0}
                      style={{

                        strokeDashoffset: strokeDashoffset,
                        strokeDasharray: `${strokeDasharray}, ${circumference}`,
                      }}
                    />
                    <text
                      x="50"
                      y="50"
                      fontFamily="Arial"
                      fontSize="1rem"
                      fontWeight="700"
                      fill="rgb(181, 241, 213)"
                      textAnchor="middle"
                      transform="translate(-50%, -50%)"
                    >
                      {persentagenegative_week_value}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCard;
