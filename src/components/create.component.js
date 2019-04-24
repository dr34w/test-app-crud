import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import FileInput from './fileInput.component';
import Validates from './validation';

import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';

export default class Create extends Component {
    constructor(props) {
      super(props);
      this.onChangePersonName = this.onChangePersonName.bind(this);
      this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
      this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
      this.onChangeFileInputName = this.onChangeFileInputName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        person_name: '',
        business_name: '',
        business_gst_number: '',
        fileInput_name: '',
        currentUser: null,
        isAdmin: false
      }
    }

    componentDidMount() {
      authenticationService.currentUser.subscribe(x => this.setState({
          currentUser: x,
          isAdmin: x && x.role === Role.Admin
      }));
  }
  
    onChangePersonName(e) {
      this.setState({
        person_name: e.target.value
      });
    }
  
    onChangeBusinessName(e) {
      this.setState({
        business_name: e.target.value
      });
    }
  
    onChangeGstNumber(e) {
      this.setState({
        business_gst_number: e.target.value
      });
    }

    onChangeFileInputName(e) {
      this.setState({
        fileInput_name: e.target.value
      });
    }  

    onSubmit(e) {
      e.preventDefault();
      
        const obj = {
          person_name: this.state.person_name,
          business_name: this.state.business_name,
          business_gst_number: this.state.business_gst_number,
          fileInput_name: this.state.fileInput_name
        }
        axios.post('http://localhost:4000/business/add', obj)
        .then(res => console.log(res.data));

        this.setState({
          person_name: '',
          business_name: '',
          business_gst_number: '',
          fileInput_name: ''
        })
        this.props.history.push('/index');
    }

    
  
    render(){
      const { currentUser, isAdmin } = this.state;
      return (
        
        <div style={{marginTop: 10}}>
        
        <h3>Add New Business</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Person Name:</label>
            <input 
              type="text"
              className="form-control"
              value={this.state.person_name}
              onChange={this.onChangePersonName}
              />
          </div>
          <div className="form-group">
              <label>Business Name:</label>
              <input
              type="text"
              className="form-control"
              value={this.state.business_name}
              onChange={this.onChangeBusinessName}
              />
          </div>
           
          <div className="form-group">
            <label>GST Number:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.business_gst_number}
              onChange={this.onChangeGstNumber}
              />
          </div>

          <div className="form-group">
            <label>Upload photo:</label>
            <FileInput
              className="form-control"
              onChange={this.onChangeFileInputName}
              value={this.state.fileInput_name}
              />
          </div>

          {/* <div>
            <Validates></Validates>
          </div> */}
  
          <div className="form_group">
          {currentUser &&
            <input type="submit" value="Register Business" className="btn btn-primary"/>
          }
          </div>
        </form>
        </div>
      )
    }
  }