import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateLink extends Component {

    state = {
        description: '',
        url: ''
    }

    render() {
        return (
            <div>
                <div className='flex flex-column mt3'>
                    <input
                        className='mb2'
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        type='text'
                        placeholder='A description for the link'
                    />
                    <input
                        className='mb2'
                        value={this.state.url}
                        onChange={(e) => this.setState({ url: e.target.value })}
                        type='text'
                        placeholder='The URL for the link'
                    />
                    <input
                        className='mb2'
                        value={this.state.id}
                        onChange={(e) => this.setState({ id: e.target.value })}
                        type='text'
                        placeholder='User id'
                    />
                </div>
                <button
                    onClick={() => this._createLink()}
                >
                    Submit
                </button>
            </div>
        )
    }

    _createLink = async () => {
        const { description, url, id } = this.state
        await this.props.createLinkMutation({
            variables: {
                description,
                url,
                id
            }
        })
    }

}

// 1
const CREATE_LINK_MUTATION = gql`
  mutation createLinkMutation($description: String!, $url: String!, $id: Int!){
  createLink(input: {link: {url: $url description: $description, postedby: $id}}) {
    linkEdge {
      node {
        postedby
        url
        description
      }
    }
  }
}
`

// 3
export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink)