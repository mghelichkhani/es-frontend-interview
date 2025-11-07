import { gql } from '@apollo/client'

export const PURCHASES_QUERY = gql`
  query Purchases($productIds: [ID!], $userIds: [ID!], $first: Int, $after: String) {
    purchases(productIds: $productIds, userIds: $userIds, first: $first, after: $after) {
      nodes {
        id
        product { id name imageUrl }
        user { id firstName lastName email profilePictureUrl }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`