import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component{
    render () {
        return (
            <div className="list-group">
                <Link to="/" className="list-group-item list-group-item-action active">
                    Shops / Businesses
                </Link>
                <Link to="/feeds" className="list-group-item list-group-item-action">Feeds</Link>
                <Link to="/" className="list-group-item list-group-item-action">Settings</Link>
                <a href="https://kudobuzz.com/" target="_blank" className="list-group-item list-group-item-action">Kudobuzz</a>
            </div>
        )
    }
}

export default Sidebar