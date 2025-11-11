import { useQuery } from '@apollo/client'

import { PURCHASES_QUERY } from '../graphql/purchases.gql'

export type PurchaseNode = {
  id: string
  createdAt: string
  product: { id: string; name: string; imageUrl?: string | null }
  user: {
    id: string
    firstName: string
    lastName: string
    email?: string | null
    profilePictureUrl?: string | null
  }
}

export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  endCursor?: string | null
  startCursor?: string | null
}

export function usePurchases(
  productIds: string[] = [],
  userIds: string[] = [],
  first: number = 15,
) {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    PURCHASES_QUERY,
    {
      variables: { productIds, userIds, first },
      notifyOnNetworkStatusChange: true,
    },
  )
  const nodes: PurchaseNode[] = data?.purchases?.nodes ?? []
  const pageInfo: PageInfo | undefined = data?.purchases?.pageInfo

  // Distinguish between initial loading and loading more
  const isLoadingMore = loading && nodes.length > 0
  const isInitialLoading = loading && nodes.length === 0

  const loadMore = async () => {
    if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) return

    await fetchMore({
      variables: {
        after: pageInfo.endCursor,
        first,
        productIds,
        userIds,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.purchases) return prev

        return {
          purchases: {
            ...fetchMoreResult.purchases,
            nodes: [
              ...(prev.purchases?.nodes ?? []),
              ...fetchMoreResult.purchases.nodes,
            ],
          },
        }
      },
    })
  }

  return {
    nodes,
    loading,
    error,
    refetch,
    pageInfo,
    loadMore,
    hasMore: pageInfo?.hasNextPage ?? false,
    isLoadingMore,
    isInitialLoading,
  }
}
