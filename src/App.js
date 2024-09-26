import React, { Suspense,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const Graph = React.lazy(() => import('./Component/pages/graph/graph'));
const Graph = React.lazy(() => import('./Component/pages/graph/GraphPage'));
const Newpage = React.lazy(() => import('./Component/pages/dashboard/newpage'));
// const Graph2 = React.lazy(() => import('./Component/pages/graph_demo/graph2page'));
const Auth = React.lazy(() => import('./Component/pages/login/Login'));
const TopStack = React.lazy(() => import('./Component/pages/top_stock/Index'));
const Register = React.lazy(() => import('./Component/pages/register/register'));
const Dashboard = React.lazy(() => import('./Component/pages/dashboarduI/dashboard'));
const Indiandashboard = React.lazy(() => import('./Component/pages/dashboarduI/Indiandashboard'));



const LoadingFallback = () => <div>Loading...</div>;


const App = () => {


    
    var myValue = localStorage.getItem('isLoggedIn');
useEffect(() => {
    var pathname = window.location.pathname;
    if (pathname !== "/" && !myValue && pathname !== "/register" && pathname !== "/fund_management_dashboard" && pathname !== '/indian_fund_management_dashboard') {
        window.location.href = '/';
    } else if (myValue &&  pathname !== "/optimized_sp" &&  pathname !== "/backtesting_results" && pathname !== "/fund_management_dashboard" && pathname !== "/indian_fund_management_dashboard") {
        window.location.href = '/optimized_sp';
    }
}, [myValue]);

    return (
        <BrowserRouter>
            <div>
                <Suspense fallback={<LoadingFallback />}>
                    <ToastContainer />
                    <Routes>
                        <Route path="/backtesting_results"
                            element={<Graph />} />
                        <Route path="/optimized_sp"
                            element={<Newpage />} />
                        <Route path="/register"
                            element={<Register />} />
                        <Route path="/"
                            element={<Auth />} />
                        <Route path="/top_stock"
                            element={<TopStack />} />
                             <Route path="/fund_management_dashboard"
                            element={<Dashboard />} />
                         <Route path="/indian_fund_management_dashboard" element={<Indiandashboard />} />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    );
};

export default App;
