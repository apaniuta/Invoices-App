export const fetchItems = (url, request, success, failure) => (dispatch) => {
  dispatch(request());

  return fetch(url)
    .then(
      (response) => {
        if (response.status === 200) return response.json();
      })
    .then(data => {
      dispatch(success(data));
    })
    .catch(error => {
      dispatch(failure(error));
    });
}
