import React, { Component } from 'react';

export class Users extends Component {
  static displayName = Users.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.populateUserData();
  }

  static renderUsersTable(users) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>UserId</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
          <tr key={user.username}>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
          </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Users.renderUsersTable(this.state.users);

    return (
      <div>
        <h1 id="tabelLabel" >User List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateUserData() {
    const response = await fetch('users/getusers');
    const data = await response.json();
    this.setState({ users: data, loading: false });
   }

}
