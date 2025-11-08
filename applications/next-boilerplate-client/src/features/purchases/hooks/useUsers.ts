import { useQuery } from '@apollo/client'
import { USERS_QUERY } from '../graphql/users.gql'

export type UserNode = {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePictureUrl: string
}

export function useUsers(searchTerm?: string, first: number = 100) {
  const { data, loading, error, refetch } = useQuery(USERS_QUERY, {
    variables: { searchTerm, first },
  })
  const nodes: UserNode[] = data?.users?.nodes ?? []
  return { nodes, loading, error, refetch }
}

