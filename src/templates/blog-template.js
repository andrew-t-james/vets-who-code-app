import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Icon from '../components/Icon'
import PageHeader from '../components/PageHeader'

function BlogPost({ title, author, publishedDate, slug, description }) {
  const excerpt = description.content[0].content[0].value

  return (
    <article className="post">
      <div className="row">
        <div className="col-xs-2" />

        <div className="col-md-8">
          <div className="entry-meta">
            <h4 className="entry-title">
              <Link to={`/blog/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
                {title}.
              </Link>
            </h4>

            <div className="entry-meta-data">
              <span className="author">
                {' '}
                by{' '}
                <a
                  href="#"
                  title="Posts by Sandee Rogers"
                  rel="author"
                  hidefocus="true"
                  style={{ outline: 'none' }}
                >
                  {author}
                </a>
              </span>

              <time className="entry-date" dateTime="">
                <span className="blog-list-icon">
                  <Icon iconName="calendar-alt" fill="#999999" />
                </span>
                {publishedDate}
              </time>
            </div>
          </div>

          <div className="entry-content">
            <p>{excerpt}</p>
          </div>

          <div className="entry-meta clearfix">
            <Link
              to={`/blog/${slug}`}
              className="btn btn-charity-default btn-read-more"
              hidefocus="true"
              style={{ outline: 'none' }}
            >
              <span>Read More</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

const Blog = ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <PageHeader title="blog" />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {data.allContentfulBlogPost.nodes.map(post => (
                <BlogPost
                  key={post.id}
                  title={post.title}
                  author={post.author.authorName}
                  publishedDate={post.publishedDate}
                  slug={post.slug}
                  description={post.body.json}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
        author {
          authorName
        }
        id
        title
        slug
        publishedDate(formatString: "MMMM Do, YYYY")
        body {
          json
        }
      }
    }
  }
`

Blog.propTypes = {
  data: PropTypes.object,
}

export default Blog
