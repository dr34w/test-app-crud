 import React, { Component } from 'react';
 import axios from 'axios';
 import { Link } from 'react-router-dom';
 import TableRow from './TableRow';
 import './styles.css';
 //import ReactDOM from 'react-dom';

 import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';


export default class Details extends Component {
        constructor(props) {
            super(props);
            this.delete = this.delete.bind(this);
            this.state = {
                business: [],
                person_name: '',
                business_name: '',
                business_gst_number: '',
                currentUser: null,
                isAdmin: false
            };
        }
        componentDidMount(){        

            authenticationService.currentUser.subscribe(x => this.setState({
                currentUser: x,
                isAdmin: x && x.role === Role.Admin
            }));

            axios.get('http://localhost:4000/business/details/'+this.props.match.params.id)
                .then(response => {
                    this.setState({
                        business: response.data,
                        person_name: response.data.person_name,
                        business_name: response.data.business_name,
                        business_gst_number: response.data.business_gst_number
                    });
                    console.log(response.data);
                    
                })
                .catch(function(error){
                    console.log(error);
                })
        }
        delete() {            
            axios.get('http://localhost:4000/business/delete/'+this.props.match.params.id)
                .then(res => {
                console.log('Deleted');
                this.props.delete(this.props.indice);
                })
                .catch(err => console.log(err))
            }
         tabRow(){
             return this.state.business.map(function(object, i){
                 return <TableRow obj = {object} key = {i} indice={i} delete ={ (ind) => this.deleteItem(ind)}/>;
             });
         }
    
        deleteItem(index){
            this.setState({business : this.state.business.filter((_,i) => i !== index)});
        }
    
        
        render() {
            const { currentUser, isAdmin } = this.state;
            return (
                <div style={{marginTop: 10}}>
                    <h3 align="center">Business List of <span>{this.state.person_name}</span></h3>
                        <div className="form-group">
                            <label>Person Name:  <span>{this.state.person_name}</span></label>
                        </div>
                        <div className="form-group">
                            <label>Business Name: <span>{this.state.business_name}</span></label>
                        </div>
                        <div className="form-group">
                            <label>GST Number: <span>{this.state.business_gst_number}</span></label>
                        </div>
                        {currentUser &&
                        <div className="button">
                            <Link to={"/edit/"+this.props.match.params.id} className="btn btn-primary">Edit</Link>
                            {isAdmin && <button onClick={this.delete} className="btn btn-danger">Delete</button>}
                        </div>
                        }
                </div>
            ) 
            
        }
    }