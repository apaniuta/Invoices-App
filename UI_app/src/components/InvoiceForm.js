import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { createInvoice } from '../actions/invoices';

class InvoiceForm extends Component {
  state = {
    customerId: null,
    discount: 50,
    total: 5
  }

  handleCustomersSelect = (event) => {
    this.setState({ customerId: event.target.value });
  }

  handleProductsCount = (event) => {
    console.log('event', event.target.value);
  }

  handleDiscount = (event) => {
    console.log('event', event.target.value);
  }

  submit = () => {
    const { customerId, discount, total} = this.state;
    if (customerId) {
      this.props.createInvoice(customerId, discount, total);
      this.props.saveForm();
    } else {
      window.alert('Something went wrong!');
    }
  }

  renderCustomerSelect = () => {
    const { customers } = this.props;

    return (
      <FormGroup controlId="formCustomer">
        <ControlLabel>Select a customer</ControlLabel>
        <FormControl componentClass="select" defaultValue='Select...' onChange={this.handleCustomersSelect}>
          <option key={-1}>Select...</option>
          {
            customers.map((customer) => {
              return (
                <option value={customer.id} key={customer.id}>{customer.name}</option>
              );
            })
          }
        </FormControl>
      </FormGroup>
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        {
          loading
            ? <div>Loading...</div>
            : <Form>
              {this.renderCustomerSelect()}
              <FormGroup controlId="formTotal">
                <ControlLabel>Phone Holder $9.99</ControlLabel>
                <FormControl type="number" value={10} onChange={this.handleProductsCount} />
              </FormGroup>
              <FormGroup controlId="formDiscount">
                <ControlLabel>Enter a Discount</ControlLabel>
                <FormControl type="number" value={50} onChange={this.handleDiscount} />
              </FormGroup>
              <Button onClick={this.submit}>Save</Button>
            </Form>
        }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    customers: state.customers.items,
    error: state.customers.error,
    loading: state.customers.isFetching
  };
}

export default connect(mapStateToProps, {
  createInvoice
})(InvoiceForm);
