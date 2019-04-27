import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchShops } from '../actions';
import api from '../apis';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.fetchShopsMethod = this.fetchShopsMethod.bind(this);
        this.state = {
            shops: [],
            errors: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchShopsMethod();
    }

    fetchShopsMethod() {
        api.get('shop')
           .then(res => {
               this.setState({
                   shops: res.data.shops,
                   loading: false
               })
           })
           .catch(err => {
               console.log(err)
               this.setState({
                   errors: this.state.errors.concat(err),
                   loading: false
               })
           })
    }

    renderShops() {
        if (this.state.shops.length > 0) {
            return this.state.shops.map(shop => {
                return (
                    <tr key={shop.id}>
                        <td>{shop.store_name}</td>
                        <td>{shop.store_url}</td>
                        <td>{shop.products.length}</td>
                        <td>{shop.currency}</td>
                        <td>{shop.created_at}</td>
                        <td>
                            <Link className="btn btn-primary btn-sm" to={`/shops/${shop.id}`}>More Details</Link> &nbsp;
                        </td>
                    </tr>
                )
            });
        } else {
            return (
                <tr>
                    <td colSpan='6'>No shops available</td>
                </tr>
            )
        } 
    }

    render () {
        const { shops } = this.state;
        return (
            <div className='card'>
                <div className='card-header'>All Shops</div>
                <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/add-shop'>
                        Create new shop
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Shop Name</th>
                                    <th>Shop Url</th>
                                    <th>Products</th>
                                    <th>Currency</th>
                                    <th>Added On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderShops()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shops: state.shops.shops
    }
}

export default connect(mapStateToProps, {fetchShops}) (Dashboard);