import React, { useState ,useEffect} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../utils/Function";
import { CloseButton, toast } from "react-toastify";
import { LOGIN ,USERME} from "../../utils/ApiRoute";
import { Modal, Button, Form } from 'react-bootstrap';
const Login = () => {
  const [toastShown, setToastShown] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const handleClose = () => {
    setShowModal(false);
};
const handleToastClose = () => {
  setToastShown(false);
};
const handleShow = () =>{
  toast.success("Login Successfully",{
    autoClose: 3000,
    closeButton: false,
    onClose: handleToastClose, 
  })
  localStorage.setItem('isLoggedIn', true);
  sessionStorage.setItem('terms', true);
   window.location.href = '/optimized_sp';
} ;


  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

const LoginCheck = () => {  
  const capitalizeFirstLetter = (string) => {
    if (typeof string === 'string') {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else if (typeof string === 'object' && string !== null) {
      const key = Object.keys(string)[0];
      const value = string[key];
      return { [key]: value.charAt(0).toUpperCase() + value.slice(1) };
    }
    return string;
  };
 
  
  if (Object.keys(validateForm(formdata)).length !== 0 &&!toastShown) {
    const errorMessage = Object.values(validateForm(formdata))[0];
    const formattedErrorMessage = capitalizeFirstLetter(errorMessage);
    toast.error(formattedErrorMessage,{
        autoClose: 3000, // Close after 6 seconds
        closeButton: false, // Hide the default close button
        onClose: handleToastClose, // Handle onClose event if it's triggered
      }
    );
    setToastShown(true);  
    return;
  }
    fetch(LOGIN, {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    'grant_type': '',
    'username': formdata.username,
    'password': formdata.password,
    'scope': '',
    'client_id': '',
    'client_secret': ''
  })
})
  .then(response => {
    if (!toastShown && !response.ok) {
      toast.error("Incorrect Username or Password. Please try again",{
        autoClose: 3000, // Close after 6 seconds
        closeButton: false, // Hide the default close button
        onClose: handleToastClose, 
      });
      setToastShown(true);
      throw new Error(response.detail);
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem("logindata",JSON.stringify(data));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${data.token_type} ${data.access_token}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
   fetch(USERME, requestOptions)
   .then(response => { 
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }else if(response.ok){
      if(JSON.parse(sessionStorage.getItem('terms')) === true){
        toast.success("Login Successfully",{
          autoClose: 3000,
          closeButton: false,
          onClose: handleToastClose, 
        })
        localStorage.setItem('isLoggedIn', true);
         window.location.href = '/optimized_sp';
      }else {
        setShowModal(true);
      }
      return response.text();       
    }
    return response.text(); 
})
        .then(result =>{
          localStorage.setItem("users", result);
          
        })
        .catch(error => console.error(error));
})
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
    }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  return (
    <>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
     <div className="form" onSubmit={() => LoginCheck()}>
        <img src="/logo.png" className="logoimage" />
        {/* <h3 className="titlename"> Login </h3> */}
        <label htmlFor="username" className="titlename">Username</label>
        <input
          type="text"
          className="form-control"
          style={{ height: "auto" }}
          placeholder="Email or Phone No"
          id="username"
          name="username"
          value={formdata.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password" className="titlename">Password</label>
        <input
          type="password"
          className="form-control"
          style={{ height: "auto" }}
          placeholder="Password"
          id="password"
          name="password"
          value={formdata.password}
          onChange={handleInputChange}
        />
        <div>
  
        </div>
        <button onClick={() => LoginCheck()} className="loginButton" >
         Log In
        </button>
        <div style={{marginTop:'10%',display:'flex',justifyContent:'center'}}>
   {/* <span className="signup" onClick={()=>{ window.location.href = '/register'}}>Don't have an account? Signup now </span> */}
        </div>
     
     
        <Modal show={showModal} onHide={handleClose} className='modelfilter'>
        <Modal.Header className='modelheader'>
                        <Modal.Title style={{color:'#ffff'}} >Terms and Condition</Modal.Title>
                        <button type="button" className="close btn " onClick={handleClose}>
                            <span className="buttoncolor" aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
      <div className="innertext" style={{ paddingTop: '20px', overflowY: 'auto',maxHeight:'80vh' }}> 
      <h6> END USER BETA TESTING LICENSE AGREEMENT FOR ALGOEDGE SOFTWARE</h6>

<p>PLEASE READ THIS LICENSE CAREFULLY BEFORE USING THIS SOFTWARE. BY CLICKING BELOW OR BY INSTALLING THIS SOFTWARE YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.</p>

<p>This Beta Testing License Agreement ("Agreement") is entered into between the user ("You or Your") and AlgoEdge Ltd. ("Licensor"), governing your participation in the beta testing program for the preliminary version of our software ("Beta Software"). By accessing the Beta Software, you affirm that you are over the age of 18 and consent to abide by this Agreement and our Privacy Policy. Your use indicates acceptance of these terms, and if you do not agree, you must cease using the Beta Software immediately. The Software, accessible via https://www.algoedge.io, and any accompanying documentation, updates, or subsequent versions, are protected under applicable copyright law and international treaties, with all rights reserved by the Licensor, except as expressly granted herein.</p>

<h6>Definitions:-</h6>
<p>A. Beta Software:- “Beta software” refers to a version of software that is still under development and testing but has been released to a select group of users outside of the software development team for real-world exposure and feedback. This stage follows the alpha phase, where the software is typically tested internally, and precedes the final release or production version. The purpose of a beta test is to identify bugs, performance issues, and gather user feedback on the software's functionality and usability. Beta versions are more polished than alpha versions but may still contain some errors and are not considered complete”</p>
<p>B. Users:- “refers to an individual or entity that participates in the testing phase of the software development life cycle by using the beta version of the software. This participation can occur in either a formal testing environment or as part of everyday activities, depending on the nature of the beta program. The user’s role is to provide feedback on software performance, identify bugs or errors, and offer insights into user experience and usability. This feedback is crucial for developers to make necessary improvements before the software’s final release”</p>
<p>C. Limited License: “The license typically grants users a limited, non-exclusive, and non-transferable right to use the beta software solely for testing and evaluation purposes. This means users cannot sell, distribute, or otherwise use the software for commercial purposes without the developer's explicit permission. This license includes terms that allow the developer to terminate the license at any time without notice. This could be due to the end of the beta testing phase, significant changes to the software, or any breach of the agreement by the user.</p>
<p>D. Confidentiality: Beta versions of software may include confidential or proprietary information. Licensing agreements often require users to maintain the confidentiality of the software, including its features, bugs, and performance metrics, and not to disclose any details to third parties without the developer's consent.</p>
<p>E. Disclaimer of Warranty: Beta software is provided on an "as is" basis, and the licensing agreement usually includes a disclaimer of warranties. This means the developer does not guarantee the software's performance, stability, or error-free operation during the beta phase. Users acknowledge the risks associated with using beta software, including potential data loss or software malfunctions.</p>
<p>F. Liability Limitation: The agreement may limit the developer's liability related to the use of the beta software. It often states that the developer is not liable for any direct, indirect, incidental, or consequential damages that may arise from using the software, including data loss or system failure.</p>
<p>G.Software: means computer programs, source code, source code listings, object code listings, design details, algorithms, processes, flow charts, formulae, and related material that would enable the software to be reproduced, recreated, or recompiled.</p>


<h6>1. ACCEPTANCE OF TERMS</h6>

<p>1.1 These Terms constitute a legal agreement between You and Licensor. By using the Beta Software, you agree to be bound by these Terms, as well as any additional terms and conditions that may apply to specific features or services provided as part of the Beta Software.</p>

<p>1.2 We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Beta Software after any changes indicates your acceptance of the new Terms.</p>

<p>1.3 As a condition of this Agreement, you agree to provide thorough feedback to the Licensor, including but not limited to comments, criticisms, suggestions, and identification of errors or malfunctions in the operation of the Beta Software. Your feedback is crucial for the development and enhancement of the Software, and by providing such feedback, You grant the Licensor the right to use it for the Software's improvement without any obligation to You. This Agreement constitutes the complete understanding between You and the Licensor regarding Your participation in the beta testing program.</p>

<h6>2. BETA SOFTWARE USE</h6>

<p>2.1 Under the terms of this Agreement, You, the User, expressly acknowledge and agree that the Beta Software is provided on an "as-is" and "as available" basis, with no warranties, express or implied, of any kind, including but not limited to warranties of performance, merchantability, fitness for a particular purpose, or reliability. You understand and accept that the Beta Software may not operate as expected, may contain defects, errors, and may undergo significant changes, reflecting its status as a product under development for testing and evaluation purposes only. Consequently, Your usage of the Beta Software is entirely at Your own risk, and You are fully aware that such use could result in system or other failures and potential data loss. The Licensor unequivocally disclaims all liability for any direct, indirect, incidental, consequential, or any other form of harm or damage that may arise from Your use of the Beta Software. By proceeding to use the Beta Software, You fully comprehend and consent to bear all risks associated with its operation and performance, acknowledging that the Licensor bears no responsibility for any adverse outcomes resulting from such use.</p>

<p>2.2 The Licensor grants You a non-exclusive, non-transferable, revocable license to use the Beta Software solely for testing and evaluation purposes. This license does not grant You any rights to sell, distribute, or otherwise commercialize the Beta Software.</p>

<p>2.3 You agree not to use the Beta Software for any commercial, production, or mission-critical purposes. The Beta Software is not intended for use in live or production environments.</p>

<h6>3. USER FEEDBACK AND CONSENT</h6>

<p>3.1 By entering into this Agreement, You expressly consent to the Licensor's collection and utilization of technical data and related information gathered as part of any product support services provided to you in connection with the Software. This information may encompass, but is not limited to, technical specifications, system interactions, and performance metrics related to your use of the Beta Software. The Licensor commits to using this data exclusively for the purpose of enhancing product functionality, developing tailored services, or advancing technological offerings. It is expressly understood that such collected information will be processed and handled in a manner that does not personally identify You, safeguarding Your anonymity and privacy in compliance with applicable data protection laws.</p>

<p>3.2 As a participant in the beta testing program, you are obligated to furnish the Licensor with prompt, candid, and comprehensive feedback concerning your experiences with the Beta Software. This feedback should detail all observed operational aspects, including but not limited to the identification of bugs, errors, and malfunctions, as well as the provision of constructive suggestions for product improvement and enhancement. Your engagement in providing such feedback is crucial to the iterative development process, enabling the Licensor to address potential deficiencies in the Software and to refine its overall performance and user experience.</p>

<p>3.3 In recognition of the value of Your feedback to the ongoing development and refinement of the Software, you hereby grant the Licensor a non-exclusive, perpetual, irrevocable, and royalty-free license to use, reproduce, disclose, adapt, and exploit the feedback You provide in any form and for any purpose. This license includes the authority for the Licensor to incorporate your feedback into the Software, modify existing features based on your suggestions, and develop new functionalities or improvements without any obligation to provide compensation or attribution to You. This grant serves as a testament to your contribution to the Software's evolution, ensuring that Your insights and experiences directly inform its continuous improvement.</p>


<h6>4. INTELLECTUAL PROPERTY AND USAGE RIGHTS</h6>

<p>4.1 The Beta Software, encompassing but not limited to its software code, algorithms, design, documentation, and all intellectual property rights inherent therein, is the exclusive property of the Licensor or its affiliates or subsidiaries. This Agreement confers upon You a limited license to use the Beta Software strictly in accordance with its terms; beyond this limited license, the Licensor reserves all rights. The recognition of the Licensor's ownership is fundamental, underscoring that except for the rights explicitly granted through this license, no other rights are implied or transferred to You. The preservation of these intellectual property rights is essential for maintaining the integrity and value of the Beta Software, ensuring that the Licensor or its designated parties retain full control over its distribution, development, and modification.</p>

<h6>5. RESTRICTION ON SOFTWARE ALTERATIONS</h6>

<p>5.1 In alignment with the safeguarding of the Licensor's intellectual property, you are expressly prohibited from copying, modifying, reverse engineering, decompiling, disassembling, or engaging in any activity aimed at uncovering the Beta Software's source code, except as allowed by law. This restriction is put in place to protect the proprietary nature of the Beta Software, ensuring that its underlying technology remains secure and undisclosed. Such activities could compromise the Beta Software's integrity, security, and the Licensor's intellectual property rights. Accordingly, this provision ensures that any attempt to analyze, replicate, or alter the Beta Software's source code without explicit legal authorization is strictly forbidden, thereby preserving the exclusive rights of the Licensor over their intellectual property.</p>

<h6>6. GRANT</h6>

<p>6.1 Under the terms of this Agreement, the Licensor grants to You a limited, temporary, non-exclusive, non-transferable, non-assignable, and revocable license to utilize the executable version of the Software, along with any associated documentation, strictly for Your personal or internal business purposes on a single computer. This license expressly prohibits the installation and use of the Software on more than one computer concurrently. You are permitted to create copies of the Software solely for backup purposes, under the condition that all such copies bear the Licensor's copyright and proprietary rights notices. The rights conferred by this license do not extend to any form of disclosure, sale, sublicense, leasing, renting, distribution, hosting, or other transfer of the Software, its related documentation, or any of the Licensor's proprietary information. Furthermore, you are prohibited from modifying, altering, adapting, publicly performing, displaying, decompiling, disassembling, reverse translating, or engaging in any form of reverse engineering of any part of the Software.</p>

<h6>7. CONFIDENTIALITY</h6>

<p>7.1 The Beta Software, including all related materials concerning its development, design, and functionality, constitutes confidential and proprietary information belonging to the Licensor. As such, you are obligated to preserve the confidentiality of the Beta Software and refrain from disclosing any aspect of it to any third party without obtaining the Licensor's prior written consent. This duty to maintain confidentiality is designed to protect the Licensor's intellectual property and business interests, and it will continue to bind you for a period of two years following the termination of this Agreement, thereby ensuring the continued protection of the Licensor's proprietary information beyond the lifespan of the Agreement itself. You hereby acknowledge that unauthorized disclosure or use of Confidential Information could cause irreparable harm and significant injury to Algoedge that may be difficult to ascertain.  Accordingly, You agree that Algoedge will have the right to seek immediate injunctive relief to enforce obligations under this Agreement in addition to any other rights and remedies it may have. </p>

<h6>8. AMENDMENTS AND NEW VERSION OF SOFTWARE</h6>

<p>8.1 The Licensor retains the exclusive authority to enhance, modify, or eliminate features and functionalities of the Software at any given time, including the provision of patches, updates, and upgrades, according to its sole judgment. There is no duty on the part of the Licensor to inform You of any forthcoming versions of the Software. Should you opt to download, install, or utilize a new beta version of the Software, it may necessitate your acceptance of a revised edition of this License Agreement. Furthermore, the Licensor holds the right to unilaterally alter, amend, augment, or rescind any provisions of this License Agreement at any moment. Any such revisions will be duly published on the Licensor's official website, located at http://www.algoedge.io, and it shall be your responsibility to periodically review said website to stay informed of any changes. The Licensor is under no obligation to provide direct notification of these changes beyond the website update. Your continued use of the Software following any modifications to this Agreement constitutes your acceptance of those changes and reaffirms your commitment to the terms of the updated License Agreement.</p>

<h6>9. DISCLAIMER OF WARRANTIES</h6>

<p>9.1 BY ACCEPTING THE TERMS OF THIS AGREEMENT, YOU EXPRESSLY ACKNOWLEDGE AND UNDERSTAND THAT THE BETA SOFTWARE PROVIDED BY ALGOEDGE, INCLUDING ANY RELATED DOCUMENTATION, IS A PRELIMINARY VERSION OF PRE-RELEASE SOFTWARE THAT MAY BE AFFLICTED WITH SIGNIFICANT ERRORS, DEFICIENCIES, AND ISSUES. YOU EXPRESSLY AGREE AND ACKNOWLEDGE THAT ALGOEDGE HOLDS NO OBLIGATION TO RECTIFY ANY DEFECTS, ERRORS, OR OPERATIONAL PROBLEMS WITHIN THIS PRE-RELEASE VERSION OF THE SOFTWARE OR ITS ACCOMPANYING DOCUMENTATION, NOR TO ENSURE ITS PROPER FUNCTIONING. ALGOEDGE EXPRESSLY DISCLAIMS ALL WARRANTIES RELATED TO THE BETA SOFTWARE AND ITS DOCUMENTATION, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE BETA SOFTWARE, ALONG WITH ALL RELATED DOCUMENTATION, IS MADE AVAILABLE TO YOU ON AN “AS IS” BASIS, WITH THE EXPLICIT UNDERSTANDING AND AGREEMENT ON YOUR PART THAT YOU ASSUME FULL RESPONSIBILITY FOR ANY AND ALL RISKS ASSOCIATED WITH ITS USE, INCLUDING ITS QUALITY AND PERFORMANCE.</p>


<h6>10. LIMITATION OF LIABILITY</h6>

<p>10.1 GIVEN THE INHERENT RISKS AND EXPERIMENTAL NATURE OF SOFTWARE PROVIDED IN A BETA VERSION, YOU EXPRESSLY AGREE AND ACKNOWLEDGE THAT ALGOEDGE SHALL BEAR NO LIABILITY TO YOU FOR ANY FORM OF DAMAGE OR LOSS ARISING FROM OR IN CONNECTION WITH THE USE OF THE BETA SOFTWARE OR ANY RELATED DOCUMENTATION. THIS EXCLUSION OF LIABILITY ENCOMPASSES, BUT IS NOT LIMITED TO, DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA LOSS, UNAUTHORIZED DISCLOSURE OF CONFIDENTIAL OR PERSONAL INFORMATION, INTERRUPTION OF SERVICE, PERSONAL INJURY, MISREPRESENTATION, BREACH OF WARRANTY, OR ANY CLAIMS ARISING OUT OF TORT (INCLUDING NEGLIGENCE) OR CONTRACT LAW. YOU FULLY UNDERSTAND AND ACCEPT THAT YOUR USE OF THE BETA SOFTWARE ENTAILS THESE RISKS, AND YOU HEREBY RELEASE ALGOEDGE FROM ANY RESPONSIBILITY FOR SUCH ISSUES, TO THE FULLEST EXTENT PERMITTED BY LAW.</p>


<h6>11. TERMINATION</h6>

<p>11.1 Licensor reserves the right, without prejudice to its other rights, to terminate this License Agreement should you breach any of its terms and conditions. Should any modifications or updates to this License Agreement be deemed unacceptable to you, or result in your non-compliance with the Agreement, you are required to terminate this Agreement promptly. Furthermore, should you download, install, or use a newer version of the Software, this Agreement becomes void and is superseded by the License Agreement accompanying the newer version of the Software. Upon termination of this Agreement, for any reason, you are obligated to cease all use of the Software and destroy all copies, in whole or in part, of the Software in your possession or control.</p>

<h6>12. GENERAL PROVISIONS</h6>

<p>12.1 Governing Law: These Terms shall be governed by and construed in accordance with the applicable law, without giving effect to any principles of conflicts of law. These Beta User Conditions will be governed by the laws of the province of British Columbia.</p>

<p>12.2 Dispute Resolution: Any disputes arising out of or related to these Terms or the Beta Software shall be resolved through binding arbitration in accordance with the rules of the province of British Columbia.</p>

<p>12.3 Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>

<p>12.4 Waiver: The failure of the Company to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.</p>

<p>12.5 Entire Agreement: These Terms constitute the entire agreement between you and the Licensor regarding the Beta Software and supersede all prior agreements and understandings, whether written or oral.</p>

<h6>13.  No Waiver or Assignment</h6> 

<p> No delay or failure to take action under this Agreement will constitute a waiver unless expressly waived in writing, signed by Algoedge, and no single waiver will constitute a continuing or subsequent waiver.  This Agreement may not be assigned by You in whole or in part.  Any contrary assignment shall be null and void. </p>

<p>BY USING THE BETA SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THESE TERMS AND AGREE TO BE BOUND BY THEM.</p>
<div className="downbutton"><button className="btn btn-secondary" style={{marginLeft:'15%',color:'red',backgroundColor:'white'}} onClick={()=>{handleClose()}}>
  Ignore
  </button>
  <button className="btn btn-success"  style={{marginRight:'15%'}} onClick={()=>{handleShow()}} >
  Accept
  </button></div>
</div>  

</Modal>
      </div>
    </>
  );
};

export default Login;
