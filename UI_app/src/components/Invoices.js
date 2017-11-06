import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Panel } from 'react-bootstrap';
import { fetchInvoices } from '../actions/invoices';
import { fetchCustomers } from '../actions/customers';

import InvoiceForm from './InvoiceForm';

class Invoices extends Component {
  state = {
    showModal: false
  }

  componentDidMount() {
    this.props.fetchInvoices();
    this.props.fetchCustomers();
  }

  onOpen = () => {
    this.setState({ showModal: true });
  }

  onHide = () => {
    this.setState({ showModal: false });
  }

  onSave = () => {
    this.props.fetchInvoices();
    this.onHide();
  }

  invoiceForm = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoiceForm saveForm={this.onSave}/>
        </Modal.Body>
      </Modal>
    );
  }

  renderAddInvoiceButton() {
    return (
      <Button style={{ marginBottom: 20, alignSelf: 'center' }} onClick={this.onOpen}>Create a new invoice</Button>
    );
  }

  renderInvoices = () => {
    const { invoices, customers, error } = this.props;

    if (error) {
      return (
        <div>{error.name}: {error.message}</div>
      );
    }

    if (invoices && invoices.length === 0) {
      return (
        <div>No invoices found.</div>
      );
    }
    return invoices && invoices.map((invoice) => {
      const customer = customers.find(customer => customer.id === invoice.customer_id);
      const customerName = customer ? customer.name : 'not found';

      return (
        <Panel
          key={invoice.id}
          header={`Invoice ${invoice.id}`}
          footer={`Total price: ${invoice.total} $`}
        >
          <p>Customer: {customerName}</p>
          <p>Discount: {invoice.discount}%</p>
        </Panel>
      );
    });
  }

  render() {
    const { loading } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0 20px' }}>
        {
          loading
            ? <div>Loading...</div>
            : <div style={{ width: 500, display: 'flex', flexDirection: 'column' }}>
              {this.renderAddInvoiceButton()}
              {this.renderInvoices()}
              {this.invoiceForm()}
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoices: state.invoices.items,
    error: state.invoices.error,
    loading: state.invoices.isFetching || state.customers.isFetching,
    customers: state.customers.items
  };
}

export default connect(mapStateToProps, {
  fetchInvoices,
  fetchCustomers
})(Invoices);
