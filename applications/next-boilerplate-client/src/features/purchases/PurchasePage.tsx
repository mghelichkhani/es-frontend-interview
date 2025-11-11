'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

import { type Option } from '@/components/MultiSelect'
import { Toast } from '@/components/Toast'

import { LoadMoreButton } from './components/LoadMoreButton'
import { PurchaseFilters } from './components/PurchaseFilters'
import { PurchasePageHeader } from './components/PurchasePageHeader'
import { PurchaseTableBody } from './components/PurchaseTableBody'
import { PurchaseTableHeader } from './components/PurchaseTableHeader'
import { useProducts } from './hooks/useProducts'
import { usePurchases } from './hooks/usePurchases'
import { useUsers } from './hooks/useUsers'

export default function PurchasesPage() {
  const t = useTranslations()
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [isLoadingMoreOptimistic, setIsLoadingMoreOptimistic] = useState(false)
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set())
  const [toastOpen, setToastOpen] = useState(false)
  const [toastCount, setToastCount] = useState(0)
  const previousNodesLengthRef = useRef(0)

  const {
    nodes: products,
    loading: productsLoading,
    error: productsError,
  } = useProducts()
  const { nodes: users, loading: usersLoading, error: usersError } = useUsers()

  const productOptions: Option[] = useMemo(
    () =>
      products.map((p) => ({
        id: p.id,
        label: p.name,
      })),
    [products],
  )
  const userOptions: Option[] = useMemo(
    () =>
      users.map((u) => ({
        id: u.id,
        label: `${u.firstName} ${u.lastName}`,
      })),
    [users],
  )

  const { nodes, error, loadMore, hasMore, isLoadingMore, isInitialLoading } =
    usePurchases(selectedProductIds, selectedUserIds)

  // Track newly added items and show toast
  useEffect(() => {
    if (isInitialLoading || nodes.length === 0) {
      previousNodesLengthRef.current = nodes.length
      return
    }

    const newCount = nodes.length - previousNodesLengthRef.current
    if (newCount > 0 && previousNodesLengthRef.current > 0) {
      // New items were added
      const newIds = new Set(
        nodes.slice(previousNodesLengthRef.current).map((n) => n.id),
      )
      setNewlyAddedIds(newIds)
      setToastCount(newCount)
      setToastOpen(true)

      // Clear highlight after animation
      setTimeout(() => {
        setNewlyAddedIds(new Set())
      }, 2000)
    }

    previousNodesLengthRef.current = nodes.length
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, isInitialLoading])

  const handleReset = () => {
    setSelectedProductIds([])
    setSelectedUserIds([])
    setIsLoadingMoreOptimistic(false)
    setNewlyAddedIds(new Set())
  }

  const handleLoadMore = async () => {
    setIsLoadingMoreOptimistic(true)
    try {
      await loadMore()
    } finally {
      setIsLoadingMoreOptimistic(false)
    }
  }

  const showLoadingMorePlaceholders = isLoadingMoreOptimistic || isLoadingMore

  return (
    <div className="mx-auto max-w-5xl p-4">
      <PurchasePageHeader resultCount={nodes.length} onReset={handleReset} />

      <PurchaseFilters
        productOptions={productOptions}
        userOptions={userOptions}
        selectedProductIds={selectedProductIds}
        selectedUserIds={selectedUserIds}
        onProductChange={setSelectedProductIds}
        onUserChange={setSelectedUserIds}
        productsLoading={productsLoading}
        usersLoading={usersLoading}
        productsError={productsError ? t('errors.load.products') : null}
        usersError={usersError ? t('errors.load.users') : null}
      />

      <div className="rounded-lg border border-border-subtle">
        {error && (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-red-600">
              {t('errors.load.purchases')}
            </span>
          </div>
        )}
        {!error && (
          <div className="flex flex-col">
            <PurchaseTableHeader />
            <PurchaseTableBody
              nodes={nodes}
              isInitialLoading={isInitialLoading}
              showLoadingMorePlaceholders={showLoadingMorePlaceholders}
              newlyAddedIds={newlyAddedIds}
              onScrollToBottom={hasMore ? handleLoadMore : undefined}
            />
            {!isInitialLoading && nodes.length > 0 && (
              <LoadMoreButton
                hasMore={hasMore}
                isLoading={showLoadingMorePlaceholders}
                onClick={handleLoadMore}
              />
            )}
          </div>
        )}
        {!error && !isInitialLoading && nodes.length === 0 && (
          <div className="p-3 text-sm text-text-muted">
            {t('purchasesPage.empty')}
          </div>
        )}
      </div>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        description={t('purchasesPage.itemsLoaded', { count: toastCount })}
        duration={3000}
      />
    </div>
  )
}
