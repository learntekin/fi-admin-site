import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CONTACT } from '../actions/contact';
import { AC_ADD_CONTACT } from '../actions/contact';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { TabTitle } from '../util/DynamicTab';

class addFaqs extends React.Component {
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
      if (answer.length < 1) {
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
      if (answer.length < 1) {
        this.setState({ phonenumberError: false, phonenumberCountError: true })
      }
      else {
        this.setState({ phonenumberError: false, phonenumberCountError: false })
      }
    }
    else {
      this.setState({ phonenumberError: true, phonenumberCountError: false })
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
        this.setState({ name: '', email: '', phonenumber: '', status: '' });
      // }
      const formData = {
        name: name,
        email: email,
        phonenumber: phonenumber,
        status: tempVal
      }
      this.props.AC_ADD_CONTACT(formData);
      console.log('========Add Contact========', formData)
    }
  }
  handleInputChange(event) {
    const questionid = event.target.id;
    const questionvalue = event.target.value;
    const answerid = event.target.id;
    const answervalue = event.target.value;
    const statusid = event.target.id;
    const statusvalue = event.target.value;

    if (questionid == "question") {
      this.setState({ question: questionvalue })
      if (questionvalue) {
        if (questionvalue.length < 5) {
          this.setState({ questionError: false, questionCountError: true })
        }
        else {
          this.setState({ questionError: false, questionCountError: false })
        }
      }
      else {
        this.setState({ questionError: true, questionCountError: false })
      }
    }

    if (answerid == "answer") {
      this.setState({ answer: answervalue })
      if (answervalue) {
        if (answervalue.length < 5) {
          this.setState({ answerError: false, answerCountError: true })
        }
        else {
          this.setState({ answerError: false, answerCountError: false })
        }
      }
      else {
        this.setState({ answerError: true, answerCountError: false })
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
      return <Redirect to='/listFaq' />
    }
    TabTitle("Add Faq");
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Contact</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample" autoComplete='off'>
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Name</h5>
                  <input type="text" placeholder="Question" id="question" value={this.state.title} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.questionError ? <label class="mt-2" style={{ color: 'red' }}>Question is required</label> : ""}
                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Email</h4>
                  <input type="text" placeholder="Answer" id="answer" value={this.state.answer} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.answerError ? <label class="mt-2" style={{ color: 'red' }}>Answer is required</label> : ""}
                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Phone Number</h4>
                  <input type="text" placeholder="Answer" id="answer" value={this.state.answer} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.answerError ? <label class="mt-2" style={{ color: 'red' }}>Answer is required</label> : ""}
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
    faqsReducer: state.FAQ_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_CONTACT, AC_ADD_CONTACT }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(addFaqs);
