import React from 'react';
import api from '../apis'

class ShopDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shop: {},
            errors: [],
            loading: false,
            name: '',
            title: '',
            brand: '',
            salesprice: '',
            description: '',
            quantity: 0,
            apimessage: '',
            channel: '',
            feedapimessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputError = this.handleInputError.bind(this);
        this.displayError = this.displayError.bind(this);
        this.handleDismissClick = this.handleDismissClick.bind(this);
        this.handleCreateFeed = this.handleCreateFeed.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    componentDidMount() {
        const shopId = this.props.match.params.id;

        api.get(`shop/${shopId}`)
           .then(res => {
               //console.log(res);
               this.setState({
                  shop: res.data.shop
               });
           })
           .catch(err => {
               console.log(err);
           })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        const shopId = this.props.match.params.id;
        e.preventDefault();
        this.setState({
            loading: true
        })
        const formData = {
            name: this.state.name,
            title: this.state.title,
            brand: this.state.brand,
            salesprice: this.state.salesprice,
            quantity: this.state.quantity,
            description: this.state.description
        }
        api.post(`shop/${shopId}/product`, formData)
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false
                });
                if(res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                } else {
                    this.setState({
                        errors: [],
                        title: '',
                        name: '',
                        brand: '',
                        quantity: 0,
                        salesprice: '',
                        description: '',
                        apimessage: res.data.success,
                        shop: this.state.shop.products.concat(res.data.product)
                    });

                    setTimeout(() => {
                        this.setState({
                            apimessage: ''
                        });
                    }, 3000)
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(err)
                })
            })
    }

    handleCreateFeed(e) {
        const shopId = this.props.match.params.id;
        e.preventDefault();
        this.setState({
            loading: true
        })
        const formData = {
            channel: this.state.channel,
        }
        api.post(`shop/${shopId}/feed`, formData)
            .then(res => {
                //console.log(res);
                this.setState({
                    loading: false
                });
                if(res.data.errors) {
                    this.setState({
                        errors: res.data.errors
                    })
                } else {
                    this.setState({
                        errors: [],
                        channel: '',
                        feedapimessage: res.data.success,
                    });

                    setTimeout(() => {
                        this.setState({
                            apimessage: ''
                        });
                    }, 3000)
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(err)
                })
            })
    }

    renderProducts() {
        if (this.state.shop.products > 0) {
            const products = this.state.shop.products;
            console.log(products);
            return products.map(product => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.title}</td>
                        <td>{product.brand}</td>
                        <td>{product.quantity}</td>
                        <td>{product.sales_price}</td>
                        <td>{product.description}</td>
                        <td>{product.created_at}</td>
                    </tr>
                )
            });
        } else {
            return (
                <tr>
                    <td colSpan='7'>No products available</td>
                </tr>
            )
        } 
    }

    handleInputError(errors, inputName){
        return errors.some(error => error.includes(inputName)) ? 'form-control is-invalid' : 'form-control'
    }

    displayError(errors, inputName){
        return errors.some(error => error.includes(inputName)) ? '' : ''
    }

    handleDismissClick(){
        this.setState({
            apimessage: ''
        });
    }

    render() {
        const { name, errors, description, quantity, brand, salesprice, title, loading, shop, apimessage, channel, feedapimessage } = this.state;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header">Shop Detail <button className="btn btn-primary float-right" data-target="#createFeed" data-toggle="modal">Create Feed</button></div>
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">Name: {shop.store_name}</li>
                                    <li className="list-group-item">Url: {shop.store_url}</li>
                                    <li className="list-group-item">Currency: {shop.currency}</li>
                                    <li className="list-group-item">Date Added: {shop.created_at}</li>
                                    <li className="list-group-item">Products: {shop.products != null ? shop.products.length : 0}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">Add Product</div>
                            <div className="card-body">
                            {apimessage !== "" &&
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            {apimessage}
                                            <button type="button" onClick={this.handleDismissClick} className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className={this.handleInputError(errors, 'name')}
                                                name="name"
                                                value={name}
                                                placeholder="Name"
                                                onChange={this.handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {this.displayError(errors, 'name')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className={this.handleInputError(errors, 'title')}
                                                name="title"
                                                value={title}
                                                placeholder="Title"
                                                onChange={this.handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {this.displayError(errors, 'title')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className={this.handleInputError(errors, 'brand')}
                                                name="brand"
                                                value={brand}
                                                placeholder="Brand"
                                                onChange={this.handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {this.displayError(errors, 'brand')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className={this.handleInputError(errors, 'salesprice')}
                                                name="salesprice"
                                                value={salesprice}
                                                placeholder="Sales Price"
                                                onChange={this.handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {this.displayError(errors, 'salesprice')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text"
                                                className={this.handleInputError(errors, 'description')}
                                                name="description"
                                                value={description}
                                                placeholder="Description"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="number"
                                                className={this.handleInputError(errors, 'quantity')}
                                                name="quantity"
                                                value={quantity}
                                                placeholder="Quantity"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <button disabled={loading} type="submit" className="btn btn-primary btn-block">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="createFeed" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Feed</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {feedapimessage !== "" &&
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                {feedapimessage}
                                                <button type="button" onClick={this.handleDismissClick} className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <form onSubmit={this.handleCreateFeed}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input 
                                                    type="text"
                                                    className={this.handleInputError(errors, 'channel')}
                                                    placeholder="google"
                                                    name="channel"
                                                    value={channel}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <button disabled={loading} type="submit" className="btn btn-primary btn-block">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">Products</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Name</th>
                                                <th>Title</th>
                                                <th>Brand</th>
                                                <th>Quantity</th>
                                                <th>Sales Price</th>
                                                <th>Description</th>
                                                <th>Added On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderProducts()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>            
        )
    }
}

export default ShopDetail;