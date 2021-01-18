import { boardMemberCollectionLocalContent, blogPostCollectionLocalContent } from './local-content'

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master'

function hasContentfulEnvKeys() {
  return space && accessToken
}

async function fetchContent(query) {
  if (!hasContentfulEnvKeys()) {
    return {
      blogPostCollection: {
        ...blogPostCollectionLocalContent,
      },
      boardMemberCollection: {
        ...boardMemberCollectionLocalContent,
      },
    }
  }

  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        // throw our query (a string) into the body directly
        body: JSON.stringify({ query }),
      }
    )
    const { data } = await res.json()
    return data
  } catch (error) {
    // add a descriptive error message first,
    // so we know which GraphQL query caused the issue
    console.error(`There was a problem retrieving entries with the query ${query}`)
    console.error(error)
  }
}

export { fetchContent }
