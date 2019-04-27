import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import Dashboard from './Dashboard';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Product from './Product';
import Shop from './Shop';
import Feeds from './Feeds';
import Feed from './Feed';
import AddShop from './AddShop';
import ShopDetail from './ShopDetail';

class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <main>
                        <Header />
                        <div className="container py-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <Sidebar />
                                </div>
                                <div className="col-md-9">
                                    <Route exact path="/" component={Dashboard} />
                                    <Route path="/shop" component={Shop} />
                                    <Route path="/product" component={Product} />
                                    <Route path="/feeds" component={Feeds} />
                                    <Route path="/feed" component={Feed} />
                                    <Route path="/add-shop" component={AddShop} />
                                    <Route path="/shops/:id" component={ShopDetail} />
                                </div>
                            </div>
                        </div>
                    </main>
                </HashRouter>
            </Provider>
        )
    }
}

export default App;