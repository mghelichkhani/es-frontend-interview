'use client'
import { useState } from 'react'
import { usePurchases } from './hooks/usePurchases'
import { useProducts } from './hooks/useProducts'
import { useUsers } from './hooks/useUsers'
import PurchaseRow from './PurchaseRow'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { MultiSelect, type Option } from '@/components/MultiSelect'

export default function PurchasesPage() {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const { nodes: products, loading: productsLoading, error: productsError } = useProducts()
  const { nodes: users, loading: usersLoading, error: usersError } = useUsers()

  const productOptions: Option[] = products.map(p => ({ id: p.id, label: p.name }))
  const userOptions: Option[] = users.map(u => ({ id: u.id, label: `${u.firstName} ${u.lastName}` }))

  const { nodes, loading, error } = usePurchases(selectedProductIds, selectedUserIds)

  return (
    <div className="mx-auto max-w-5xl p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Purchased Products</h1>
        <span className="text-sm text-gray-600">{nodes.length} results</span>
      </header>

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <MultiSelect
            label="Filter by Products"
            value={selectedProductIds}
            onChange={setSelectedProductIds}
            options={productOptions}
            isLoading={productsLoading}
            error={productsError ? 'Failed to load products' : null}
            placeholder="Search products..."
          />
        </div>
        <div className="flex-1">
          <MultiSelect
            label="Filter by Users"
            value={selectedUserIds}
            onChange={setSelectedUserIds}
            options={userOptions}
            isLoading={usersLoading}
            error={usersError ? 'Failed to load users' : null}
            placeholder="Search users..."
          />
        </div>
      </div>

      <div className="rounded border">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner text="Loading purchases…" />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-red-600">Failed to load purchases</span>
          </div>
        )}
        {!loading && !error && nodes.length === 0 && (
          <div className="p-3 text-sm text-gray-500">No purchases</div>
        )}

        {!loading && nodes.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-2 text-left text-sm font-semibold md:p-3 md:text-base">Product</th>
                <th className="p-2 text-left text-sm font-semibold md:p-3 md:text-base">User</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((p) => <PurchaseRow key={p.id} p={p} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
