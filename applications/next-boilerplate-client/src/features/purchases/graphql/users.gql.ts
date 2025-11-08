import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
  query Users($searchTerm: String, $first: Int) {
    users(searchTerm: $searchTerm, first: $first) {
      nodes {
        id
        firstName
        lastName
        email
        profilePictureUrl
      }
    }
  }
`

