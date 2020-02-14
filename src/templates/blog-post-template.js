/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import readingTime from 'reading-time'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

const BlogPost = ({ data }) => {
  const Bold = ({ children }) => (
    <span style={{ fontWeight: 'bold', color: 'inherit' }}>{children}</span>
  )

  const Text = ({ children }) => <p>{children}</p>

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      'embedded-asset-block': node => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} className="img-responsive" />
      },
    },
  }

  const contentfulBlogContent = documentToReactComponents(
    data.contentfulBlogPost.body.json,
    options
  )

  let text = ''
  contentfulBlogContent.forEach(reactElement => (text += reactElement.props.children))
  const readingStats = readingTime(text)

  return (
    <Layout>
      <PageHeader title={data.contentfulBlogPost.title} link={'blog'} />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <article className="post">
                <div className="entry-content">
                  <Image
                    className="align-left"
                    alt={data.contentfulBlogPost.author.authorName}
                    fixed={data.contentfulBlogPost.author.authorImage.fixed}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                  <div className="entry-meta">
                    <h2 className="entry-title">{data.contentfulBlogPost.title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by {data.contentfulBlogPost.author.authorName} <span>&middot;</span>{' '}
                          {readingStats.text} <span>&middot;</span>{' '}
                          {data.contentfulBlogPost.publishedDate}
                        </p>
                      </span>
                    </div>
                  </div>
                  {contentfulBlogContent}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      author {
        authorName
        authorImage {
          fixed(width: 100) {
            ...GatsbyContentfulFixed_tracedSVG
          }
        }
      }
      id
      slug
      publishedDate(formatString: "MMMM Do, YYYY")
      title
      body {
        json
      }
    }
  }
`

BlogPost.propTypes = {
  data: PropTypes.object,
}

export default BlogPost
