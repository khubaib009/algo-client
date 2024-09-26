import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
// import ChartCard from '../../ui-component/cards/ChartCard';
// import PopularCard from '../../ui-component/cards/PopularCard';

import './index.css';
import {
  Equity,
  Metal,
  Reversal,
  Arbitrage,
  Momentum,
  FactorBalancing
} from './Arr';
import { useMediaQuery } from 'react-responsive';

const getInputFields = (label) => {
  switch (label) {
    case 'Equities':
      return Equity;
    case 'Metal':
      return Metal;
    case 'Reversal':
      return Reversal;
    case 'Arbitrage':
      return Arbitrage;
    case 'Momentum':
      return Momentum;
    case 'FactorBalancing':
      return FactorBalancing;
    default:
      return [];
  }
};

const getCombinedInputArray = (labels) => {
  const combinedArray = [];
  labels.forEach((label) => {
    switch (label) {
      case 'Momentum':
        combinedArray.push(...Momentum);
        break;
      case 'Reversal':
        combinedArray.push(...Reversal);
        break;
      case 'Metal':
        combinedArray.push(...Metal);
        break;
      case 'Equities':
        combinedArray.push(...Equity);
        break;
      case 'Arbitrage':
        combinedArray.push(...Arbitrage);
        break;
      default:
        break;
    }
  });

  return combinedArray;
};

const App = () => {
  // const [dragedButtons, setDragedButtons] = useState(['Momentum', 'Arbitrage', 'Reversal', 'Equities', 'Metal']);
  const [dragedButtons, setDragedButtons] = useState(['FactorBalancing']);
  const [droppedButtons, setDroppedButtons] = useState([]);
  const [collapsibleStates, setCollapsibleStates] = useState({});
  const [combine, setCombine] = useState(false);
  const [generatedMap, setGeneratedMap] = useState(null);
  const [radioArr, setRadioArr] = useState([]);
  const [dragBtn, setDragBtn] = useState(false);
  const [prefBtn, setPrefBtn] = useState(false);
  const [HideInput, setHideInput] = useState(false);
  const [DragHovered, setDragHovered] = useState(false);
  const [MenuHovered, setMenuHovered] = useState(false);
  const [InHovered, setInHovered] = useState(-1);
  const [RadiaHovered, setRadiaHovered] = useState(-1);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
 


  function showLoadingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'flex';
  }

  // Hide loading overlay
  function hideLoadingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
  const [alpha, setAlpha] = useState({
    "alpha_eq_2": 0.05,
    "balanced_eq_2":0.75,
    "moment_eq_2": 0.20,
  });
  const [name,setname]= useState({
    "name_eq_2":'string'
  });
  const [date,setdate]= useState({
    "start_date_eq_2":"2020-01-01",
    "end_date_eq_2": "2023-01-31",
  });
  const [select,setSelect]= useState({
    'active_eq_2':'true'
  });

  const handleDownload1 = () => {
    const pdfFilePath = '/source/Outpout.pdf';
    const pdfUrl = window.location.origin + pdfFilePath;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${radioArr.length ? "AlgoEdge" :'FactorBalancing '}.pdf`; // You can set the downloaded file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // console.log('alphp',select);
  const handleSubmit=()=>{
    // handleDownload1();
  const initialValues ={
    symbol:"AAPL",
    strategy_name: "FactorBalancing",
    name: name.name_eq_2,
    active: select.active_eq_2,
    parameters: {},
    start_date:date.start_date_eq_2,
    end_date:date.end_date_eq_2,
    alpha:alpha.alpha_eq_2,
    balanced:alpha.balanced_eq_2,
    moment:alpha.moment_eq_2,
  }
    // };
      const fetchData = async () => {
        try {
          let response = await fetch(`http://localhost:8081/api/v1/live_strategy/run`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(initialValues),
          });
          if (response.ok) {
            let result = await response.json();
            console.log(result);
            // setData(result)
            // navigate('/call'); 
          } else {
            console.error("Request failed with status:", response.status);
           
            if (response.status === 401) {
              console.error("Unauthorized access");
            }
          }
        } catch (e) {
          console.error("Error:", e);
          
        }
      };
    fetchData();
  }

  const InputField = ({ label, combine = [] }) => {
 
    var inputFields = []
    if (combine.length) {
      inputFields = getCombinedInputArray(combine);
    } else {
      inputFields = getInputFields(label);
    }
  
    return (
      <div>
        {inputFields && inputFields.map((section, sectionIndex) => {
         return( <div className="section" key={sectionIndex}>
            {section.fields && Array.isArray(section.fields) && section.fields.length > 0 ? (
              <div className="row" >
              {section.fields.map((item, index) => {
                return(<div className="col-6" key={index}>
                    <label className="form-label" htmlFor={item.id}>
                      {item.label}
                    </label>
                    {item.type === 'text' && item.name ==='symbol_eq_2' && (
                      <>
                        <input
                         type="text"
  className="form-control"
  id={item.id}
  name={item.name}
  value={item.defaultValue}
  onClick={() => setInHovered(index)}
/>

                        <div
                          className={`alert-view ${InHovered === index ? 'd-block' : 'd-none'}`}
                          style={{ borderRadius: "5px", height: "40px" }}
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" /> Enter your stock {item.label} like {item.defaultValue}
                        </div>
                      </>
                    )}
                    {item.type === 'text' && item.name !=='symbol_eq_2' && (
                      <>
                        <input
  type="text"
  className="form-control"
  id={item.id}
  name={item.name}
  value={name[item.name] !== undefined ? name[item.name] : item.defaultValue}
  onChange={(e) => {
    const value = e.target.value; // No need to parse for text input
    setname(prevName => ({
      ...prevName,
      [item.name]: value
    }));
  }}
  onClick={() => setInHovered(index)}
/>

                        <div
                          className={`alert-view ${InHovered === index ? 'd-block' : 'd-none'}`}
                          style={{ borderRadius: "5px", height: "40px" }}
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" /> Enter your stock {item.label} like {item.defaultValue}
                        </div>
                      </>
                    )}
                    {item.type === 'number' && (
       <>
    <input
      type="number"
      className="form-control"
      id={item.id}
      name={item.name}
      value={alpha[item.name] !== undefined ? alpha[item.name] : item.defaultValue}
      onChange={(e) => {
        const value = parseFloat(e.target.value); // Parse value to a number
        setAlpha(prevAlpha => ({
          ...prevAlpha,
          [item.name]: value
        }));
      }}
      onClick={() => setInHovered(index)}
    />
    <div
      className={`alert-view ${InHovered === index ? 'd-block' : 'd-none'}`}
      style={{ borderRadius: "5px", height: "40px" }}
    >
      <i className="fa fa-info-circle" aria-hidden="true" /> Enter your stock {item.label} like {item.defaultValue}
    </div>
  </>
)}
                        {item.type === 'date' && (
                      <>
                        <input
  type="date"
  className="form-control"
  id={item.id}
  name={item.name}
  value={date[item.name] !== undefined ? date[item.name] : item.defaultValue}
  onChange={(e) => {
    const value = e.target.value; // No need to parse for date input
    setdate(prevDate => ({
      ...prevDate,
      [item.name]: value
    }));
  }}
  onClick={() => setInHovered(index)}
/>

                        <div
                          className={`alert-view ${InHovered === index ? 'd-block' : 'd-none'}`}
                          style={{ borderRadius: "5px", height: "40px" }}
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" /> Enter your stock {item.label} like {item.defaultValue}
                        </div>
                      </>
                    )}
                    {item.type === 'select' && (
  <select
    id={item.id}
    className="form-select"
    name={item.name}
    value={select[item.name] !== undefined ? select[item.name] : item.defaultValue}
    onChange={(e) => {
      const value = e.target.value;
      setSelect(prevSelect => ({
        ...prevSelect,
        [item.name]: value
      }));
    }}
  >
    {item.options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
)}

                  </div>)
                })}
            
                </div>
            ) : null}
          </div>)
  })}
      </div>
     
    );
    
return "no data"
    return (
      <div>
        {inputFields && inputFields.map((section, sectionIndex) => (
          <div className="section" key={sectionIndex}>
            {section.fields && Array.isArray(section.fields) && section.fields.length > 0 ? (
              section.fields.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col-6">
                    <label className="form-label" htmlFor={item.id}>
                      {item.label}
                    </label>
                    {item.type === 'text' && (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          id={item.id}
                          name={item.name}
                          value={index === 0 ? '' : item.defaultValue}
                          onClick={() => setInHovered(index)}
                        />
                        <div
                          className={`alert-view ${InHovered == index ? 'd-block' : 'd-none'}`}
                          style={{ borderRadius: "5px", height: "40px" }}
                        >
                          <i className="fa fa-info-circle" aria-hidden="true" /> Enter your stock {item.label} like {item.defaultValue}
                        </div>
                      </>
                    )}
    
                    {item.type === 'select' && (
                      <select
                        id={item.id}
                        className="form-select"
                        name={item.name}
                        defaultValue={item.defaultValue}
                      >
                        {item.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {/* Second column */}
                  {index + 1 < section.fields.length && (
                    <div className="col-6" key={index + 1}>
                      <label className="form-label" htmlFor={section.fields[index + 1].id}>
                        {section.fields[index + 1].label}:
                      </label>
                      {section.fields[index + 1].type === 'text' && (
                        <input
                          type="text"
                          className="form-control"
                          id={section.fields[index + 1].id}
                          name={section.fields[index + 1].name}
                          defaultValue={section.fields[index + 1].defaultValue}
                        />
                      )}
                      {section.fields[index + 1].type === 'select' && (
                        <select
                          id={section.fields[index + 1].id}
                          className="form-select"
                          name={section.fields[index + 1].name}
                          defaultValue={section.fields[index + 1].defaultValue}
                        >
                          {section.fields[index + 1].options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No fields available</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const Button = ({ label, onDrop, onRemove, isDropButton }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'BUTTON',
      item: { label },
      collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });

    return (
      <div ref={drag}
        onClick={() => {
          if (!isDropButton) {
            setHideInput(true)
            setDragBtn(true)
            handleDrop(label)
          }
        }}
        className={`n-button ${isDropButton ? 'drop-button' : 'drag-button'}`} style={{ opacity: isDragging ? 0.5 : 1 }}
        onMouseEnter={() => setDragHovered(true)}
        onMouseLeave={() => setDragHovered(false)}
      ><span>{label}</span>
        {isDropButton && (
          <span className="remove-button" onClick={() => onRemove(label, 1)}>

            <i className="fa fa-close" style={{ fontSize: '15px', color: "red" }} aria-hidden="true"></i>
          </span>
        )}
      </div>
    );
  };

  const DropZone = ({ onDrop, preArray, children }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'BUTTON',
      drop: (item) => {
        if (!preArray.includes(item.label)) onDrop(item.label);
        setHideInput(true)
        setDragBtn(true)
      },
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });
    return (

      <div ref={drop} className={`div2 drop-zone ${isOver ? 'over' : ''} ${!dragBtn ? 'seventy' : "forty"} `}>
        {children}
        {isOver && <div className="overlay">Drop here</div>}
        <div className="Drag-btn"
          contentEditable={true}
          style={{
            height: "25vh",
            width: isMobile?"50vw":!dragBtn ? '82vw' : '42vw',
            borderTop: "1px solid #86B049",
            padding: "12px",
            display:isMobile?"block":HideInput ? "block" : "none",
            marginTop: "20px",
            position: 'absolute',
            bottom: isMobile?'3vh':0,
          }}>Enter Your Code</div>
      </div>

    );
  };
  const toggleCollapsible = (label, id = 0) => {
    if (id === 1)
      setCombine(true);
    else setCombine(false);
    setCollapsibleStates({});
    setCollapsibleStates((prevStates) => ({
      ...prevStates,
      [label]: !prevStates[label],
    }));
  };
  const handleDrop = (label) => {
    handleRemove(label);
    setDroppedButtons((prevButtons) => [...prevButtons, label]);
    toggleCollapsible(label);
    setPrefBtn(false)
    var data = getInputFields(label);
  };
  const handleRemove = (label, id = 0) => {
    setDragedButtons((prevButtons) => prevButtons.filter((item) => item !== label));
    setCollapsibleStates((prevStates) => {
      const { [label]: removedState, ...newStates } = prevStates;
      return newStates;
    });

    if (id !== 0) {
      setDragedButtons((prevButtons) => [...prevButtons, label]);
      setDroppedButtons((prevButtons) => prevButtons.filter((item) => item !== label));
    }

    const updatedRadioArr = radioArr.filter((item) => item !== label);
    setRadioArr(updatedRadioArr);
  };
  const generateRandomMap = () => {
    handleSubmit()
    setHideInput(false)
    showLoadingOverlay();
    setTimeout(() => {
      hideLoadingOverlay();
    }, 1000);
    
    const label = Object.keys(collapsibleStates).find((key) => collapsibleStates[key] === true);
    const rangeInput = document.getElementById('range');
    const amount = document.getElementById('amount');
    const range = parseInt(rangeInput.value, 10);
    const amountValue = parseInt(amount.value, 10);
    const randomMap = Array.from({ length: range }, (_, index) => {
      const interestRate = Math.random() * 10; // Adjust the multiplier as needed
      const totalAmount = amountValue * (1 + interestRate / 100) ** index;
      return {
        name: `Year ${index + 1}`,
        value: totalAmount.toFixed(2), // Adjust to the desired number of decimal places
      };
    });
    setPrefBtn(true);
    setGeneratedMap({ label, data: randomMap });
  };

  const pushData = (label) => {
    const updatedRadioArr = radioArr.includes(label) ? radioArr.filter((item) => item !== label) : [...radioArr, label];
    setRadioArr(updatedRadioArr);
  };

  const handleDownload = () => {
    const pdfFilePath = '/source/Outpout.pdf';
    const pdfUrl = window.location.origin + pdfFilePath;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${radioArr.length ? "AlgoEdge" : generatedMap.label}.pdf`; // You can set the downloaded file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Index = (label) => {
    const min = Math.min(...radioArr.map(item => droppedButtons.indexOf(item)));
    const max = Math.max(...radioArr.map(item => droppedButtons.indexOf(item)));
    if (droppedButtons.indexOf(label) >= min && droppedButtons.indexOf(label) <= max) {
      return true;
    } else {
      return false;
    }
  }

  const Dragtoggle = ()=>{
    
      setDragBtn(!dragBtn)
      if (droppedButtons.length > 0 && !HideInput) {
        setHideInput(true)
      } else {
        setHideInput(false)
      }
    
  }
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div id="pdf-content" className={`light-mode`}>
          <div className="header-nav">
            <div className="">
              <div style={{ display: 'flex' }}>
                <div
                  className='logoimg'
                  style={{ color: 'white', cursor: "pointer", 
            
                }}
                ><img src="logo.png" width="150px" alt="Logo" /></div>
                <div style={{ marginLeft: "135px",display:isMobile?"none":"block"}}
                 onClick={() =>Dragtoggle() }>
                  {dragBtn ? (
                    <div>
                      <i className="fa fa-bars" aria-hidden="true"
                        onMouseEnter={() => setMenuHovered(true)}
                        onMouseLeave={() => setMenuHovered(false)} />
                      <div className={`alert-view  ${MenuHovered ? "d-block" : "d-none"}`} style={{ position: 'absolute' }}>
                        Add strategy from here
                      </div>
                    </div>
                  ) : (
                    <i className="fa fa-arrow-left" aria-hidden="true" />
                  )}
                </div>
              </div>
            </div>
            <div className={`d-s`} style={{ fontSize: '21px', color: 'white', width: "220px" }}>
              {!HideInput && !(prefBtn && dragBtn)?<span> Strategy Board {isMobile?<i className='fa fa-arrow-right' onClick={()=>Dragtoggle()}/>:null}</span> : null}
            </div>

            {HideInput ? (
              <div className="i-s" style={{ fontSize: '21px', color: 'white' }}>
                {isMobile ?
                <div >
                {isMobile?<i className='fa fa-arrow-left' style={{marginRight:'5px'}}  onClick={()=>Dragtoggle()}/>:null}
                <button className="btn" style={{background:"black",color:"white"}}  onClick={generateRandomMap}>
                <span>
                  Execute <i className="fa fa fa-solid fa-play"></i>
                </span>
              </button>
                </div>
              :'Input'}

              </div>) : null}

            <div style={{ fontSize: '21px', color: 'white', marginLeft: "25%" }} className="d-p">
              {prefBtn && dragBtn ?
                <div>
                  <span
                    className='backInput'
                    onClick={() => {
                      setHideInput(true)
                      setPrefBtn(false)
                    }}>
                  <i className="fa fa-arrow-left"  style={{marginRight:'5px'}} aria-hidden="true" />
                  {!isMobile ? 'Input' : <span>Performance</span>}
                  </span>
                  {!isMobile &&
                    <span>Performance</span>}
                </div> : null}
            </div>
            {HideInput && !isMobile ? (
              <button className="submit-button" onClick={generateRandomMap}>
                <span>
                  Execute <i className="fa fa fa-solid fa-play"></i>
                </span>
              </button>) : null}
          </div>
          <div className="parent adjusted">
            <div className={`div1 ${dragBtn ? 'd-none' : 'd-block'}`}>
              {dragedButtons.map((label, index) => (
                <Button key={index} label={label} onDrop={handleDrop} />
              ))}
              <div class={`alert-view ${DragHovered ? "d-block" : "d-none"}`}>
                <i class="fa fa-info-circle" aria-hidden="true" /> Hi You can drag this strategy and drop it in the Strategy Board.
              </div>
            </div>
            <DropZone onDrop={handleDrop} preArray={droppedButtons}>
              <div>
                {droppedButtons.map((label, index) => (
                  <div className='droper d-flex'>
                    <Button
                      label={label}
                      onRemove={handleRemove}
                      isDropButton
                      isActive={collapsibleStates[label]}
                      toggleCollapsible={() => toggleCollapsible(label)}
                    />
                    <span className={`n-line ${Index(label) ? "active-line" : ""}`}></span>
                    <div className="radio-button">
                      <input
                        type="radio"
                        value={collapsibleStates[label]}
                        checked={radioArr.includes(label)}
                        onClick={() => pushData(label)}
                        onMouseEnter={() => setRadiaHovered(index)}
                        onMouseLeave={() => setRadiaHovered(-1)}
                      />
                    </div>
                    <div
                      className={`alert-view ${RadiaHovered == index ? 'd-block' : 'd-none'  }`}
                      style={{ borderRadius: "5px", height: "45px",position:'absolute',marginLeft:"120px",marginTop:"-22px",zIndex:12}}
                    >
                      <i class="fa fa-info-circle" aria-hidden="true" /> click Here to combine
                    </div>
                    <span className={`s-line ${Index(label) ? "active-line" : ""}`}></span>
                  </div>
                ))}
              </div>
            </DropZone>
            <div
              className={`div3 ${dragBtn && prefBtn ? 'thirtytwo' : !dragBtn || prefBtn ? 'd-none thirtyfive' : 'fifty'}`}
              style={{

                padding: dragBtn ? '5px' : '15px',
                display: HideInput ? 'block' : 'none'
              }} >
              <div style={{ display: 'flex' }}>
                {droppedButtons.map((item, index) => (
                  <div key={index}>
                    <button
                      className={`collapsible ${collapsibleStates[item] ? 'active' : ''}`}
                      onClick={() => toggleCollapsible(item)}
                    >
                      {item}
                    </button>
                  </div>
                ))}
                {radioArr.length > 1 && (
                  <button
                    className={`collapsible ${collapsibleStates[radioArr[0]] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible(radioArr[0], 1)}
                    style={{ width: '90px' }}
                  >
                    combination {radioArr.length}
                  </button>
                )}
              </div>
              <div
                className="container-list"
                style={{
                  display: Object.values(collapsibleStates).some(Boolean) && droppedButtons.length > 0 ? 'block' : 'none',
                }}
              >
                <input type="hidden" id="range" value="7" name="generate-range" />
                <input type="hidden" id="amount" value="10" name="generate-amount" />
                <p style={{ textAlign: 'center' }}>
                  {combine
                    ? radioArr.toString()
                    : Object.keys(collapsibleStates).find((key) => collapsibleStates[key] === true)}
                </p>

                {combine ?
                  <InputField label={Object.keys(collapsibleStates).find((key) => collapsibleStates[key] === true)} combine={radioArr} />
                  :
                  <InputField label={Object.keys(collapsibleStates).find((key) => collapsibleStates[key] === true)} />}

              </div>
            </div>

            <div className="div4" style={{ display: prefBtn && dragBtn ? 'block' : 'none' }}>
              {generatedMap && droppedButtons?.includes(generatedMap.label) && (
                console.log('value', generatedMap),
                <div>
                  <div>
                    <div className='Label' style={{ textAlign: 'center', zIndex: 12 }}>
                      {generatedMap.label}
                    </div>
                    {collapsibleStates[generatedMap.label] && (
                      <div>
                        <BarChart width={800} height={300} data={generatedMap.data}>
                          <Bar dataKey="value" fill="#8884d8" />
                          <CartesianGrid stroke="#ccc" />
                          <XAxis dataKey="name" />
                          <YAxis />
                        </BarChart>
                      </div>
                    )}
                  </div>
                  <button className="btn btn-danger" onClick={handleDownload}>Download</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
