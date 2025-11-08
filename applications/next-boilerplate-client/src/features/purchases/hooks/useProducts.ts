import { useQuery } from '@apollo/client'
import { PRODUCTS_QUERY } from '../graphql/products.gql'

export type ProductNode = {
  id: string
  name: string
  imageUrl: string
}

export function useProducts(searchTerm?: string, first: number = 100) {
  const { data, loading, error, refetch } = useQuery(PRODUCTS_QUERY, {
    variables: { searchTerm, first },
  })
  const nodes: ProductNode[] = data?.products?.nodes ?? []
  return { nodes, loading, error, refetch }
}

