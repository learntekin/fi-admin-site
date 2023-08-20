import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CONTACT, AC_DELETE_CONTACT } from '../actions/contact';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
import { TabTitle } from "../util/DynamicTab";
class listContact extends React.Component {
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
        this.delete = this.delete.bind(this);
        this.editContact = this.editContact.bind(this);
        this.viewContact = this.viewContact.bind(this);
    }
    delete(event) {
        var contactId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deleteContact(contactId);
                swal("Contact Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Contact not deleted!',);
            }
        });
    }
    deleteContact(contactId) {
        var formData = {
            id: contactId
        }
        this.props.AC_LIST_CONTACT();
        this.props.AC_DELETE_CONTACT(formData);
        this.props.AC_VIEW_CONTACT();
    }
    componentDidMount() {
        this.props.AC_LIST_CONTACT();
    }
    editContact(event) {
        let contactId = event.target.id;
        this.setState({ editStatus: true, editId: contactId })
    }
    viewContact(event) {
        let contactId = event.target.id;
        this.setState({ viewStatus: true, viewId: contactId })
    }
    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editContact/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewContact/" + this.state.viewId} />
        }
        var TotalContact = 0;
        var Active = 0;
        var Inactive = 0;
        var contactList = this.props.contactReducer.contactList;
        if (contactList) {
            Active = 0;
            TotalContact = contactList.length;
            Inactive = 0;
        }
        var Contact = this.props.contactReducer.contactList;
        console.log("=-=-=-table=", Contact)
        var resultArray = [];
        if (Contact == 0) {
            resultArray.push(<label>No data found</label>)
        }
        else {
            for (var i = 0; i < Contact.length; i++) {
                var tempVal = "";
                if (Contact[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Contact[i].name}</td>
                    <td>{Contact[i].email}</td>
                    <td>{Contact[i].phonenumber}</td>
                    <td>{Contact[i].message}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Contact[i]._id} onClick={this.viewContact} class="btn btn-primary m-2">View</button>
                        <button type="button" id={Contact[i]._id} onClick={this.editContact} class="btn btn-success m-2">Edit</button>
                        <button type="button" id={Contact[i]._id} onClick={this.delete} class="btn btn-danger m-2">Delete</button>
                    </td>
                </tr>
                )
            }
        }
        TabTitle('List Contact');
        return (
            <>
                <div class="main-panel" >
                    <div class="content-wrapper" style={{ background: 'white' }} >
                        <div class="page-header">
                            <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="mdi mdi-home"></i>
                                </span> List Contact
                            </h3>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active" aria-current="page">
                                        <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="row">
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-danger card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Total Contact <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalContact}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Contact <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Contact <i class="mdi mdi-diamond mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Inactive}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="table">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col"> Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Message</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {resultArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
    return bindActionCreators({ AC_LIST_CONTACT, AC_DELETE_CONTACT }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(listContact);

