import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

import PageHeader from '../components/PageHeader'

const Blog = ({ data }) => (
  <Layout>
    <PageHeader title="blog" />
    {data.allContentfulBlogPost.nodes.map(post => (
      <Link to={`/blog/${post.slug}`} key={post.id}>
        <div>
          <h2>{post.title}</h2>
          <p>{post.publishedDate}</p>
        </div>
      </Link>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
      nodes {
        id
        title
        slug
        publishedDate(formatString: "MMMM Do, YYYY")
      }
    }
  }
`

Blog.propTypes = {
  data: PropTypes.object,
}
export default Blog
