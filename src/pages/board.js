import PropTypes from 'prop-types'
import PageHeader from '../../src/components/PageHeader'
import BoardCards from '../../src/components/Board'
import { fetchContent } from '../utilities/conentful'

function BoardTemplate({ boardMemberCollection }) {
  return (
    <>
      <PageHeader title="Board of Directors" />
      <section id="about" className="small-top-pad section bg-default">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Board of Directors</h1>
            </div>
          </div>
          <div className="container">
            <div className="row is-flex">
              <BoardCards boardMemberCollection={boardMemberCollection} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetchContent(`
      {
        boardMemberCollection(order: lastName_ASC) {
          items {
            linkedin
            firstName
            lastName
            twitter
            work
            bio
            image {
              url
              width
              height
            }
          }
        }
      }
  `)

  return {
    props: {
      boardMemberCollection: response.boardMemberCollection.items,
    },
  }
}

BoardTemplate.propTypes = {
  boardMemberCollection: PropTypes.arrayOf(
    PropTypes.shape({
      bio: PropTypes.String,
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
      work: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      image: PropTypes.shape({
        src: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    })
  ),
}

export default BoardTemplate
