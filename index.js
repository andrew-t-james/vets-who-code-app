import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import { FaRegCalendarAlt } from 'react-icons/fa'

import PageHeader from '../../components/PageHeader'
import { fetchContent } from '../../utilities/conentful'

function BlogPostLink({ title, author, publishedDate, slug, description, featureImage }) {
  const excerpt = description.content[0].content[0].value

  return (
    <article className="post after">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="entry-meta">
            <Link href={`/blog/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
              <a>
                <Image
                  className="img-responsive"
                  alt={featureImage.title}
                  src={featureImage.url}
                  height={featureImage.height}
                  width={featureImage.width}
                  style={{ borderRadius: 4 }}
                />
                <h4 className="entry-title">{title}.</h4>
              </a>
            </Link>

            <div className="entry-meta-data">
              <span className="author" style={{ paddingRight: 4 }}>
                {' '}
                by{' '}
                <span className="blog-author" style={{ outline: 'none' }}>
                  {author}
                </span>
              </span>

              <time className="entry-date" dateTime="">
                <span className="blog-list-icon">
                  <FaRegCalendarAlt color="#999999" />
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
              href={`/blog/${slug}`}
              className="btn btn-charity-default btn-read-more"
              hidefocus="true"
              style={{ outline: 'none' }}
            >
              <a>
                <span>Read More</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

BlogPostLink.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.shape({
    data: PropTypes.object,
    content: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.object,
        content: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.object,
            marks: PropTypes.array,
            value: PropTypes.string,
          })
        ),
      })
    ),
    nodeType: PropTypes.string,
  }),
  featureImage: PropTypes.shape({
    fluid: PropTypes.shape({
      srcSet: PropTypes.string,
      src: PropTypes.string,
      sizes: PropTypes.string,
      aspectRatio: PropTypes.number,
    }),
    title: PropTypes.string,
  }),
}

const Blog = ({
  currentPage,
  prevPage,
  nextPage,
  isFirstPage,
  totalPages,
  isLastPage,
  blogPostCollection,
}) => {
  const { items } = blogPostCollection

  return (
    <>
      <PageHeader title="blog" />
      <section id="blog-page" className="section  bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {items.map(post => (
                <BlogPostLink
                  key={post.slug}
                  title={post.title}
                  // author={post.author.authorName}
                  publishedDate={post.publishedDate}
                  slug={post.slug}
                  description={post.body.json}
                  featureImage={post.featureImage}
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
          margin: '0 auto',
        }}
      >
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {!isFirstPage && (
              <li>
                <Link href={prevPage} rel="prev">
                  <a>
                    <span aria-hidden="true">Previous</span>
                  </a>
                </Link>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <Link href={`/blog/${index === 0 ? '' : index + 1}`}>
                  <a>{index + 1}</a>
                </Link>
              </li>
            ))}
            {!isLastPage && (
              <li>
                <Link href={nextPage} rel="next">
                  <a>
                    <span aria-hidden="true">Next</span>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { blog: '1' } }, { params: { blog: '2' } }, { params: { blog: '3' } }],
    fallback: false, // See the "fallback" section in docs
  }
}

export async function getStaticProps(ctx) {
  const currentPage = ctx.params || 1
  console.log('currentPage:', currentPage)

  // const totaBloglPosts = await fetchContent(``)

  const response = await fetchContent(`
      {
        blogPostCollection(skip: 0, limit: 3) {
          total
          items {
            body {
              json
            }
            featureImage {
              url
              title
              height
              width
            }
            publishedDate
            title
            slug
          }
        }
      }
  `)
  const postPerPage = 3

  const totalPages = Math.ceil(response.blogPostCollection.items.length / postPerPage)
  // const currentPage = 1
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`

  return {
    props: {
      blogPostCollection: response.blogPostCollection,
      nextPage,
      prevPage,
      totalPages,
      isFirstPage: true,
      isLastPage: false,
    },
  }
}

Blog.propTypes = {
  limit: PropTypes.number,
  skip: PropTypes.number,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  contentfulData: PropTypes.object,
}

export default Blog
