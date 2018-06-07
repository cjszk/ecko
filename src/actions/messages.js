import { API_BASE_URL } from '../../config';

export const SAVE_MESSAGES = 'SAVE_MESSAGES';
export const saveMessages = (messages) => ({
    type: SAVE_MESSAGES,
    messages
})

export const getMessages = () => dispatch => {
    return fetch(`${API_BASE_URL}/messages`, {
        method: 'GET',
      })
      .then((res) => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          return res.json();
      })
      .then((res) => {
        dispatch(saveMessages(res))          
      })
      .catch(err => console.error(err))
}

export const postMessage = (object) => dispatch => {
    return fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: { 'content-type': 'application/json' }
      })
        .then(res => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          return res.json();
        })
        .then(res => {
            dispatch(getMessages())
        })
        .catch(err => console.error(err))
}

export const postReply = (object) => dispatch => {
  return fetch(`${API_BASE_URL}/replies`, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: { 'content-type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(res => {
        dispatch(getMessages())
    })
    .catch(err => console.error(err))
}