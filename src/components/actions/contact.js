import axios from "axios";
// To make an action to perform the CRUD operation
const LIST_CONTACT = 'LIST_CONTACT';
const ADD_CONTACT = 'ADD_CONTACT';
const DELETE_CONTACT='DELETE_CONTACT'
const VIEW_CONTACT='VIEW_CONTACT'
const UPDATE_CONTACT='UPDATE_CONTACT'

export function AC_ADD_CONTACT(userData) {
    return function (dispatch) {
        // Api URL = All data comes under the dynamic change of NGROK
        // To avoid using of third party website to API Call
        // Use MongoDb to fetch all the data
        return axios.post("https://4c96-117-248-47-248.in.ngrok.io/api/v1/contact/addUpdateContact", userData)
            .then(({ data }) => {
                dispatch({ type: ADD_CONTACT, payload: data })
            });
    };
}
export function AC_LIST_CONTACT() {
    return function (dispatch) {
        return axios.get("http://localhost:4001/api/v1/contact/listcontact")
            .then(({ data }) => {
                console.log('=======List Contact========', data)
                dispatch({ type: LIST_CONTACT, payload: data })
            });

    }
}
export function AC_DELETE_CONTACT(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:4001/api/v1/contact/deleteContact",formdata)
        .then(({data}) => {
           
            dispatch({type:DELETE_CONTACT,payload:data})
        });
    };
}
export function AC_VIEW_CONTACT(formdata){
    console.log('===-=-=action -=-=-',formdata)
    return function(dispatch){
        return axios.post("http://localhost:4001/api/v1/contact/viewContact",formdata)
        .then(({data}) => {
           
            dispatch({type:VIEW_CONTACT,payload:data})
        });
    };
}
export function AC_HANDLE_INPUT_CHANGE(name,value){
    return function(dispatch){
            dispatch({type:UPDATE_CONTACT, name:name, value:value})
    };
}