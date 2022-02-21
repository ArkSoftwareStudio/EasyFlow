import React, { Component } from 'react';
import 'axios';
import './Users.css'
const axios = require('axios').default;

export class Users extends Component {
    static displayName = Users.name;

    constructor(props) {
        super(props);
        this.state = { users: [], loading: false };
    }

    static CreateUser() {
        const FirstName = document.getElementById("FirstName").value;
        const LastName = document.getElementById("LastName").value;
        const Username = document.getElementById("Username").value;
        const Password = document.getElementById("Password").value;
        const PasswordVal = document.getElementById("PasswordVal").value;
        const Email = document.getElementById("Email").value;
        var user;

        if (Password == PasswordVal) {
            user = JSON.stringify({
                UserId: 0,
                UserName: Username,
                Password: Password,
                Email: Email,
                FirstName: FirstName,
                LastName: LastName
            });
        }

        axios.post('/users/adduser', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res));
    }

    static renderUsersForm() {
        return (
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <div class="container">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title">Add User</h5>
                                </div>
                                <form class="card-body" id="UserInfo">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">First & Last Name</span>
                                        <input type="text" class="form-control" placeholder="First Name" aria-label="FirstName" id="FirstName"></input>
                                        <input type="text" class="form-control" placeholder="Last Name" aria-label="LastName" id="LastName"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Username" aria-label="UserName" id="Username"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">Password & Validation</span>
                                        <input type="password" class="form-control" placeholder="Password" aria-label="UserName" id="Password"></input>
                                        <input type="password" class="form-control" placeholder="Password Validation" aria-label="UserName" id="PasswordVal"></input>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Email" aria-label="UserName" id="Email"></input>
                                    </div>
                                    <div class="col-12">
                                        <button type="reset" class="btn btn-primary" onClick={this.CreateUser}>Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Users.renderUsersForm();

    return (
      <div>
        <h1 id="tabelLabel" >Welcome To The User Tab</h1>
        <p>You can ADD, EDIT, or VIEW Users here</p>
        {contents}
      </div>
    );
  }

}
