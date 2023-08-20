import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
AC_LIST_CONTACT,
  AC_ADD_CONTACT,
  AC_VIEW_CONTACT,
  AC_HANDLE_INPUT_CHANGE,
} from "../actions/contact";
import { Redirect } from "react-router-dom";
// import swal from 'sweetalert';
class editContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: false,
      nameCountError: false,

      email: "",
      emailError: false,
      emailCountError: false,

      phonenumber: "",
      phonenumberError: false,
      phonenumberCountError: false,

      message: "",
      messageError: false,
      messageCountError: false,

      status: "",
      statusError: false,
      editStatus: false,
    };
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.back = this.back.bind(this);
  }

  validation() {
    const name = this.props.contactReducer.contactInfo.name;
    const email = this.props.contactReducer.contactInfo.email;
    const phonenumber = this.props.contactReducer.contactInfo.phonenumber;
    const message = this.props.contactReducer.contactInfo.message;
    const status = this.props.contactReducer.contactInfo.status;
    const id = this.props.contactReducer.contactInfo.id;
    let formData = {
      name: name,
      email: email,
      phonenumber: phonenumber,
      message: message,
      status: status,
      id: id,
    };
    console.log("-=-formData=-=-", formData);
    this.props.AC_ADD_CONTACT(formData);
  }

  handleInputChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    this.props.AC_HANDLE_INPUT_CHANGE(name, value);
  }
  componentWillMount() {
    let contactId = this.props.match.params.id;
    // console.log("-=-=faqId-=",faqId);
    let formData = { id: contactId };
    this.props.AC_VIEW_CONTACT(formData);
  }
  back() {
    this.setState({ editStatus: true });
  }
  render() {
    if (this.state.editStatus) {
      return <Redirect to="/listContact" />;
    }
    const name = this.props.contactReducer.contactInfo.name;
    const email = this.props.contactReducer.contactInfo.email;
    const phonenumber = this.props.contactReducer.contactInfo.phonenumber;
    const message = this.props.contactReducer.contactInfo.message;
    const status = this.props.contactReducer.contactInfo.status;
    const id = this.props.contactReducer.contactInfo.id;
    return (
      <div className="container-fluid" style={{ width: "60%" }}>
        <h3 class="page-title">
          <span
            class="page-title-icon bg-gradient-primary text-white me-2"
            style={{ marginLeft: "10rem", marginTop: "3rem" }}
          >
            <i class="mdi mdi-comment-plus-outline"></i>
          </span>
          Edit Contact
        </h3>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card2">
            <div className="card">
              <div className="card-body">
                <form class="forms-sample" autoComplete="on">
                  <div class="form-group">
                    <h5 style={{ fontSize: "0.875rem" }}>Name</h5>
                    <input
                      type="text"
                      placeholder="Name"
                      id="question"
                      value={name}
                      onChange={this.handleInputChange}
                      class="form-control"
                    ></input>
                    {this.state.nameError ? (
                      <label class="mt-2" style={{ color: "red" }}>
                        Name is required
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="form-group">
                    <h5 style={{ fontSize: "0.875rem" }}>E - Mail</h5>
                    <input
                      type="text"
                      placeholder="E-Mail"
                      id="email"
                      value={email}
                      onChange={this.handleInputChange}
                      class="form-control"
                    ></input>
                    {this.state.emailError ? (
                      <label class="mt-2" style={{ color: "red" }}>
                        Email is required
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="form-group">
                    <h4 style={{ fontSize: "0.875rem" }}>Phone Number</h4>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      id="phonenumber"
                      value={phonenumber}
                      onChange={this.handleInputChange}
                      class="form-control"
                    ></input>
                    {this.state.phonenumberError ? (
                      <label class="mt-2" style={{ color: "red" }}>
                        Phone number is required
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="form-group">
                    <h4 style={{ fontSize: "0.875rem" }}>Message</h4>
                    <input
                      type="text"
                      placeholder="Message"
                      id="message"
                      value={message}
                      onChange={this.handleInputChange}
                      class="form-control"
                    ></input>
                    {this.state.messageError ? (
                      <label class="mt-2" style={{ color: "red" }}>
                        Message is required
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div class="form-group">
                    <h4 style={{ fontSize: "0.875rem" }}>STATUS</h4>
                    <select
                      class="form-control"
                      id="status"
                      onChange={this.handleInputChange}
                    >
                      <option selected>Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {this.state.statusError ? (
                      <label class="mt-2" style={{ color: "red" }}>
                        Status is required
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="button"
                    class="btn btn-submit btn-gradient-primary me-2"
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "2rem",
                    }}
                    onClick={this.validation}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn btn-cancel btn-gradient-primary me-2"
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "2rem",
                    }}
                    onClick={this.back}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("map state =====================", state);
  return {
    contactReducer: state.CONTACT_Reducer
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { AC_LIST_CONTACT,
        AC_ADD_CONTACT,
        AC_VIEW_CONTACT, AC_HANDLE_INPUT_CHANGE },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(editContact);
