import { API } from '../constants';
import { fetchItems } from './utils';

export const FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST';
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS';
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE';

export const fetchCustomersRequest = () => ({
  type: FETCH_CUSTOMERS_REQUEST
});

export const fetchCustomersSuccess = (data) => {
  return {
    type: FETCH_CUSTOMERS_SUCCESS,
    payload: data
  };
};

export const fetchCustomersFailure = (error) => {
  return {
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error
  };
};

export const fetchCustomers = () => {
  return fetchItems(`${API}/customers`, fetchCustomersRequest, fetchCustomersSuccess, fetchCustomersFailure);
};
