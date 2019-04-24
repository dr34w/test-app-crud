import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Popup.css';
//import Details from './details.component';

import { history, Role } from '../_helpers';
import { authenticationService } from '../_services';

class TableRow extends Component {

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    delete() {
        axios.get('http://localhost:4000/business/delete/'+this.props.obj._id)
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

    handleClick = (e) => {
      e.preventDefault()
    console.log(e.target)
    }
    

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            
            <tr >
              <td>
              <Link to={"/details/"+this.props.obj._id} className="btn btn-primary">Info</Link>
              </td>
                <td >
                    {this.props.obj.person_name}
                </td>
                <td>
                    {this.props.obj.business_name}
                </td>
                <td>
                    {this.props.obj.business_gst_number}
                </td>
                
                <td>
                {currentUser &&   <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>}
                </td>
                <td>
                   {isAdmin && <button onClick={this.delete} className="btn btn-danger">Delete</button>}
                </td>
                
            </tr>
        );
    }
}
export default TableRow;