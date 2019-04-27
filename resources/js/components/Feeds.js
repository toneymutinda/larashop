import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../apis';

class Feeds extends React.Component{
    constructor(props){
        super(props);
        this.fetchFeedsMethod = this.fetchFeedsMethod.bind(this);
        this.handleFeedDownload = this.handleFeedDownload.bind(this);
        this.state = {
            feeds: [],
            errors: [],
            loading: true
        }
    }

    componentDidMount() {
        this.fetchFeedsMethod();
    }

    fetchFeedsMethod() {
        api.get('feeds')
           .then(res => {
               this.setState({
                   feeds: res.data.feeds,
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

    renderFeeds() {
        if (this.state.feeds.length > 0) {
            return this.state.feeds.map(feed => {
                return (
                    <tr key={feed.id}>
                        <td>{feed.id}</td>
                        <td>{feed.channel}</td>
                        <td>{feed.shop.store_name}</td>
                        <td>{feed.shop.products.length}</td>
                        <td>{feed.created_at}</td>
                        <td>
                            <button className="btn btn-primary btn-sm" onClick={() => this.handleFeedDownload(feed.id)}>Download Feed</button>
                        </td>
                    </tr>
                )
            });
        } else {
            return (
                <tr>
                    <td colSpan='5'>No feeds available</td>
                </tr>
            )
        } 
    }

    handleFeedDownload(id) {
        api.get(`feeds/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render () {
        const { feeds } = this.state;
        return (
            <div className='card'>
                <div className='card-header'>All Feeds</div>
                <div className='card-body'>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Feed ID</th>
                                    <th>Channel</th>
                                    <th>Shop</th>
                                    <th>Products</th>
                                    <th>Added On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderFeeds()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feeds;