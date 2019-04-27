import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">LaraShop</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;