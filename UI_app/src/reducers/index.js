import { combineReducers } from 'redux';

import {
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  CREATE_INVOICE_REQUEST,
  CREATE_INVOICE_SUCCESS
} from '../actions/invoices';

import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE
} from '../actions/customers';

const invoices = ( state = { isFetching: false, error: null, items: [] }, action) => {
  switch (action.type) {
    case FETCH_INVOICES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: action.payload ? action.payload : []
      };
    case FETCH_INVOICES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        items: []
      };
    case CREATE_INVOICE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: [ ...state.items, action.payload ]
      };
    default:
      return state;
  }
};

const customers = ( state = { isFetching: false, error: null, items: [] }, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: action.payload ? action.payload : []
      };
    case FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        items: []
      };
    default:
      return state;
  }
};

export default combineReducers({ invoices, customers });
