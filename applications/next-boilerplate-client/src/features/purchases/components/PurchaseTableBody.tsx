'use client'

import { useEffect, useRef } from 'react'

import type { PurchaseNode } from '../hooks/usePurchases'
import PurchaseRow from '../PurchaseRow'

type PurchaseTableBodyProps = {
  nodes: PurchaseNode[]
  isInitialLoading: boolean
  showLoadingMorePlaceholders: boolean
  newlyAddedIds: Set<string>
  onScrollToBottom?: () => void
}

function PlaceholderRow({ index }: { index: number }) {
  return (
    <tr
      key={`placeholder-${index}`}
      className="border-b border-border-subtle last:border-b-0"
    >
      <td className="p-2 md:p-3">
        <div className="flex items-center gap-2">
          <div className="hidden sm:block h-7 w-7 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </td>
      <td className="p-2 md:p-3">
        <div className="flex items-center gap-2">
          <div className="hidden sm:block h-7 w-7 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </td>
    </tr>
  )
}

export function PurchaseTableBody({
  nodes,
  isInitialLoading,
  showLoadingMorePlaceholders,
  newlyAddedIds,
  onScrollToBottom,
}: PurchaseTableBodyProps) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const previousNodesLengthRef = useRef(nodes.length)

  // Smart auto-scroll: only if user is near bottom
  useEffect(() => {
    if (!scrollContainerRef.current || !onScrollToBottom) return

    const container = scrollContainerRef.current
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100

    if (isNearBottom && nodes.length > previousNodesLengthRef.current) {
      // User is at bottom, scroll to show new items
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        })
      }, 100)
    }

    previousNodesLengthRef.current = nodes.length
  }, [nodes.length, onScrollToBottom])

  return (
    <div
      ref={scrollContainerRef}
      className="relative max-h-[calc(100vh-300px)] overflow-auto u-focus-ring"
    >
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-1/2" />
          <col className="w-1/2" />
        </colgroup>
        <tbody ref={tbodyRef}>
          {isInitialLoading
            ? // Placeholder rows during initial load
              Array.from({ length: 5 }).map((_, index) => (
                <PlaceholderRow key={`initial-${index}`} index={index} />
              ))
            : // Actual purchase rows with highlight animation for new items
              nodes.map((p) => (
                <PurchaseRow
                  key={p.id}
                  p={p}
                  isNewlyAdded={newlyAddedIds.has(p.id)}
                />
              ))}
          {showLoadingMorePlaceholders &&
            // Placeholder rows while loading more
            Array.from({ length: 3 }).map((_, index) => (
              <PlaceholderRow key={`loading-${index}`} index={index} />
            ))}
        </tbody>
      </table>
    </div>
  )
}
