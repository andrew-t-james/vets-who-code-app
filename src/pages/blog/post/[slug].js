import PropTypes from 'prop-types'
import Image from 'next/image'
import readingTime from 'reading-time'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import PageHeader from '../../../components/PageHeader'
import { useScript } from '../../../hooks'
import { fetchContent } from '../../../utilities/conentful'
import { options } from '../../../utilities/blog-helpers'

const BlogPost = ({ blogPost }) => {
  const src = 'https://assets.codepen.io/assets/embed/ei.js'
  useScript(src)

  const blogPostConent = documentToReactComponents(blogPost.body.json, options)

  let text = ''
  blogPostConent.forEach(reactElement => (text += reactElement.props.children))
  const readingStats = readingTime(text)

  return (
    <>
      <PageHeader title={blogPost.title} link={'blog'} />
      <section id="blog-page" className="section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <article className="post">
                <div className="entry-content">
                  <div className="align-left">
                    <Image
                      className="round"
                      src={blogPost.author.authorImage.url}
                      alt={blogPost.author.authorName}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                      height={50}
                      width={50}
                    />
                  </div>
                  <div className="entry-meta">
                    <h2 className="entry-title">{blogPost.title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by{' '}
                          <span className="blog-author" style={{ outline: 'none' }}>
                            {blogPost.author.authorName}
                          </span>{' '}
                          <span>&middot;</span> {readingStats.text} <span>&middot;</span>{' '}
                          {blogPost.publishedDate}
                        </p>
                      </span>
                    </div>
                  </div>
                  {blogPostConent}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

async function getBlogPost() {
  const blogPostIdList = await fetchContent(`
      {
        blogPostCollection {
          items {
            slug
            sys {
              id
            }
          }
        }
      }
  `)

  const paths = blogPostIdList.blogPostCollection.items.map(p => ({
    params: {
      slug: p.slug,
      id: p.sys.id,
    },
  }))

  return {
    paths,
  }
}

export async function getStaticPaths() {
  const { paths } = await getBlogPost()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const blogPost = await fetchContent(`
    {
      blogPostCollection(where: { slug: "${slug}" }) {
        items {
          title
          body {
            json
          }
          author {
            ... on Author {
              authorName
              authorImage {
                url
                width 
                height
              }
            }
          }
        }
      }
    }
  `)

  return {
    props: {
      blogPost: blogPost.blogPostCollection.items[0],
    },
  }
}

BlogPost.propTypes = {
  blogPost: PropTypes.shape({
    title: PropTypes.String,
    body: PropTypes.shape({
      json: PropTypes.object,
    }),
    author: PropTypes.shape({
      authorName: PropTypes.string,
      authorImage: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
  }),
}

export default BlogPost
