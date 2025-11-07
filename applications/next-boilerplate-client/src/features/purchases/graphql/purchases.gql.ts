import { gql } from '@apollo/client'

export const PURCHASES_QUERY = gql`
  query Purchases($productIds: [ID!], $userIds: [ID!]) {
    purchases(productIds: $productIds, userIds: $userIds) {
      nodes {
        id
        product { id name imageUrl }
        user { id firstName lastName email profilePictureUrl }
      }
    }
  }
`