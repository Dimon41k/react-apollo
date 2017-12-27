import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {

    render() {
        console.log(this.props.anyQuery.allLinks);
        // 1
        if (this.props.anyQuery && this.props.anyQuery.loading) {
            return <div>Loading</div>
        }

        // 2
        if (this.props.anyQuery && this.props.anyQuery.error) {
            return <div>Error</div>
        }

        // 3
        const linksToRender = this.props.anyQuery.allLinks.nodes

        return (
            <div>
                {linksToRender.map(link => (
                    <Link key={link.id} link={link}/>
                ))}
            </div>
        )
    }

}

// 1
const ALL_LINKS_QUERY = gql`
query anyQuery{
  allLinks {
    nodes {
      url
      description
      id
    }
  }
}
`

// 3
export default graphql(ALL_LINKS_QUERY, { name: 'anyQuery' }) (LinkList)