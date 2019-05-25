import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/Layout'
import readingTime from 'reading-time'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import PageHeader from '../components/PageHeader'

const BlogPost = ({ data }) => {
  const options = {
    renderNode: {
      // eslint-disable-next-line react/display-name
      'embedded-asset-block': node => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
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
      <h2>{data.contentfulBlogPost.title}</h2>
      <h4>{data.contentfulBlogPost.author.authorName}</h4>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: 150,
        }}
      >
        <Image
          alt={data.contentfulBlogPost.author.authorName}
          fixed={data.contentfulBlogPost.author.authorImage.fixed}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
        <p>{readingStats.text}</p>
      </div>
      {contentfulBlogContent}
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
