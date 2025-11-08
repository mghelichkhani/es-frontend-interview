import { gql } from '@apollo/client'

export const PRODUCTS_QUERY = gql`
  query Products($searchTerm: String, $first: Int) {
    products(searchTerm: $searchTerm, first: $first) {
      nodes {
        id
        name
        imageUrl
      }
    }
  }
`

