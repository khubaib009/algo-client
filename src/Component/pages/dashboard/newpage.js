import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../../utils/Function";
import Header from "./header";
import "./style.css";
import {
  BACKTESTRUN,
  RECOMMENDSTOCK,
  SAVE,
  LOGOUT,
} from "../../utils/ApiRoute";
import Topstock from "../top_stock/Index";
import "bootstrap-icons/font/bootstrap-icons.css";
import Youtubevideo from "./youtbevideo";

const Newpage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [dragedButtons, setDragedButtons] = useState(["Optimized S&P"]);
  const [strategy, setstrategy] = useState(true);
  const [category2, setcategory2] = useState(false);
  const [category3, setcategory3] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [informationicon, setinformationIcone] = useState(true);
  const [securityNotification, setSecurityNotification] = useState(false);
  const [Getstart, setGetstart] = useState(false);
  const [seeResultbutton, setSeeResultbutton] = useState(false);
  const [spNotificationdrag, setSpNotificationdrag] = useState(false);
  const [alphaNotification, setalphaNotification] = useState(false);
  const [momentNotification, setmomentNotification] = useState(false);
  const [balanceNotification, setbalanceNotification] = useState(false);
  const [startdateNotification, setstartdateNotification] = useState(false);
  const [enddateNotification, setenddateNotification] = useState(false);
  const [nameNotification, setnameNotification] = useState(false);
  const [showStock, setshowStock] = useState(false);
  const [loading, setLoading] = useState(false); 
   const [dashboardloading, setdashboardLoading] = useState(false);


   useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 990); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setGetstart(true);
    const timeoutId = setTimeout(() => {
      setGetstart(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const [droppedButtons, setDroppedButtons] = useState([]);

useEffect(()=>{
  const buttonvalue = localStorage.getItem("droppedbutton") ;
  if(buttonvalue != null){
    setDroppedButtons([buttonvalue]);
    setDragedButtons([])
  }
},[])
  
 const DropZone = ({ onDrop, preArray, children }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "BUTTON",
      drop: (item) => {
        if (!preArray.includes(item.label)) onDrop(item.label);
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });
    return <div ref={drop}>{children}</div>;
  };

  const handleDrop = (label) => {
    handleRemove(label);
    setDroppedButtons((prevButtons) => [...prevButtons, label]);
    localStorage.setItem('droppedbutton',label);
  };
  const handleRemove = (label, id = 0) => {
    localStorage.removeItem("droppedbutton");
    setcategory2(false);
    setinformationIcone(true);
    setDragedButtons((prevButtons) =>
      prevButtons.filter((item) => item !== label)
    );
    if (id !== 0) {
      setDragedButtons((prevButtons) => [...prevButtons, label]);
      setDroppedButtons((prevButtons) =>
        prevButtons.filter((item) => item !== label)
      );
    }
  };
  
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || "";
  });
  const [userId, setuserID] = useState(() => {
    return JSON.parse(localStorage.getItem("users"));
  });

  const [alpha, setalpha] = useState(() => {
    return parseFloat(localStorage.getItem("alpha")) || 0.0;
  });
  const [balance, setBalance] = useState(() => {
    return parseFloat(localStorage.getItem("balance")) || 0.0;
  });
  const [moment,     setmoment] = useState(() => {
    return parseFloat(localStorage.getItem("moment")) || 0.0;
  });
  const [startdate, setStartdate] = useState(() => {
    return localStorage.getItem("startdate") || "2023-01-01";
  });
  const [enddate, setEnddate] = useState(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    return localStorage.getItem("enddate") || currentDate;
  });


  useEffect(() => {
    if (name != "") {
      setcategory3(true);
    }
    if(droppedButtons.length == 0){
          setcategory3(false);
    }
  }, [alpha, balance, moment, name,droppedButtons.length])

  var Username = userId?.email.split("@")[0];

  useEffect(() => {
      if (droppedButtons.length == 1) {
        setSeeResultbutton(true);
      }
  }, [droppedButtons]);

  useEffect(() => {
    localStorage.setItem("alpha", alpha.toString());
  }, [alpha]);
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);
  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);
  useEffect(() => {
    localStorage.setItem("moment", moment.toString());
  }, [moment]);
  useEffect(() => {
    localStorage.setItem("startdate", startdate);
  }, [startdate]);
  useEffect(() => {
    localStorage.setItem("enddate", enddate);
  }, [enddate]);
  const handleToastClose = () => {
    setToastShown(false);
  };
  const capitalizeFirstLetter = (string) => {
    if (typeof string === "string") {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else if (typeof string === "object" && string !== null) {
      const key = Object.keys(string)[0];
      const value = string[key];
      return { [key]: value.charAt(0).toUpperCase() + value.slice(1) };
    }
    return string;
  };

  const handleSubmit = () => {
    var countofthevalue1 = moment + balance + alpha;
    if(countofthevalue1 != 1 ){
      if (!toastShown) {
        toast.error('Sum of Alpha, balanced and Momentum not equal to 1', {
          autoClose: 3000, 
          closeButton: false, 
          onClose: handleToastClose, 
        });
        setToastShown(true);
      }

    }else if(countofthevalue1 ==1){
    setLoading(true);
    var formdata = {
      startdate: startdate,
      name: name,
      action: true,
      Params: {},
      enddate: enddate,
    };
    if (droppedButtons.length === 0) {
      toast.error("Please add at least one button.");
      setLoading(false);
      return;
    }

    if (Object.keys(validateForm(formdata)).length !== 0) {
      if (!toastShown) {
        const errorMessage = Object.values(validateForm(formdata))[0];
        const formattedErrorMessage = capitalizeFirstLetter(errorMessage);
        toast.error(formattedErrorMessage, {
          autoClose: 3000, 
          closeButton: false, 
          onClose: handleToastClose, 
        });
        setToastShown(true);
      }

      setLoading(false);
      return;
    }
    const payloadData = {
      strategy_name: "FactorBalancing",
      name: "string",
      active: true,
      parameters: {},
      alpha: alpha,
      balanced: balance,
      moment: moment,
      start_date: startdate,
      end_date: enddate,
    };
    fetch(BACKTESTRUN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result.length > 0) {
          localStorage.setItem("backtest", JSON.stringify(data));
          navigate("/backtesting_results", {
            state: { startdate: startdate, enddate: enddate },
          });
        } else {
          toast.error("something went wrong please try again");
        }
        setLoading(false);
      })
      .catch((error) => {
        localStorage.setItem("backtest", null);
        toast.error("something went wrong please try again");
        setLoading(false);
      });
    }
  };

  const handleSave = () => {


    var countofthevalue1 = moment + balance + alpha;
    if(countofthevalue1 != 1 ){
      if (!toastShown) {
        toast.error('Sum of Alpha, balanced and Momentum not equal to 1', {
          autoClose: 3000, 
          closeButton: false, 
          onClose: handleToastClose, 
        });
        setToastShown(true);
      }

    }else if(countofthevalue1 ==1){
      setLoading(true);   

    fetch(SAVE, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId.id,
        strategy_name: "FactorBalancin",
        alpha: alpha,
        balanced: balance,
        momentum: moment,
      }),
    })
      .then((data) => {
        if (!data.ok) {
          if (!toastShown) {
            toast.error('User data already saved', {
              autoClose: 3000, 
              closeButton: false, 
              onClose: handleToastClose, 
            });
            setToastShown(true);
          }
    
        } else {  
          if (!toastShown) {
            toast.info("Stored Successfully", {
              autoClose: 3000, 
              closeButton: false, 
              onClose: handleToastClose, 
            });
            setToastShown(true);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    }
  };
  const topstock = (con = false) => {
    if (con) {
      setshowStock(true);
    } else {
      setshowStock(false);
    }
  };

  useEffect(() => {
    if (droppedButtons.length == 1) {
      setcategory2(true);
      setGetstart(false);
      setinformationIcone(false);
    }
  }, [droppedButtons]);

  const Button = ({ label, onDrop, onRemove, isDropButton }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "BUTTON",
      item: { label },
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });
    useEffect(() => {
      if (isDragging) {
        // setinformationIcone(false);
        setGetstart(false);
      }
    }, [isDragging]);

    return (
      <button
        ref={drag}
        onClick={() => {
          if (!isDropButton) {
            handleDrop(label);
            setGetstart(false);
            setinformationIcone(false);
          }
        }}
        className="buttonvalue"
      >{label}
      </button>
    );
  };
  const handleChanger = (type, value) => {
    const currentAlpha = alpha * 10;
    const currentMoment = moment * 10;
    const currentBalance = balance * 10;
  
    let newAlpha = currentAlpha;
    let newMoment = currentMoment;
    let newBalance = currentBalance;
  
    const total = currentAlpha + currentMoment + currentBalance;
  
    if (total - (type === 1 ? currentBalance : 0) + value === 10) {
      return;
    }
  
    if (type === 1) {
      newBalance = Math.min(value * 10, 10 - currentAlpha - currentMoment);
    } else if (type === 2) {
      newMoment = Math.min(value * 10, 10 - currentAlpha - currentBalance);
    } else if (type === 3) {
      newAlpha = Math.min(value * 10, 10 - currentMoment - currentBalance);
    }
    setBalance(newBalance / 10);  
    setmoment(newMoment / 10);
    setalpha(newAlpha / 10);
  };
  const GrapData = ["GoldVSilver", "ReversalPattern","LongStraddle", "ForexML"];
  const StrategiestoInverst = ["Equities", "Futures","Options", "Crypto","Forex"];
  const [responsevalue, setResponse] = useState([]);

  const LoadRecomment = () => {
    setResponse([]);
    setdashboardLoading(true);
    const payloadData = {
      alpha: alpha,
      balanced: balance,
      moment: moment || 0,
    };

    fetch(RECOMMENDSTOCK, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        setdashboardLoading(false);
      })
      .catch((error) => {
        toast.error("something went wrong please try again");
        setdashboardLoading(false);
      });
  };

  return (
    <div id="pdf-content" className={`light-mode`}>
      {loading == true ? (
        <div className="loadingOverlay">
          <div class="loading-spinner"></div>
        </div>
      ) : null}
      <Header check={isChecked} setcheck={setIsChecked} />
      <DndProvider backend={HTML5Backend}>
        <div className="d-flex">
          <div className="button-design">
            <button className={strategy ? "default-button" : "drop-button"}>
              Dashboard
              <div
                className="icon"
                onClick={() => {
                    // window.location.href = '/dashboard';
                  topstock(true);
                  setGetstart(false);
                  setstrategy(false);
                  LoadRecomment();
                }}
              >
                <span className="tooltip">Top Five Stocks</span>
                <svg
                  height={24}
                  width={24}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: !strategy? "rotate(90deg)" : "none",
                  }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
            <button
              className={strategy ? "drop-button" : "default-button"}
              onClick={() => {
                topstock(false);
                setstrategy(true);
              }}
            >
              Strategies
              <div className="icon">
                <svg
                  height={24}
                  width={24}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: strategy ? "rotate(90deg)" : "none",
                  }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
            <div
              style={{ marginTop: "1%", marginLeft: '3%' }}
              className={`${strategy ? "" : "d-none"}`}
            >
              <div className="d-flex align-items-center">
                {dragedButtons.map((label, index) => (
                  <Button key={index} label={label} onDrop={handleDrop} />
                ))}
                {informationicon && (<i
                  className="bi bi-info-circle formfontstyle"
                  onMouseEnter={() => {
                    setSpNotificationdrag(true);
                  }}
                  onMouseLeave={() => {
                    setSpNotificationdrag(false);
                  }}
                ></i>)}
              </div>
              {spNotificationdrag && (
                <div className="notification-box-drag">
                  Discover the transformative potential of our "Optimized S&P
                  Strategy," a groundbreaking approach meticulously crafted by
                  our distinguished Quant Team. Set against the backdrop of the
                  S&P 400,500,600 — a set of benchmark indexes that serves as a
                  vital gauge of U.S. equity market health and offers a snapshot
                  of corporate America—our strategy challenges the traditional,
                  diversified investment approach by embracing the nuanced
                  potentials of strategic, targeted interventions. Recognizing
                  the need for a dynamic and personalized investment experience,
                  we harness advanced quantitative analysis and real-time market
                  data to unveil three distinctive strategies. These are
                  meticulously designed to cater to varying investor profiles
                  and preferences, ensuring a tailored investment journey that
                  redefines what it means to invest in the S&P Indexes,
                  promising not just diversification but strategic depth,
                  personalized to meet the ambitions and risk tolerance of our
                  investors.
                </div>
              )}
              {Getstart && (
                <div className="notification-box10">
                  Click here to get started for S&P
                </div>
              )}
            </div>
            {GrapData.map((item) => (
              <button
                className={`buttonvalue ${strategy ? "" : "d-none"}`}
                style={{ backgroundColor: "#8080809c", color: "white" }}
              >
                {item}
              </button>
            ))}
          </div>
          {showStock == true ? (
            <div className="main mt-3 stripline" style={{height:'400px'}}>
           {dashboardloading == true ? (
        <div className="loadingOverlay1">
          <div class="loading-spinner">
          </div>
        </div>
      ) : null} 
            <div className="mb-4 header">
        
                <h4 className="header">Top Five Stocks</h4>
              </div>
              <Topstock responsevalue={responsevalue} />
            </div>
          ) : (
            <div className="main mt-3 stripline">
              <div className="mb-4 header">
                <h4 className="header">Lets Get You Started, {Username}.</h4>
              </div>
              <DropZone onDrop={handleDrop} preArray={droppedButtons}>
                <div className="row mb-3">
                  <div>
                    <span className="fontstyle mb-2 questionfont">
                      <span className="number input" style={{color:'black !important'}}>1</span>What would you like
                      to invest in?
                    </span>
                    <div className="buttondiv col-4">
                      {" "}
                      {StrategiestoInverst.map((item) => (
                        <button
                          className="buttonvalue"
                          style={{
                            backgroundImage:
                              item === "Equities"
                                ? "linear-gradient(to right, #3b8f6e, #194136)"
                                : "linear-gradient(to right, rgba(128, 128, 128, 0.61),rgba(128, 128, 128, 0.61))",
                            color: item === "Equites" ? "#FFFF" : "#ffff",
                          }}
                        >
                          {item}
                          {item === "Equities" ? (
                            <span className="remove-button">
                              <i
                                className="fa fa-close"
                                style={{
                                  fontWeight: "100",
                                }}
                                aria-hidden="true"  
                              />
                            </span>
                          ) : (
                            ""
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 dropzonefunction">
                    <span className="fontstyle mb-2 questionfont">
                      What Strategy do you want to implement?
                    </span>
                    <div className="buttondiv col-3">
                      {droppedButtons.map((label, index) => (
                        <button
                          className="buttonvalue colorbutton"
                        >
                          {label}
                          <span
                            className="remove-button"
                            onClick={() => handleRemove(label, 1)}
                          >
                            <i
                              className="fa fa-close"
                              style={{
                                fontWeight: "100",
                              }}
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </DropZone>
              <div className="row mb-5">
                {category2 && (<div className="col-12">
                  <span className="number1 input">2</span>
                  <span className="Equity"> Equity Details</span>
                  <div className="row p-1">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <label className="formfontstyle">Symbol</label>
                      <input
                        type="text"
                        className="form-control formfontstyle"
                        name="symbol"
                        value="SPY"
                        readOnly
                        onMouseEnter={() => setShowNotification(true)}
                        onMouseLeave={() => setShowNotification(false)}
                      />
                      {showNotification && (
                        <div className="notification-box">Symbol is SPY</div>
                      )}
                    </div>
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle">Security Type</label>
                      <select
                        className="form-control formfontstyle"
                        onMouseEnter={() => setSecurityNotification(true)}
                        onMouseLeave={() => setSecurityNotification(false)}
                      >
                        <option className="formfontstyle" selected>
                          STK
                        </option>
                      </select>
                      {securityNotification && (
                        <div className="notification-box">
                          Security type is STK
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row p-1">
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle">
                        Alpha{" "}
                        <i
                          className="bi bi-info-circle"
                          onMouseEnter={() => setalphaNotification(true)}
                          onMouseLeave={() => setalphaNotification(false)}
                        ></i>
                      </label>
                      <div style={{ display: "flex" }}>
                        <input
                          type="range"
                          className="form-control-range"
                          id="recipient-name"
                          style={{
                            padding: "1px",
                            fontSize: "12px",
                            height: "15px",
                            brder: "none",
                            backgroundImage:
                              "linear-gradient(to right, #3b8f6e, #194136)",
                          }}
                          placeholder="Enter Lead Rating"
                          min="0.0"
                          max="1"
                          step="0.01"
                          defaultValue="0.0"
                          value={alpha.toFixed(2)}
                          onChange={(e) => {
                            setalpha(parseFloat(e.target.value));
                            setBalance(0.0);
                            setmoment(0.0);
                          }}
                     
                        />
                        <input
                          type="number"
                          className="form-control inputsize"
                          value={alpha.toFixed(2)}
                          max="1"
                          min="0"
                          step="0.01"
                          name="alpha"
                          onChange={(e) => {
                            setalpha(parseFloat(e.target.value));
                            setBalance(0.0);
                            setmoment(0.0);
                          }}
                        />
                      </div>

                      {alphaNotification && (
                        <div className="notification-box1">
                          Alpha Strategy: For the Growth-Oriented Investor This
                          strategy targets aggressive growth through a selection
                          of weekly top-performing stocks, backed by stringent
                          Jensen Alpha Calculation and risk management
                          protocols. It emphasizes predefined entry and exit
                          criteria, target goals, and stop-loss orders to
                          balance high returns with risk mitigation.
                        </div>
                      )}
                    </div>
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle">Name</label>
                      <input
                        type="text"
                        className="form-control formfontstyle"
                        name="currency"
                        onMouseEnter={() => setnameNotification(true)}
                        onMouseLeave={() => setnameNotification(false)}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {nameNotification && (
                        <div className="notification-box">
                          Name of the strategy
                        </div>
                      )}
                    </div>
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle">
                        Balanced{" "}
                        <i
                          className="bi bi-info-circle"
                          onMouseEnter={() => setbalanceNotification(true)}
                          onMouseLeave={() => setbalanceNotification(false)}
                        ></i>
                      </label>
                      <div style={{ display: "flex" }}>
                        <input
                          type="range"
                          className="form-control-range"
                          id="recipient-name"
                          style={{
                            padding: "1px",
                            fontSize: "12px",
                            height: "15px",
                            border: "none",
                            backgroundImage:
                              "linear-gradient(to right, #3b8f6e, #194136)",
                          }}
                          placeholder="Enter Lead Rating"
                          min="0.0"
                          max="1"
                          step="0.01"
                          defaultValue="0.0"
                          value={balance.toFixed(2)}
                          onChange={(e) => {
                            handleChanger(1, parseFloat(e.target.value));
                          }}
                        />
                        <input
                          type="number"
                          className="form-control inputsize"
                          max="1"
                          min="0.0"
                          step="0.01"
                          value={balance.toFixed(2)}
                          onChange={(e) => {
                            handleChanger(1, parseFloat(e.target.value));
                          }}
                        />
                      </div>

                      {balanceNotification && (
                        <div className="notification-box1">
                          Balanced Strategy: For the Stability Seeker Focused on
                          offering a steady investment path with low-volatility
                          stocks, this strategy is designed for risk-averse
                          investors prioritizing capital preservation. It
                          employs a cautious approach to entry and exit points
                          to minimize exposure to market fluctuations, ensuring
                          peace of mind.
                        </div>
                      )}
                    </div>
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle">Start Date</label>
                      <input
                        type="date"
                        className="form-control formfontstyle"
                        onChange={(e) => setStartdate(e.target.value)}
                        onMouseEnter={() => setstartdateNotification(true)}
                        onMouseLeave={() => setstartdateNotification(false)}
                        value={startdate}
                        name="date"
                      />
                      {startdateNotification && (
                        <div className="notification-box">
                          Start Date for your Back Testing
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row p-1"></div>
                  <div className="row p-1">
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle">
                        Momentum{" "}
                        <i
                          className="bi bi-info-circle"
                          onMouseEnter={() => setmomentNotification(true)}
                          onMouseLeave={() => setmomentNotification(false)}
                        ></i>
                      </label>
                      <div style={{ display: "flex" }}>
                        <input
                          type="range"
                          className="form-control-range"
                          id="recipient-name"
                          style={{
                            padding: "1px",
                            fontSize: "12px",
                            height: "15px",
                            border: "none",
                            backgroundImage:
                              "linear-gradient(to right, #3b8f6e, #194136)",
                          }}
                          placeholder="Enter Lead Rating"
                          min="0.0"
                          max="1"
                          step="0.01"
                          defaultValue="0.0"
                          value={moment.toFixed(2)}
                          onChange={(e) => {
                            handleChanger(2, parseFloat(e.target.value));
                          }}
                        />
                        <input
                          type="number"
                          className="form-control inputsize"
                          max="1"
                          min="0.0"
                          step="0.01"
                          name="moment"
                          value={moment.toFixed(2)}
                          onChange={(e) => {
                            handleChanger(2, parseFloat(e.target.value));
                          }}
                        />
                      </div>

                      {momentNotification && (
                        <div className="notification-box1">
                          Momentum Strategy: For the Market Trend Follower It
                          capitalizes on current market trends by investing in
                          stocks with significant momentum, optimizing for
                          short-term gains. The strategy is tailored for
                          investors looking to capitalize on proactive market
                          stances, reflecting the latest market movements.
                        </div>
                      )}
                    </div>
                    <div className="col-sm-12  col-md-6 col-l-6">
                      <label className="formfontstyle"> End Date</label>
                      <input
                        type="date"
                        className="form-control formfontstyle"
                        name="currency"
                        onMouseEnter={() => setenddateNotification(true)}
                        onMouseLeave={() => setenddateNotification(false)}
                        value={enddate}
                        onChange={(e) => setEnddate(e.target.value)}
                      />
                      {enddateNotification && (
                        <div className="notification-box">
                          End Date for your Back Testing
                        </div>
                      )}
                    </div>
                  </div>
                </div>)}
              </div>
              {isChecked && category2 ? (
                <div style={{ height: 200 }}>
                  <textarea
                    placeholder="//write your code here..."
                    id="editing"
                    spellCheck="false"
                    oninput="update(this.value); sync_scroll(this);"
                    onscroll="sync_scroll(this);"
                    onkeydown="check_tab(this, event);"
                    defaultValue={""}
                  />
                </div>
              ) : (
                ""
              )}
              {category3 && (<div className="buttondiv1 col-6 mb-4">
                <span className="number3 input">3</span>
                <button
                  className="buttonvalue1 input"
                  onClick={() => {
                    handleSave();
                  }}
                >
                  Save
                </button>
                <button
                  className="buttonvalue1 colorbutton"
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={!seeResultbutton}
                >
                  See Result
                </button>
              </div>
              )}

            </div>
          )}
         {!showStock  && !isMobile && (
         <div className="d-none d-lg-block"> 
             <Youtubevideo width={410} height={316}  />
          </div>
       )}
        </div>
        {!showStock  && isMobile &&  (
    <div className="videostyle only-mobile"> 
      <Youtubevideo width={220} height={150} />
    </div>
)}
      </DndProvider>
    </div>
  );
};

export default Newpage;