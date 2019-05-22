import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

import PageHeader from '../components/PageHeader'

const Blog = ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`

  return (
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: 300,
          margin: '0 auto',
        }}
      >
        {!isFirstPage && (
          <Link to={prevPage} rel="prev">
            Previous Page
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} to={`/blog/${index === 0 ? '' : index + 1}`}>
            {index + 1}
          </Link>
        ))}
        {!isLastPage && (
          <Link to={nextPage} rel="next">
            Next Page
          </Link>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allContentfulBlogPost(
      sort: { fields: publishedDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
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
