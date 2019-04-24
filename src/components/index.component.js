import React, {Component, PureComponent} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

import { authenticationService } from '../_services';
import { history, Role } from '../_helpers';

export default class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            business: [],
            currentUser: null,
            isAdmin: false
        };
    }
    componentDidMount(){   
        
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
        
        this.lookupInterval = setInterval(() => {
            axios.get('http://localhost:4000/business')
                .then(response => {
                    this.setState({business: response.data});
                    console.log(response.data);
                    
                })
                .catch(function(error){
                    console.log(error);
                })
            }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.lookupInterval);
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
            <div>
                <h3 align="center">Business List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Person</th>
                            <th>Business</th>
                            <th>GST Number</th>
                            <th colSpan="2">Action</th>
                        </tr>
        
                    </thead>
                    <tbody>
                        { this.tabRow() }
                    </tbody>
                </table>
            </div>
        );
    }
} 