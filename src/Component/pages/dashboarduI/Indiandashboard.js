import React, { useState, useEffect } from "react";
import Header from "../dashboard/header";
import Sidebar from "./sidebar";
import Topbar from "./Topbar";
import "./Assets/style.css";
import { DASHBOARD } from "../../utils/ApiRoute";
import { format } from "date-fns";
import currency from "currency.js";
import { useMediaQuery } from "react-responsive";
import ApexChart from "./ApexChart";

const Indiandashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [ReversalPattern, setReversalPattern] = useState(false);
  const [Long, setLong] = useState(false);
  const [Crypto, setCrypto] = useState(false);
  const [Option, setOption] = useState(false);
  const [sign, setSign] = useState(false);
  // const [to_date, setTo_date] = useState('2024-05-31 23:59:59');
  // const [from_date, setFrom_date] = useState('2024-05-20 00:00:00');
  const [strategies, setStrategies] = useState([]);
  const [chartshow, setChartshow] = useState(false);
  const [product, setProduct] = useState([]);
  const [Strategyproduct, setStrategyProduct] = useState([]);
  const Stategydata = JSON.parse(localStorage.getItem("ResetData"));

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();
  const formattedCurrentDate2 = format(
    new Date(formattedCurrentDate),
    "yyyy-MM-dd HH:mm:ss"
  );
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString();
  const formattedDatesevenday2 = format(
    new Date(formattedSevenDaysAgo),
    "yyyy-MM-dd HH:mm:ss"
  );

  // const currentDate20 = new Date();
  // const sevenDaysAgo20 = new Date(currentDate20);
  // sevenDaysAgo20.setDate(currentDate20.getDate() - 7);
  // sevenDaysAgo20.setFullYear(2024);
  // sevenDaysAgo20.setMonth(7);
  // sevenDaysAgo20.setDate(1);
  // const currentTime20 = currentDate20.toLocaleTimeString('en-US', { hour12: false });
  // const formattedDate20 = `${sevenDaysAgo20.getFullYear()}-${(sevenDaysAgo20.getMonth()).toString().padStart(2, '0')}-${sevenDaysAgo20.getDate().toString().padStart(2, '0')} ${currentTime20}`;
  // console.log(formattedDate20);

  const [from_date, setFrom_date] = useState("2024-07-01 00:00:01");
  const [to_date, setTo_date] = useState(formattedCurrentDate2);
  // const [from_date, setFrom_date] = useState(formattedDatesevenday2);

  const UpdateTIme = () => {
    const currentDatenew = new Date();
    const formattedCurrentDatenew = currentDatenew.toISOString();
    const formattedCurrentDate2new = format(
      new Date(formattedCurrentDatenew),
      "yyyy-MM-dd HH:mm:ss"
    );
    const sevenDaysAgonew = new Date();
    sevenDaysAgonew.setDate(currentDatenew.getDate() - 7);
    const formattedSevenDaysAgonew = sevenDaysAgonew.toISOString();
    const formattedDatesevenday2new = format(
      new Date(formattedSevenDaysAgonew),
      "yyyy-MM-dd HH:mm:ss"
    );

    // const currentDate21 = new Date();
    // const sevenDaysAgo21 = new Date(currentDate20);
    // sevenDaysAgo21.setDate(currentDate20.getDate() - 7);
    // sevenDaysAgo21.setFullYear(2024);
    // sevenDaysAgo21.setMonth(7);
    // sevenDaysAgo21.setDate(1);
    // const currentTime21 = currentDate21.toLocaleTimeString('en-US', { hour12: false });
    // const formattedDate21 = `${sevenDaysAgo21.getFullYear()}-${(sevenDaysAgo21.getMonth()).toString().padStart(2, '0')}-${sevenDaysAgo21.getDate().toString().padStart(2, '0')} ${currentTime21}`;
    // console.log(formattedDate21);

    setTo_date(formattedCurrentDate2new);
    // setFrom_date(formattedDatesevenday2new);
    setFrom_date("2024-07-01 00:00:01");

    return {
      to: formattedCurrentDate2new,
      // from: formattedDatesevenday2new,
      from: "2024-07-01 00:00:01",
    };
  };

  const [loadingall, setLoadingall] = useState(false);

  const shadedBorderStyle = {
    borderLeft: "2px solid #eef1f3",
    boxShadow: "inset rgb(238, 241, 244) 11px -1px 12px 0px",
    cursor: "pointer",
  };

  const smallbutton = {
    borderleft: "2px solid #eef1f3",
    boxShadow: "inset rgb(238, 241, 244) 11px -1px 12px 0px",
    fontSize: "12px",
    color: "#6e707e",
  };
  const smallbutton1 = {
    fontSize: "12px",
    color: "#6e707e",
  };

  const smallbuttonvalue = {
    fontSize: "11px",
    color: "#6e707e",
    cursor: "pointer",
  };
  const headerfontsize = {
    fontSize: "13px",
  };
  const threebox = {
    // marginTop:"2%",
    marginLeft: "1%",
    fontSize: isMobile ? "15px" : "24px",
    fontWeight: "600",
  };

  const handleSubmit = (from = from_date, to = to_date) => {
    const FROMDATE = from.replace("T", " ");
    const TODATE = to.replace("T", " ");

    console.log("from_date", FROMDATE);
    console.log("to_date", to);

    setLoadingall(true);
    fetch(DASHBOARD + `?from_date=${FROMDATE}&to_date=${TODATE}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const IndData = data.filter((item) => item.fund_id == 4);
        setLoadingall(false);
        setStrategies(IndData);

        console.log("filter IndData", IndData);

        setStrategyProduct(
          data.flatMap((itemdata) =>
            itemdata.strategies.flatMap((item) =>
              item.instruments.map(
                ({ live_tx_charges, realized_tx_charges, ...rest }) => ({
                  ...rest,
                  strategie_name: item.strategy_name,
                })
              )
            )
          )
        );
        const ResetData = JSON.parse(localStorage.getItem("ResetData"));

        if (ResetData.condition === true) {
          setProduct(
            IndData.flatMap((itemdata) =>
              itemdata.strategies.flatMap((item) =>
                item.instruments.map((instrument) => ({
                  ...instrument,
                  strategie_name: item.strategy_name,
                }))
              )
            )
          );
        } else if (!ResetData.condition) {
          setProduct(
            IndData.flatMap((itemdata) =>
              itemdata.strategies.flatMap((item) =>
                item.strategy_id == ResetData.itemId
                  ? item.instruments.map((instrument) => ({
                      ...instrument,
                      strategie_name: item.strategy_name,
                    }))
                  : []
              )
            )
          );
        }
      })

      .catch((error) => {
        setLoadingall(false);
      });
  };

  useEffect(() => {
    localStorage.setItem(
      "ResetData",
      JSON.stringify({
        condition: true,
        itemId: 0,
        strategyname: "Products",
        fund_id: 0,
      })
    );
    setExpandedStrategy(null);
  }, []);
  useEffect(() => {
    UpdateTIme();
    handleSubmit();
    const intervalId = setInterval(async () => {
      const date_from = await UpdateTIme();
      await handleSubmit(date_from.from, date_from.to);
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [""]);
  const [expandedStrategy, setExpandedStrategy] = useState(
    Stategydata?.fund_id
  );
  const toggleExpanded = (strategy) => {
    if (expandedStrategy === strategy?.fund_id) {
      setExpandedStrategy(null);
    } else {
      setExpandedStrategy(strategy?.fund_id);
    }
  };

  const formatRealizedPnl = (value) => {
    if (value === 0) {
      return value;
    }
    const sign = value > 0 ? "+" : "-";
    const formattedValue = Math.abs(value);
    return `${sign}${formattedValue}`;
  };

  const calculateTotalRealizedPnL = (instruments) => {
    const total = instruments.reduce(
      (acc, instrument) => acc + instrument.realized_pnl,
      0
    );
    const formattedTotal = total;
    if (total > 0) {
      return `+${formattedTotal}`;
    } else if (total < 0) {
      return formattedTotal;
    } else {
      return "0.00";
    }
  };
  // const calculateTotalRealizedPnL = (instruments) => {
  //   const total = instruments.reduce(
  //     (acc, instrument) => acc + instrument.realized_pnl + instrument.realized_tx_charges,
  //     0
  //   );
  //   const formattedTotal = total.toFixed(2);
  //   if (total > 0) {
  //     return `+${formattedTotal}`;
  //   } else if (total < 0) {
  //     return formattedTotal;
  //   } else {
  //     return "0.00";
  //   }
  // };

  const calculatecurrentposition = (instruments) => {
    const total = instruments.reduce(
      (acc, instrument) => acc + instrument.current_position,
      0
    );
    const formattedTotal = total;
    if (total > 0) {
      return `+${formattedTotal}`;
    } else if (total < 0) {
      return formattedTotal;
    } else {
      return "0.00";
    }
  };

  const calculateTotallivePnL = (instruments) => {
    const total = instruments.reduce(
      (acc, instrument) => acc + instrument.live_pnl,
      0
    );
    const formattedTotal = total;
    if (total > 0) {
      return `+${formattedTotal}`;
    } else if (total < 0) {
      return formattedTotal;
    } else {
      return "0.00";
    }
  };

  // const calculateTotallivePnL = (instruments) => {
  //   const total = instruments.reduce(
  //     (acc, instrument) => acc + instrument.live_pnl + instrument.live_tx_charges,
  //     0
  //   );
  //   const formattedTotal = total;
  //   if (total > 0) {
  //     return `+${formattedTotal}`;
  //   } else if (total < 0) {
  //     return formattedTotal;
  //   } else {
  //     return "0.00";
  //   }
  // };

  const calculateTotalInstrumentsLength = (strategy) => {
    return strategy.strategies.reduce(
      (total, itemData) => total + itemData.instruments.length,
      0
    );
  };

  const calculateTotalInstrumepnl = (strategy) => {
    return strategy.strategies.reduce((total, itemData) => {
      return (
        total +
        itemData.instruments.reduce(
          (sum, instrument) => sum + instrument.realized_pnl,
          0
        )
      );
    }, 0);
  };
  // const calculateTotalInstrumepnl = (strategy) => {
  //   return strategy.strategies.reduce((total, itemData) => {
  //     return (
  //       total +
  //       itemData.instruments.reduce((sum, instrument) =>
  //         sum + instrument.realized_pnl + instrument.realized_tx_charges, 0
  //       )
  //     );
  //   }, 0);
  // };

  const calculateAllCurrentAum = () => {
    const totalPnl = strategies
      .flatMap((strategy) =>
        strategy.strategies.flatMap((itemData) =>
          itemData.instruments.flatMap((instrument) => instrument.realized_pnl)
        )
      )
      .reduce((total, pnl) => total + pnl, 0);

    const totalFundAum = strategies.reduce(
      (total, itemData) => total + itemData.fund_aum,
      0
    );
    return totalPnl + totalFundAum;
  };

  // const sumoflivepnl = () => {
  //   const totalPnl = strategies
  //     .flatMap((strategy) =>
  //       strategy.strategies.flatMap((itemData) =>
  //         itemData.instruments.flatMap((instrument) => instrument.live_pnl)
  //       )
  //     )
  //     .filter((pnl) => !isNaN(pnl)) // Filter out NA values
  //     .reduce((total, pnl) => total + pnl, 0);

  //   return totalPnl.toFixed(3);
  // };
  const sumoflivepnl = () => {
    const totalPnl = strategies
      .flatMap((strategy) =>
        strategy.strategies.flatMap((itemData) =>
          itemData.instruments.flatMap((instrument) => {
            // Extract live_pnl and live_tx_charges from each instrument
            const pnl = parseFloat(instrument.live_pnl);
            const txCharges = parseFloat(instrument.live_tx_charges);

            // Filter out NaN values
            return [pnl, txCharges].filter((value) => !isNaN(value));
          })
        )
      )
      .reduce((total, pnl) => total + pnl, 0);

    return totalPnl.toFixed(3);
  };

  console.log("sumoflivepnl", sumoflivepnl());

  const persentageAllAum = () => {
    const TotalCurrentAUM = calculateAllCurrentAum();
    console.log("TotalCurrentAUM", TotalCurrentAUM);
    const TotaloriginalAUM = strategies.reduce(
      (total, itemData) => total + itemData.fund_aum,
      0
    );
    console.log("TotaloriginalAUM", TotaloriginalAUM);
    console.log("calculation", TotalCurrentAUM - TotaloriginalAUM);
    const percentageall =
      ((TotalCurrentAUM - TotaloriginalAUM) / TotaloriginalAUM) * 100;
    return percentageall.toFixed(4);
  };

  const calculateTotalcurrentposition = (strategy) => {
    return strategy.strategies.reduce((total, itemData) => {
      return (
        total +
        itemData.instruments.reduce(
          (sum, instrument) => sum + instrument.current_position,
          0
        )
      );
    }, 0);
  };
  const calculateTotalliveprice = (strategy) => {
    return strategy.strategies.reduce((total, itemData) => {
      return (
        total +
        itemData.instruments.reduce(
          (sum, instrument) => sum + instrument.live_price,
          0
        )
      );
    }, 0);
  };

  const calculateTotalInstrumeunrealizedpnl = (strategy) => {
    return strategy.strategies.reduce((total, itemData) => {
      return (
        total +
        itemData.instruments.reduce((sum, instrument) => {
          const livePnl = Number.isFinite(instrument.live_pnl)
            ? instrument.live_pnl
            : 0;
          return sum + livePnl;
        }, 0)
      );
    }, 0);
  };
  // const calculateTotalInstrumeunrealizedpnl = (strategy) => {
  //   return strategy.strategies.reduce((total, itemData) => {
  //     return (
  //       total +
  //       itemData.instruments.reduce((sum, instrument) => {
  //         const livePnl = Number.isFinite(instrument.live_pnl) ? instrument.live_pnl : 0;
  //         const liveTxCharges = Number.isFinite(instrument.live_tx_charges) ? instrument.live_tx_charges : 0;
  //         return sum + livePnl + liveTxCharges;
  //       }, 0)
  //     );
  //   }, 0);
  // };

  const calculatelivetransactionfee = (strategy) => {
    const returnvalue = strategy.strategies.reduce((total, itemData) => {
      return (
        total +
        itemData.instruments.reduce((sum, instrument) => {
          const liveTxCharges = Number.isFinite(instrument.live_tx_charges)
            ? instrument.live_tx_charges
            : 0;
          return sum + liveTxCharges;
        }, 0)
      );
    }, 0);
    return `-${returnvalue}`;
  };

  const calculatetransactionfee = (strategy) => {
    const returnvalue = strategy.strategies.reduce((total, itemData) => {
      return (
        total +
        itemData.instruments.reduce((sum, instrument) => {
          const Realized_tx_charges = Number.isFinite(
            instrument.realized_tx_charges
          )
            ? instrument.realized_tx_charges
            : 0;
          return sum + Realized_tx_charges;
        }, 0)
      );
    }, 0);
    return `-${returnvalue}`;
  };
  const calculatelivetransfee = (instruments) => {
    const total = instruments.reduce(
      (acc, instrument) => acc + instrument.live_tx_charges,
      0
    );
    const formattedTotal = total;
    if (total > 0) {
      return `-${formattedTotal}`;
    } else if (total < 0) {
      return formattedTotal;
    } else {
      return "0.00";
    }
  };
  const calculatetransfee = (instruments) => {
    const total = instruments.reduce(
      (acc, instrument) => acc + instrument.realized_tx_charges,
      0
    );
    const formattedTotal = total;
    if (total > 0) {
      return `-${formattedTotal}`;
    } else if (total < 0) {
      return formattedTotal;
    } else {
      return "0.00";
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between"></div>
              {/* Content Row */}
              {loadingall == true ? (
                <div className="loadingOverlay1">
                  <div className="loading-spinner"></div>
                </div>
              ) : null}
              <div className="row">
                <div
                  className="row mb-3 pb-4 pt-2 ml-1 mt-1 "
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    padding: "20px",
                  }}
                >
                  <div className="col-xl-3 col-lg-3">
                    <label className="mb-1">From Date</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-calendar-alt"></i>
                        </span>
                      </div>
                      <input
                        type="datetime-local"
                        name="fromdate"
                        className="form-control"
                        value={from_date}
                        onChange={(e) => setFrom_date(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3">
                    <label className="mb-1">To Date</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-calendar-alt"></i>
                        </span>
                      </div>
                      <input
                        type="datetime-local"
                        name="todate"
                        className="form-control"
                        value={to_date}
                        onChange={(e) => setTo_date(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-2 mt-2 d-flex align-items-end justify-content-center">
                    <button
                      className="btn btn-primary btn-block w-25"
                      onClick={(e) => handleSubmit()}
                    >
                      <i className="fas fa-search"></i>{" "}
                      <span style={{ display: isMobile ? "none" : "" }}>
                        Search
                      </span>
                    </button>
                  </div>
                </div>
                <div className="row d-flex justify-content-center text-center">
                  <div className="col-sm-6 col-md-4">
                    <div className="card card-stats card-round">
                      <div
                        className="card-body"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #8c0df0, #0d6efdb0)",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-icon">
                            <div className="icon-big text-center icon-secondary bubble-shadow-small">
                              <img
                                src="/real-time1.png"
                                alt="real-time"
                                style={{ width: "100%" }}
                              />
                              {/* <i className="far fa-check-circle" /> */}
                            </div>
                          </div>
                          <div className="col col-stats ms-3 ms-sm-0">
                            <div className="numbers">
                              <p
                                className="card-category"
                                style={{ fontWeight: "800" }}
                              >
                                Real-Time Profit and Loss (Daily)
                              </p>
                              <h4 className="card-title">
                                {formatter.format(sumoflivepnl())}
                                <svg
                                  height={24}
                                  width={24}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    transform:
                                      sumoflivepnl() >= 0
                                        ? "rotate(-90deg)"
                                        : "rotate(90deg)",
                                  }}
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-sm-6 col-md-4">
                    <div className="card card-stats card-round">
                      <div
                        className="card-body"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #0d6efd, #0dcaf0)",
                          borderRadius: "10px",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-icon">
                            <div className="icon-big text-center icon-primary bubble-shadow-small">
                              <img
                                src="/liabilities.png"
                                alt="real-time"
                                style={{ width: "90%" }}
                              />

                              {/* <i className="fas fa-users" /> */}
                            </div>
                          </div>
                          <div className="col col-stats ms-3 ms-sm-0">
                            <div className="numbers">
                              <p
                                className="card-category"
                                style={{ fontWeight: "700" }}
                              >
                                Over All Aum{" "}
                              </p>
                              <h4 className="card-title">
                                {" "}
                                {formatter.format(
                                  strategies.reduce(
                                    (total, itemData) =>
                                      total + itemData.fund_aum,
                                    0
                                  )
                                )}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <div className="card card-stats card-round">
                      <div
                        className="card-body"
                        style={{
                          backgroundImage:
                            "radial-gradient(#198754, #1cc88acc)",
                          borderRadius: "10px",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-icon">
                            <div className="icon-big text-center icon-info bubble-shadow-small">
                              <img
                                src="/chart.png"
                                alt="real-time"
                                style={{ width: "90%" }}
                              />
                              {/* <i className="fas fa-user-check" /> */}
                            </div>
                          </div>
                          <div className="col col-stats ms-3 ms-sm-0">
                            <div className="numbers">
                              <p
                                className="card-category"
                                style={{ fontWeight: "700" }}
                              >
                                {" "}
                                Over All Current Aum
                              </p>
                              <h4 className="card-title">
                                {formatter.format(calculateAllCurrentAum())}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <div className="card card-stats card-round text-center">
                      <div
                        className="card-body"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #e74a3b, #ffc107d9)",
                          borderRadius: "10px",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-icon">
                            <div className="icon-big text-center icon-success bubble-shadow-small">
                              {/* <i className="fas fa-luggage-cart" /> */}
                              <img
                                src="/progressive.png"
                                alt="real-time"
                                style={{ width: "90%" }}
                              />
                            </div>
                          </div>
                          <div className="col col-stats ms-3 ms-sm-0">
                            <div className="numbers">
                              <p
                                className="card-category"
                                style={{ fontWeight: "700" }}
                              >
                                Percentage
                              </p>
                              <h4 className="card-title">
                                {persentageAllAum()}%
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <h4
                    className="text-center"
                    style={{ color: "black", fontWeight: "500" }}
                  >
                    Strategies
                  </h4>
                  <div className="table-responsive mb-4 ">
                    <table className="table text-center">
                      <thead className="thead-light">
                        <tr style={headerfontsize}>
                          <th
                            scope="col"
                            className="rounded-left "
                            style={shadedBorderStyle}
                          >
                            Strategy Name
                          </th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Pnl</th>
                          <th scope="col">live Pnl</th>
                          <th scope="col">Original AUM</th>
                          <th scope="col">Current AUM</th>
                          {/* <th scope="col">Current position</th> */}
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "12px" }}>
                        {strategies.map((strategy, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td
                                className={`rounded-left ${
                                  expandedStrategy === strategy?.fund_id
                                    ? "d-flex justify-content-center"
                                    : ""
                                }`}
                                onClick={() => {
                                  // Toggle expanded state of strategy
                                  toggleExpanded(strategy);
                                  setChartshow(true);
                                  // Update product state with mapped data from itemData
                                  setProduct(
                                    strategy.strategies[0].instruments.map(
                                      (item) => ({
                                        ...item,
                                        strategie_name:
                                          strategy.strategies[0].strategy_name,
                                      })
                                    )
                                  );
                                  // Set data in localStorage
                                  localStorage.setItem(
                                    "ResetData",
                                    JSON.stringify({
                                      condition: false,
                                      itemId:
                                        strategy.strategies[0].strategy_id,
                                      strategyname:
                                        strategy.strategies[0].strategy_name,
                                      fund_id: strategy?.fund_id,
                                    })
                                  );
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {strategy.fund_name}
                                <svg
                                  height={24}
                                  width={24}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    transform: "rotate(90deg)",
                                    display:
                                      expandedStrategy === strategy?.fund_id
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </td>
                              <td style={shadedBorderStyle}>
                                {calculateTotalInstrumentsLength(strategy)}
                              </td>
                              <td className="text-center">
                                <div
                                  className={
                                    calculateTotalInstrumepnl(strategy) == 0
                                      ? "Zero p-1"
                                      : calculateTotalInstrumepnl(strategy) >= 0
                                      ? "Active p-1"
                                      : "InActive p-1"
                                  }
                                >
                                  {formatter.format(
                                    calculateTotalInstrumepnl(strategy)
                                  )}
                                  <svg
                                    height={20}
                                    width={20}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                      display: `${
                                        calculateTotalInstrumepnl(strategy) == 0
                                          ? "none"
                                          : ""
                                      }`,
                                      transform: `${
                                        calculateTotalInstrumepnl(strategy) >= 0
                                          ? "rotate(-90deg)"
                                          : "rotate(90deg)"
                                      }`,
                                      color: `${
                                        calculateTotalInstrumepnl(strategy) >= 0
                                          ? "#005200"
                                          : "red"
                                      }`,
                                    }}
                                  >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path
                                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </td>
                              <td className="text-center">
                                <div
                                  className={
                                    calculateTotalInstrumeunrealizedpnl(
                                      strategy
                                    ) == 0
                                      ? "Zero p-1"
                                      : calculateTotalInstrumeunrealizedpnl(
                                          strategy
                                        ) >= 0
                                      ? "Active p-1"
                                      : "InActive p-1"
                                  }
                                >
                                  {formatter.format(
                                    calculateTotalInstrumeunrealizedpnl(
                                      strategy
                                    )
                                  )}
                                  <svg
                                    height={20}
                                    width={20}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                      display: `${
                                        calculateTotalInstrumeunrealizedpnl(
                                          strategy
                                        ) == 0
                                          ? "none"
                                          : ""
                                      }`,
                                      transform: `${
                                        calculateTotalInstrumeunrealizedpnl(
                                          strategy
                                        ) >= 0
                                          ? "rotate(-90deg)"
                                          : "rotate(90deg)"
                                      }`,
                                      color: `${
                                        calculateTotalInstrumeunrealizedpnl(
                                          strategy
                                        ) >= 0
                                          ? "#005200"
                                          : "red"
                                      }`,
                                    }}
                                  >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path
                                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </div>
                              </td>
                              <td>{formatter.format(strategy.fund_aum)}</td>
                              <td>
                                {formatter.format(
                                  parseInt(strategy.fund_aum) +
                                    parseInt(
                                      calculateTotalInstrumepnl(strategy)
                                    )
                                )}
                              </td>
                              {/* <td>{formatter.format(calculateTotalliveprice(strategy))}</td> */}
                              {/* <td>{calculateTotalcurrentposition(strategy)}</td> */}
                            </tr>
                            {expandedStrategy === strategy?.fund_id &&
                              strategy.strategies.map((itemData) => (
                                <tr
                                  className={
                                    Stategydata.itemId == itemData.strategy_id
                                      ? "Startegy-select"
                                      : ""
                                  }
                                >
                                  <td
                                    className="rounded-left"
                                    style={smallbuttonvalue}
                                    onClick={() => {
                                      setProduct(
                                        itemData.instruments.map((item) => ({
                                          ...item,
                                          strategie_name:
                                            itemData.strategy_name,
                                        }))
                                      );
                                      localStorage.setItem(
                                        "ResetData",
                                        JSON.stringify({
                                          condition: false,
                                          itemId: itemData.strategy_id,
                                          strategyname: itemData.strategy_name,
                                          fund_id: strategy?.fund_id,
                                        })
                                      );
                                    }}
                                  >
                                    {itemData.strategy_name}
                                  </td>
                                  <td style={smallbutton}>
                                    {" "}
                                    {itemData.instruments.length}
                                  </td>
                                  <td>
                                    <span
                                      className={
                                        calculateTotalRealizedPnL(
                                          itemData.instruments
                                        ) == 0
                                          ? "Zero p-1"
                                          : calculateTotalRealizedPnL(
                                              itemData.instruments
                                            ) >= 0
                                          ? "Active p-1"
                                          : "InActive p-1"
                                      }
                                      style={{
                                        display:
                                          expandedStrategy === strategy?.fund_id
                                            ? ""
                                            : "none",
                                        fontSize: "11px",
                                      }}
                                    >
                                      {formatter.format(
                                        calculateTotalRealizedPnL(
                                          itemData.instruments
                                        )
                                      )}
                                      <svg
                                        height={20}
                                        width={20}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                          display: `${
                                            calculateTotalRealizedPnL(
                                              itemData.instruments
                                            ) == 0
                                              ? "none"
                                              : ""
                                          }`,
                                          transform: `${
                                            calculateTotalRealizedPnL(
                                              itemData.instruments
                                            ) >= 0
                                              ? "rotate(-90deg)"
                                              : "rotate(90deg)"
                                          }`,
                                          color: `${
                                            calculateTotalRealizedPnL(
                                              itemData.instruments
                                            ) >= 0
                                              ? "#005200"
                                              : "red"
                                          }`,
                                        }}
                                      >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                  </td>

                                  <td>
                                    <span
                                      className={
                                        calculateTotallivePnL(
                                          itemData.instruments
                                        ) == 0
                                          ? "Zero p-1"
                                          : calculateTotallivePnL(
                                              itemData.instruments
                                            ) >= 0
                                          ? "Active p-1"
                                          : "InActive p-1"
                                      }
                                      style={{ fontSize: "11px" }}
                                    >
                                      {formatter.format(
                                        calculateTotallivePnL(
                                          itemData.instruments
                                        )
                                      )}
                                      <svg
                                        height={20}
                                        width={20}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                          display: `${
                                            calculateTotallivePnL(
                                              itemData.instruments
                                            ) == 0
                                              ? "none"
                                              : ""
                                          }`,
                                          transform: `${
                                            calculateTotallivePnL(
                                              itemData.instruments
                                            ) >= 0
                                              ? "rotate(-90deg)"
                                              : "rotate(90deg)"
                                          }`,
                                          color: `${
                                            calculateTotallivePnL(
                                              itemData.instruments
                                            ) >= 0
                                              ? "#005200"
                                              : "red"
                                          }`,
                                        }}
                                      >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                  </td>

                                  <td style={smallbutton1}>
                                    {formatter.format(itemData.strategy_aum)}
                                  </td>

                                  <td style={smallbutton1}>
                                    {formatter.format(
                                      parseInt(itemData.strategy_aum) +
                                        parseInt(
                                          calculateTotalRealizedPnL(
                                            itemData.instruments
                                          )
                                        )
                                    )}
                                  </td>

                                  {/* <td>{itemData.current_position}</td> */}
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6">
                  <div>
                    <h4
                      className="text-center"
                      style={{ color: "black", fontWeight: "500" }}
                    >
                      {Stategydata?.strategyname}
                    </h4>
                    <div
                      className="table-responsive"
                      style={{ maxHeight: "365px", overflowY: "auto" }}
                    >
                      <table className="table text-center">
                        <thead className="thead-light">
                          <tr style={headerfontsize}>
                            <th
                              scope="col"
                              style={shadedBorderStyle}
                              className="rounded-left "
                            >
                              Products
                            </th>
                            <th scope="col">Exchange</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Pnl</th>
                            <th scope="col">Live Pnl</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "12px" }}>
                          {product &&
                            product.map((strategy1, index) => (
                              <tr key={index}>
                                <td className="rounded-left ">
                                  {strategy1.instrument_name}{" "}
                                </td>
                                <td style={shadedBorderStyle}>
                                  {strategy1.strategie_name}
                                </td>

                                <td>1</td>
                                <td>
                                  <span
                                    className={
                                      strategy1.realized_pnl == 0
                                        ? "Zero p-1"
                                        : strategy1.realized_pnl >= 0
                                        ? "Active p-1"
                                        : "InActive p-1"
                                    }
                                  >
                                    {formatter.format(strategy1.realized_pnl)}
                                    <svg
                                      height={20}
                                      width={20}
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{
                                        display: `${
                                          strategy1.realized_pnl == 0
                                            ? "none"
                                            : ""
                                        }`,
                                        transform: `${
                                          strategy1.realized_pnl >= 0
                                            ? "rotate(-90deg)"
                                            : "rotate(90deg)"
                                        }`,
                                        color: `${
                                          strategy1.realized_pnl >= 0
                                            ? "#005200"
                                            : "red"
                                        }`,
                                      }}
                                    >
                                      <path d="M0 0h24v24H0z" fill="none" />
                                      <path
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className={
                                      strategy1.live_pnl == 0 ||
                                      strategy1.live_pnl == "NA"
                                        ? "Zero p-1"
                                        : strategy1.live_pnl >= 0
                                        ? "Active p-1"
                                        : "InActive p-1"
                                    }
                                  >
                                    {formatter.format(
                                      strategy1.live_pnl == "NA"
                                        ? "0"
                                        : strategy1.live_pnl
                                    )}
                                    <svg
                                      height={20}
                                      width={20}
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{
                                        display: `${
                                          strategy1.live_pnl == 0 ||
                                          strategy1.live_pnl == "NA"
                                            ? "none"
                                            : ""
                                        }`,
                                        transform: `${
                                          strategy1.live_pnl >= 0
                                            ? "rotate(-90deg)"
                                            : "rotate(90deg)"
                                        }`,
                                        color: `${
                                          strategy1.live_pnl >= 0
                                            ? "#005200"
                                            : "red"
                                        }`,
                                      }}
                                    >
                                      <path d="M0 0h24v24H0z" fill="none" />
                                      <path
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row justify-content-center mt-4">
                    <div className="col-md-12">
                      <h5 className="text-center">Allocation</h5>
                      <div className="d-flex justify-content-center">
                        <ApexChart product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </>
  );
};

export default Indiandashboard;
