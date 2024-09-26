import React ,{useState,useEffect} from "react";

const TransactionTable = ({ dates, Graphvalue }) => {   
  const [transaction, setransaction] = useState(false);
  const [graph, setGraph] = useState([]);
  var graphValuetofetch=Graphvalue.result;
  const date1 = graphValuetofetch.map(item => item.Date.split("T")[0]);

  const filteredDates = date1.filter((dateStr, index, dates) => {
    if (index === 0) return true; 
    const currentDate = new Date(dateStr);
    const previousDate = new Date(dates[index - 1]);
    const differentMonth = currentDate.getMonth() !== previousDate.getMonth();
    const isLastDate = index === dates.length - 1;
    return differentMonth || (isLastDate && currentDate.getMonth() !== new Date(dates[index - 2]).getMonth());
});

  console.log('filteredDates',filteredDates);
 useEffect(()=>{
    var date = new Date(filteredDates[0]);
       var month = date.getMonth();
        var year = date.getFullYear();
        const filteredDatavaluefirst = graphValuetofetch.filter(item => {
            const itemDate1 = new Date(item.Date)
            return itemDate1.getFullYear() === year && itemDate1.getMonth() === month;
        });
        setGraph(filteredDatavaluefirst);
  },[])


const handlegraphvalue = (value) => {
const date = new Date(value);
        const month = date.getMonth();
        const year = date.getFullYear();
        const filteredDatavalue = graphValuetofetch.filter(item => {
            const itemDate = new Date(item.Date)
            return itemDate.getFullYear() === year && itemDate.getMonth() === month;
        });
            setGraph(filteredDatavalue);
    }
  return (
    <div className="col-lg-6 mb-lg-0 mb-4">
      <div className="card ">
        <div className="pb-0 p-3">
          <div className="d-flex justify-content-between">
            <h5 className="mb-2 font-weight-bolder transaction">
              Transaction History <i
                          className="bi bi-info-circle iconesize"
                          onMouseEnter={() => {
                            setransaction(true);
                          }}
                          onMouseLeave={() => {
                            setransaction(false);
                          }}
                        ></i>
                          {transaction && (
                <div className="notification-box-drag-tran">
                  Discover the transformative potential of our "Optimized S&P
                  Strategy," a groundbreaking approach meticulously crafted by
                  our distinguished Quant Team. Set against the backdrop of th
                </div>
              )}
            </h5>
          
            
            <div className="table-responsive">
          

              <form className="d-flex mb-3">
                <input
                  className="form-control me-4 searchvalue"
                  type="search"
                  placeholder="Search Past Transaction"
                  aria-label="Search"
                />
                <select
              className="form-control Selectoption"
               style={{ width: "100px"}}
               onChange={(e)=>{
                handlegraphvalue(e.target.value)
               }}
                >
                   {filteredDates.map((dateStr, index) => (
                    <option key={index} value={dateStr}>{dateStr}</option>
                  ))}   
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table align-items-center tablecolor">
            <tbody>
              <tr>
              <th className="tablehead">Weeks</th>
              <th className="tablehead">close</th>
              <th className="tablehead">Percent Change</th>
              </tr>
              {graph && graph.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="text-center">
                        <span className="text-sm mb-0 inputvalues">
                          {item.Date.split("T")[0]}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="text-center">
                        <span className="text-sm mb-0 inputvalues">
                          {item.Close.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <span className="text-sm mb-0 inputvalues">
                          {item.Percent_Change.toFixed(2)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
