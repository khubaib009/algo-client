import {React,useState } from 'react'
import "./style.css"
import {
    LOGOUT,
  } from "../../utils/ApiRoute";
  import { Modal, Button, Form } from 'react-bootstrap';

const Header = ({check,setcheck,display}) => {
  const [showModal, setShowModal] = useState(false);
    



    // const handleCheckboxChange = () => {
    //     setcheck(!check);
    //   };
    const handlelogout = () => {
      setShowModal(false)
        const authorizationValue = JSON.parse(localStorage.getItem("logindata"));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `${authorizationValue.token_type} ${authorizationValue.access_token}`
        );
        fetch(LOGOUT, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({}),
        })
          .then((response) => {
            console.log("response", response);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            } else if (response.ok) {
              window.location.href = "/";
              localStorage.clear();

            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      };
  return (
    <div className="header-nav1">
    <div className="">
      <div className="d-flex">
        <div
          className="logoimg"
          style={{
            color: "white",
            cursor: "pointer",
          }}
        >
          <img src="logo3.png" width="150px" alt="Logo" />
        </div>
      </div>
    </div>
    <div className="checkbox-wrapper-25 gap-2">
    {display == 0?(
           <button

           className="btn btn-light btn-sm"
           onClick={()=>{ window.location.href = '/optimized_sp'}}
         >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
</svg> 
<span className='d-none d-md-inline'>Go Back </span>  {" "}
         </button>
      //       <>
      // <p className="devmode">Dev Mode</p>
      // <input
      //   type="checkbox"
      //   checked={check}
      //   onChange={handleCheckboxChange}
      // />
      //       </>
        ):null}
        {display != 0?(
           <button
           className={`btn ${check ? 'btn-light' : 'btn-secondary'} btn-sm`}
           onClick={() => {
            setcheck(!check);
           }}
         >
          Dev Mode{" "}
         </button>
        ):null}
        
       <button
        className="btn btn-secondary btn-sm ">
       Go Live{" "}
      </button>
        
      <button
        className="btn btn-light btn-sm d-flex align-items-center"
        onClick={() => { setShowModal(true)

        }}
      >
       <span className='d-none d-md-inline'>Logout</span> <img className='logoutsymbole' src="logout.png" alt='logout'/>   </button>
    </div>
    <Modal
  show={showModal}
  size="md"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  style={{ borderRadius: '10px' ,marginTop:'-10%'}} // Example style
>
  <Modal.Header>
    {/* <Modal.Title id="contained-modal-title-vcenter">
      Create a New Blog
    </Modal.Title> */}
  </Modal.Header>
  <Modal.Body>
   <h5> Are you sure you want to logout?</h5  >
  </Modal.Body>
  <Modal.Footer style={{
   
  }}>
    <Button
      variant="secondary"
      onClick={() => {
        setShowModal(false);
      }}
      style={{ marginRight: '10px' }} // Example style
    >
      No
    </Button>
    <Button
      variant="primary"
      onClick={() => {
        handlelogout();
      }}
    >
      Yes
    </Button>
  </Modal.Footer>
</Modal>

  </div>
  )
}

export default Header