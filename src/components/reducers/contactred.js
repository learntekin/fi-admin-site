const initialState = {
  contactList: [],
  contactAdd: [],
  contactDelete:[],
  contactInfo : {
          name : '',
          email   : '',
          phonenumber   : '',
          message   : '',
          status   : '',
          id       : ''
      }
}
function CONTACT_Reducer(state = initialState, action) {
  console.log("-=-=-=Reducer=-=-=", action)
  switch (action.type) {
    case 'LIST_CONTACT':
      return {
        ...state,
        contactList: action.payload.data
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contactAdd: action.payload
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contactDelete: action.payload
      };
      break;
    case 'VIEW_CONTACT':
      return {
        ...state,
        contactInfo: action.payload
      };
    case 'EDIT_FAQ':
      return {
        ...state,
        editContact: action.payload
      }
      break;
    case 'UPDATE_CONTACT':
      return Object.assign({},state,{
        contactInfo : {
          ...state.contactInfo,
          [action.name] : action.value
        }
      })
    default: return state;
  }
}
export default CONTACT_Reducer;