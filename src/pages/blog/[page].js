import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import format from 'date-fns/format'
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
            <Link href={`/blog/post/${slug}`} hidefocus="true" style={{ outline: 'none' }}>
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
                {format(new Date(publishedDate), 'MMMM dd, yyyy')}
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
  totalPages,
  isFirstPage,
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
                  author={post.author.authorName}
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
                <Link href={`/blog/${index === 0 ? '1' : index + 1}`}>
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

async function getBlogThangs() {
  const response = await fetchContent(`
      {
        blogPostCollection {
          total
        }
      }
  `)

  const postPerPage = 3
  const { total } = response.blogPostCollection
  const numberOfPages = Math.ceil(total / postPerPage)
  const totalPages = Math.ceil(total / postPerPage)
  const paths = Array.from({ length: numberOfPages })
    .fill({ params: { page: null } })
    .map((n, i) => ({ params: { page: String(i + 1) } }))

  return {
    postPerPage,
    totalPages,
    numberOfPages,
    paths,
  }
}

export async function getStaticPaths() {
  const { paths } = await getBlogThangs()

  return {
    paths,
    fallback: false, // See the "fallback" section in docs
  }
}

export async function getStaticProps(ctx) {
  const currentPage = ctx.params?.page || '1'
  const { totalPages } = await getBlogThangs()
  const skip = (currentPage - 1) * totalPages
  const nextPage = `/blog/${String(Number(currentPage) + 1)}`
  const prevPage = currentPage === '1' ? '/blog/1' : `/blog/${String(Number(currentPage) - 1)}`
  const isFirstPage = currentPage === '1'
  const isLastPage = currentPage === String(totalPages)

  const { blogPostCollection } = await fetchContent(`
    {
      blogPostCollection(order: publishedDate_DESC, skip: ${skip}, limit: 3) {
        items {
         publishedDate
          title
          featureImage {
            url
            height
            width
          }
          slug
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
      blogPostCollection,
      nextPage,
      prevPage,
      totalPages,
      isFirstPage,
      isLastPage,
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
}

export default Blog
