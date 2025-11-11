'use client'

import { useState } from 'react'

import Image from 'next/image'

import type { PurchaseNode } from './hooks/usePurchases'
export type PurchaseRowProps = {
  p: PurchaseNode
  isNewlyAdded?: boolean
}

export default function PurchaseRow({
  p,
  isNewlyAdded = false,
}: PurchaseRowProps) {
  const [productImageError, setProductImageError] = useState(false)
  const [userImageError, setUserImageError] = useState(false)

  return (
    <tr
      className={`border-b border-border-subtle last:border-b-0 transition-colors ${
        isNewlyAdded ? 'animate-highlight' : ''
      }`}
    >
      <td className="p-2 md:p-3">
        <div className="flex items-center gap-2">
          {p.product.imageUrl && !productImageError ? (
            <Image
              src={p.product.imageUrl}
              alt={p.product.name}
              width={28}
              height={28}
              className="hidden sm:block rounded object-cover"
              unoptimized
              onError={() => setProductImageError(true)}
            />
          ) : (
            <div
              className="hidden sm:block h-7 w-7 rounded bg-gray-200"
              aria-hidden="true"
            />
          )}
          <span className="text-sm font-medium md:text-base">
            {p.product.name}
          </span>
        </div>
      </td>
      <td className="p-2 md:p-3">
        <div className="flex items-center gap-2">
          {p.user.profilePictureUrl && !userImageError ? (
            <Image
              src={p.user.profilePictureUrl}
              alt={`${p.user.firstName} ${p.user.lastName}`}
              width={28}
              height={28}
              className="hidden sm:block rounded-full object-cover"
              unoptimized
              onError={() => setUserImageError(true)}
            />
          ) : (
            <div
              className="hidden sm:block h-7 w-7 rounded-full bg-gray-200"
              aria-hidden="true"
            />
          )}
          <span className="text-sm md:text-base">
            {p.user.firstName} {p.user.lastName}
          </span>
        </div>
      </td>
    </tr>
  )
}
