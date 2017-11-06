import { API } from '../constants';
import { fetchItems } from './utils';

export const FETCH_INVOICES_REQUEST = 'FETCH_INVOICES_REQUEST';
export const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS';
export const FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE';

export const CREATE_INVOICE_REQUEST = 'CREATE_INVOICE_REQUEST';
export const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS';

export const fetchInvoicesRequest = () => ({
  type: FETCH_INVOICES_REQUEST
});

export const fetchInvoicesSuccess = (data) => {
  return {
    type: FETCH_INVOICES_SUCCESS,
    payload: data
  };
};

export const fetchInvoicesFailure = (error) => {
  return {
    type: FETCH_INVOICES_FAILURE,
    payload: error
  };
};

export const fetchInvoices = () => {
  return fetchItems(`${API}/invoices`, fetchInvoicesRequest, fetchInvoicesSuccess, fetchInvoicesFailure);
};

export const createInvoiceRequest = () => ({
  type: CREATE_INVOICE_REQUEST
});

export const createInvoiceSuccess = (data) => {
  return {
    type: CREATE_INVOICE_SUCCESS,
    payload: data
  };
};

export const createInvoice = (customerId, discount, total) => (dispatch) => {
  dispatch(createInvoiceRequest());
  const options = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer_id: +customerId, discount, total })
  };

  return fetch(`${API}/invoices`, options)
    .then(
      (response) => {
        if (response.status === 200) return response.json();
      })
    .then(data => {
      dispatch(createInvoiceSuccess(data));
    });
};
