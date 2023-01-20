import React,{Component} from "react";
import {Link} from "react-router-dom"
class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-danger bg-danger">
                <Link className="navbar-brand fw-bold" to="/">
                    Home
                </Link>
                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto position-absolute top-50 end-0 translate-middle-y ">
                        <li className="nav-item ">
                            <Link className="nav-link fw-bold" to="/newCar">
                               New car
                            </Link>
                        </li>
                    </ul>
                </div> 
            </nav>
        );
    }
};
export default Navbar;