import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

class Login extends Component {

    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: ''
    }

    render() {
        return (
            <div>
                <h4 className='mv3'>{this.state.login ? 'Login' : 'Sign Up'}</h4>
                <div className='flex flex-column'>
                    {!this.state.login &&
                    <input
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        type='text'
                        placeholder='Your name'
                    />}
                    <input
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        type='text'
                        placeholder='Your email address'
                    />
                    <input
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        type='password'
                        placeholder='Choose a safe password'
                    />
                </div>
                <div className='flex mt3'>
                    <div
                        className='pointer mr2 button'
                        onClick={() => this._confirm()}
                    >
                        {this.state.login ? 'login' : 'create account' }
                    </div>
                    <div
                        className='pointer button'
                        onClick={() => this.setState({ login: !this.state.login })}
                    >
                        {this.state.login ? 'need to create an account?' : 'already have an account?'}
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async () => {
        const {name, email, password} = this.state;
        let data = await this.props.authenticateUserMutation({
            variables:{
                name, email, password
            }
        });
        console.log(data.data.authenticate.userEdge.node.id, data.data.authenticate.userEdge.node.password)
        this._saveUserData(data.data.authenticate.userEdge.node.id, data.data.authenticate.userEdge.node.password)
        this.props.history.push(`/`)
    }

    _saveUserData = (id, token) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
    }

}
const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation($email: String!, $password: String!, $name: String!) {
    signupUser(
      email: $email,
      password: $password,
      name: $name
    ) {
      id
      token
    }
  }
`;

const AUTHENTICATE_USER_MUTATION = gql`
    mutation AuthenticateUserMutation($email: String!, $password: String!) {
      authenticate(input: {
        email: $email
        password: $password
      }){
        userEdge{
          node{
            id
            password
          }
        }
      }
    }
`;

export default compose(
    graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
    graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(Login)