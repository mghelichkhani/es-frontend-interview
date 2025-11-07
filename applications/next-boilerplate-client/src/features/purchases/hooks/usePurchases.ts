import { useQuery } from '@apollo/client'
import { PURCHASES_QUERY } from '../graphql/purchases.gql'

export type PurchaseNode = {
  id: string
  createdAt: string
  product: { id: string; name: string; imageUrl?: string | null }
  user: { id: string; firstName: string; lastName: string; email?: string | null; profilePictureUrl?: string | null }
}

export function usePurchases(
  productIds: string[] = [],
  userIds: string[] = [],
  first: number = 15,
  after?: string
) {
  const { data, loading, error, refetch } = useQuery(PURCHASES_QUERY, {
    variables: { productIds, userIds, first, after },
  })
  const nodes: PurchaseNode[] = data?.purchases?.nodes ?? []
  const pageInfo = data?.purchases?.pageInfo
  return { nodes, loading, error, refetch, pageInfo }
}
