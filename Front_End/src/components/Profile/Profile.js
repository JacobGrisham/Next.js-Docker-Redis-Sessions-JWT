import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './Profile.css'

class Profile extends Component {

  constructor(props) {

    // Even though we have this state defined in App.js under InitialState,
    // we create a separate state here to avoid unnecessary re-rendering
    // when the state is changed (i.e. when a user types into the input)
    super(props);
    this.state = {
      email: this.props.user.email,
      name: this.props.user.name,
      password: this.props.user.password
    }
  }

  onFormChange = (event) => {
    switch(event.target.name) {
      case 'email-address':
        this.setState({email: event.target.value})
        break;
      case 'name':
        this.setState({name: event.target.value})
        break;
      case 'password':
        this.setState({password: event.target.value})
        break;
      default:
        return;
    }
  }

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formInput: data })
    }).then(res => {
        // eslint-disable-next-line
        this.props.toggleModal(),
        this.props.loadUser({ ...this.props.user, ...data })
    }).catch(err => {console.log(err)})
  }

  render() {
    const { user } = this.props;
    const { email, name, password } = this.state
    return (
    <div className='profile-modal'>
      <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: '#4667D1', flexDirection: 'column'}}>
        <Button close onClick={this.props.toggleModal} className="f6 link dim ba ph3 pv2 mb2 dib" style={{ alignSelf: 'flex-end' }}/>
        <main className="pa4 white-80 w-80">
          <img
          src="https://www.jacobgrisham.com/img/Tech%20Account%20Profile%20Photo%20medium.jpg"
          className="h4 w4 dib" alt="avatar"/>
          <h1>{user.name}</h1>
          <h4>Images Submitted: {user.entries}</h4>
          <p>Member Since: {new Date(user.joined).toLocaleTimeString()}</p>
          <hr></hr>
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="ph0 mh0">Edit Profile Information</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Change Username</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-blue white hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  placeholder={user.name}
                  onChange={this.onFormChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Update Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-blue white hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  placeholder={user.email}
                  onChange={this.onFormChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Change Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-blue white hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  placeholder={user.password}
                  onChange={this.onFormChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => this.onProfileUpdate({ email, name, password })}
                className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Save"
              />
            </div>
          </div>
        </main>
      </article>
    </div>
    )
  }
}

export default Profile;