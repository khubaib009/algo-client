import React from "react";
import "./topfivestocks.css";

const Index = ({responsevalue}) => {

  return (
    <div id="pdf-content" className={`light-mode`}>
      <div className="col-lg-12 m-2">
        <div className="row bottombox">
          {responsevalue &&
            responsevalue.map((item) => (
              <div className="card col-6 graphvalue">
                <div className="numbers">
                  <div className="row">
                    <div className="col-6 p-3">
                      <p className="text-sm mb-0 font-weight-bold cardtextvalue">
                        {item}
                      </p>
                      <h5 className="font-weight-bolder"></h5>
                      <p className="mb-0 mt-4">
                        <span className="text-sm font-weight-bolder amountcard">
                          {/* {cumulativevalue} */}
                        </span>
                        {/* <p className="text-sm font-weight-bolder secondtext">
                            7.28% ROI
                          </p> */}
                      </p>
                    </div>
                    <div className="col-6">
                      <div
                        id="circleProgress6"
                        className="progressbar-js-circle rounded p-1">
                        <svg viewBox="0 0 100 100" className="circlevalue">
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
                              strokeDasharray: "282.783, 282.783",
                              strokeDashoffset: "70.6958",
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
                          75%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
