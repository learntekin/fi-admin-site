import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CONTACT } from '../actions/contact';
import { AC_ADD_CONTACT } from '../actions/contact';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { TabTitle } from '../util/DynamicTab';

class addContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      nameCountError: false,
      email: '',
      emailError: false,
      emailCountError: false,
      phonenumber: '',
      phonenumberError: false,
      phonenumberCountError: false,

      message: '',
      messageError: false,
      messageCountError: false,

      status: '',
      statusError: false,
      editStatus: false,
    }
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.back=this.back.bind(this);
  }
  back() {
    this.setState({ editStatus: true })
  }

  validation() {
    const name = this.state.name;
    const email = this.state.email;
    const phonenumber = this.state.phonenumber;
    const message = this.state.message;
    const status = this.state.status;
// name
    if (name) {
      if (name.length < 1) {
        this.setState({ nameError: false, nameCountError: true })
      }
      else {
        this.setState({ nameError: false, nameCountError: false })
      }
    }
    else {
      this.setState({ nameError: true, nameCountError: false })
    }
// email
    if (email) {
      if (email.length < 1) {
        this.setState({ emailError: false, emailCountError: true })
      }
      else {
        this.setState({ emailError: false, emailCountError: false })
      }
    }
    else {
      this.setState({ emailError: true, emailCountError: false })
    }
// phonenumber
    if (phonenumber) {
      if (phonenumber.length < 1) {
        this.setState({ phonenumberError: false, phonenumberCountError: true })
      }
      else {
        this.setState({ phonenumberError: false, phonenumberCountError: false })
      }
    }
    else {
      this.setState({ phonenumberError: true, phonenumberCountError: false })
    }
    // message
    if (message) {
      if (message.length < 1) {
        this.setState({ messageError: false, messageCountError: true })
      }
      else {
        this.setState({ messageError: false, messageCountError: false })
      }
    }
    else {
      this.setState({ messageError: true, messageCountError: false })
    }

    if (status) {
      this.setState({ statusError: false })
    }
    else {
      this.setState({ statusError: true })
    }
    if (name && email && phonenumber ) {
      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
      // if (question && answer && status) {
        // document.getElementById('addFaqs').reset();
        swal("Contact Added Successfully!", {
          buttons: false,
          timer: 2000,
        });
        this.setState({ name: '', email: '', phonenumber: '',message:'', status: '' });
      // }
      const formData = {
        name: name,
        email: email,
        phonenumber: phonenumber,
        message: message,
        status: tempVal
      }
      this.props.AC_ADD_CONTACT(formData);
      console.log('========Add Contact========', formData)
    }
  }

  handleInputChange(event) {
    const nameid = event.target.id;
    const namevalue = event.target.value;

    const emailid = event.target.id;
    const emailvalue = event.target.value;

    const phonenumberid = event.target.id;
    const phonenumbervalue = event.target.value;

    const messageid = event.target.id;
    const messagevalue = event.target.value;

    const statusid = event.target.id;
    const statusvalue = event.target.value;
// name
    if (nameid == "name") {
      this.setState({ name: namevalue })
      if (namevalue) {
        if (namevalue.length < 5) {
          this.setState({ nameError: false, nameCountError: true })
        }
        else {
          this.setState({ nameError: false, nameCountError: false })
        }
      }
      else {
        this.setState({ nameError: true, nameCountError: false })
      }
    }
// email
    if (emailid == "email") {
      this.setState({ email: emailvalue })
      if (emailvalue) {
        if (emailvalue.length < 5) {
          this.setState({ emailError: false, emailCountError: true })
        }
        else {
          this.setState({ emailError: false, emailCountError: false })
        }
      }
      else {
        this.setState({ emailError: true, emailCountError: false })
      }
    }
// phonenumber
    if (phonenumberid == "phonenumber") {
      this.setState({ phonenumber: phonenumbervalue })
      if (phonenumbervalue) {
        if (phonenumbervalue.length < 5) {
          this.setState({ phonenumberError: false, phonenumberCountError: true })
        }
        else {
          this.setState({ phonenumberError: false, phonenumberCountError: false })
        }
      }
      else {
        this.setState({ phonenumberError: true, phonenumberCountError: false })
      }
    }
// message
    if (messageid == "message") {
      this.setState({ message: messagevalue })
      if (messagevalue) {
        if (messagevalue.length < 5) {
          this.setState({ messageError: false, messageCountError: true })
        }
        else {
          this.setState({ messageError: false, messageCountError: false })
        }
      }
      else {
        this.setState({ messageError: true, messageCountError: false })
      }
    }

    if (statusid == "status") {
      this.setState({ status: statusvalue })
      if (statusvalue) {
        this.setState({ statusError: false })
      }
      else {
        this.setState({ statusError: true })
      }
    }
  }

  render() {
    if (this.state.editStatus) {
      return <Redirect to='/listContact' />
    }
    TabTitle("Add Faq");
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Contact</h3>
        
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample" autoComplete='on'>

                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Name</h5>
                  <input type="text" placeholder="Name" id="name" value={this.state.name} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.nameError ? <label class="mt-2" style={{ color: 'red' }}>Name is required</label> : ""}
                </div>

                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>E - Mail</h5>
                  <input type="text" placeholder="E-Mail" id="email" value={this.state.email} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.emailError ? <label class="mt-2" style={{ color: 'red' }}>Email is required</label> : ""}
                </div>

                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Phone Number</h4>
                  <input type="text" placeholder="Phone Number" id="phonenumber" value={this.state.phonenumber} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.phonenumberError ? <label class="mt-2" style={{ color: 'red' }}>Phone number is required</label> : ""}
                </div>

                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Message</h4>
                  <input type="text" placeholder="Message" id="message" value={this.state.message} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.messageError ? <label class="mt-2" style={{ color: 'red' }}>Message is required</label> : ""}
                </div>
                
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>STATUS</h4>
                  <select class="form-control" id="status" onChange={this.handleInputChange} >
                    <option selected>Select status</option>
                    <option value="Active" >Active</option>
                    <option value="Inactive" >Inactive</option>
                  </select>
                  {this.state.statusError ? <label class="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                </div>
                <button type="button" class="btn btn-submit btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Submit</button>
                <button type="button" class="btn btn-cancel btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.back}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('map state', state);
  return {
    contactReducer: state.CONTACT_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_CONTACT, AC_ADD_CONTACT }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(addContact);
