import React from 'react'
import { useMediaQuery } from 'react-responsive';

const Sidebar = () => {
	const isMobile = useMediaQuery({ maxWidth: 767 });


  return (
	<ul
	className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
	id="accordionSidebar"
	style={{width:isMobile?'15%':"30%"}}
  >
	{/* Sidebar - Brand */}
	<a
	  className="sidebar-brand d-flex align-items-center justify-content-center"
	  href="#"
	>
	  <div className="sidebar-brand-icon rotate-n-15">
		{/* <i className="fas fa-laugh-wink" /> */}
	  </div>
	  <div className="mx-3">
	<img src='/logo2.png' width={40} />

	  </div>
	</a>
	{/* Divider */}
	<div className=''style={{borderTop:'1px solid white'}}></div>
	<hr className="sidebar-divider my-2"/>
	<li className="nav-item active text-center" style={{display:"flex",justifyContent:"center",backgroundColor:"#fff",borderTopLeftRadius:"40px",borderBottomLeftRadius:"40px",marginLeft:'10%'}}>
	  <a className="nav-link text-center" href="#" >
	  <img src='/analysis.png' width={35} />
	  <span style={{fontSize:"7px",color:"green"}}>Strategies</span>

	  </a>
	</li>
	{/* Divider */}
	<hr className="sidebar-divider" />
  

	<hr className="sidebar-divider" />
	{/* Heading */}
	{/* <div className="sidebar-heading">Addons</div> */}
	{/* Nav Item - Pages Collapse Menu */}

	{/* Nav Item - Charts */}

	{/* Nav Item - Tables */}

	{/* Divider */}
	<hr className="sidebar-divider d-none d-md-block" />
	{/* Sidebar Toggler (Sidebar) */}
	{/* <div className="text-center d-none d-md-inline">
<button className="rounded-circle border-0" id="sidebarToggle" />
</div> */}
	{/* Sidebar Message */}
	{/* <div className="sidebar-card d-none d-lg-flex">
<img
  className="sidebar-card-illustration mb-2"
  src="img/undraw_rocket.svg"
  alt="..."
/>
<p className="text-center mb-2">
  <strong>SB Admin Pro</strong> is packed with premium features,
  components, and more!
</p>
<a
  className="btn btn-success btn-sm"
  href="https://startbootstrap.com/theme/sb-admin-pro"
>
  Upgrade to Pro!
</a>
</div> */}
  </ul>
  )
}

export default Sidebar