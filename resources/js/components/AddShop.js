import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../apis'

class AddShop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors: [],
            storeurl: '',
            storename: '',
            currency: '',
            loading: false,
            apimessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputError = this.handleInputError.bind(this);
        this.displayError = this.displayError.bind(this);
        this.handleDismissClick = this.handleDismissClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const formData = {
            storename: this.state.storename,
            storeurl: this.state.storeurl,
            currency: this.state.currency,
        }
        api.post('shop', formData)
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
                        storeurl: '',
                        storename: '',
                        currency: '',
                        apimessage: res.data.success
                    });

                    setTimeout(() => {
                        this.setState({
                            apimessage: ''
                        });
                        this.props.history.push("/");
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
        const { storename, errors, loading, storeurl, currency, apimessage } = this.state;
        return (
            <div className='card'>
                <div className='card-header'>Add a new shop</div>
                <div className='card-body'>
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
                                        className={this.handleInputError(errors, 'storename')}
                                        name="storename"
                                        value={storename}
                                        placeholder="Store name"
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.displayError(errors, 'storename')}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className={this.handleInputError(errors, 'storeurl')}
                                        name="storeurl"
                                        value={storeurl}
                                        placeholder="Store url"
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.displayError(errors, 'storeurl')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        className={this.handleInputError(errors, 'currency')}
                                        name="currency"
                                        value={currency}
                                        placeholder="Currency"
                                        onChange={this.handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {this.displayError(errors, 'currency')}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <button disabled={loading} type="submit" className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(AddShop);