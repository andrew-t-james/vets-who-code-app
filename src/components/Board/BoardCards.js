import PropTypes from 'prop-types'
import Image from 'next/image'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'

function BoardCards({ boardMemberCollection }) {
  return (
    <>
      {boardMemberCollection.map(node => {
        return (
          <div key={`${node.firstName}-${node.lastName}`} className="col-md-6 col-lg-3 col-sm-6">
            <div className="card-box text-center">
              <div className="upper">
                <div className="user-pic">
                  <Image
                    src={node.image.url}
                    alt={`${node.firstName} ${node.lastName}`}
                    className="img-fluid"
                    width={node.image.width}
                    height={node.image.height}
                  />
                </div>
                <h1>
                  {node.firstName} {node.lastName}
                </h1>
                <h2>{node.work}</h2>
              </div>
              <div className="bio">
                <p className="board-bio">{node?.bio}</p>
              </div>
              <div className="board-links">
                {node.linkedin && (
                  <a
                    aria-label={`${node.firstName} ${node.lastName} linkedin`}
                    rel="noopener noreferrer"
                    href={node.linkedin}
                    target="_blank"
                  >
                    <FaLinkedinIn className="board-icons" size="40" />
                  </a>
                )}
                {node.twitter && (
                  <a
                    aria-label={`${node.firstName} ${node.lastName} twitter`}
                    rel="noopener noreferrer"
                    href={node.twitter}
                    target="_blank"
                  >
                    <FaTwitter className="board-icons" size="40" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

BoardCards.propTypes = {
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

export default BoardCards
