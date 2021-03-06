import axios from 'axios';


export const FETCH_NEWSFEED_START = "FETCH_NEWSFEED_START";
export const FETCH_NEWSFEED_SUCCESS = "FETCH_NEWSFEED_SUCCESS";
export const FETCH_NEWSFEED_FAIL = "FETCH_NEWSFEED_FAIL"; 

export const FETCH_USERS_START = "FETCH_USERS_START";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL"; 

export const ADD_USER_START = "ADD_USER_START";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAIL = "ADD_USER_FAIL"; 

export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL"; 


export const userLogin = user => dispatch =>{
  dispatch({type: USER_LOGIN_START});
  axios
  .post(`https://guidr2.herokuapp.com/user`, user)
  .then(res => {
    if (res.status === 200 && res.data) {
      dispatch({type: USER_LOGIN_SUCCESS, payload: res.data.username});
      // localStorage.setItem('jwt', res.data.token)
    } else {
      throw new Error();
    }
  })
  .then(getNewsFeed())
  .then(getUsers())
  .catch(err => console.log(err))
  
}
export const getNewsFeed = () => dispatch =>{
  dispatch({type: FETCH_NEWSFEED_START});
  axios
  .get(`https://guidr2.herokuapp.com/adventures`)
  .then(res => dispatch({type: FETCH_NEWSFEED_SUCCESS, payload: res.data}))
  .catch(err => dispatch({type: FETCH_NEWSFEED_FAIL, payload: err}))
}
// export const getNewsFeed = () => dispatch =>{
//     const token = localStorage.getItem('jwt')
//     console.log(token)
//     const headers = { headers: { Authorization: token } }
//     console.log(headers)
//     // dispatch({type: FETCH_NEWSFEED_START});
//     if(token){
//       console.log('we are fetching our ventures')
//       axios.get(`https://guidr2.herokuapp.com/adventures`, headers)
//       .then(res => console.log(res))
//       .catch(err => console.log(err))
//     }
//   }

  export const getUsers = () => dispatch =>{
    dispatch({type: FETCH_USERS_START});
    axios
    .get(`https://guidr2.herokuapp.com/user`)
    .then(res => dispatch({type: FETCH_USERS_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: FETCH_USERS_FAIL, payload: err}))
  }

  export const addUser = user => dispatch =>{
    console.log(user)
    dispatch({type: ADD_USER_START});
    axios
    .post(`https://guidr2.herokuapp.com/user`, user)
    // .then(res => console.log(res))
    .then(res => dispatch({ type: ADD_USER_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: ADD_USER_FAIL, payload: err}))
  }
  // addUser = (user) => {
  //   const token = localStorage.getItem('token')
  //   const headers = { headers: { 'Authorization': `Token ${token}` } }
  //   axios.post('http://127.0.0.1:8000/api/countries/', newCountry, headers)
  //     .then(resp => this.getData())
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }


  // export const getSingleUser = user => dispatch =>{
  //   dispatch({type: FETCH_SINGLE_USER_START});
  //   axios.
  // }