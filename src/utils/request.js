const request = ({url, onSuccess, onFinally}) => {
  fetch(url)
      .then((r) => r.json())
      .then((data) => onSuccess(data))
      .catch(error => alert(error.message))
      .finally(() => onFinally())
}

 export { request }
