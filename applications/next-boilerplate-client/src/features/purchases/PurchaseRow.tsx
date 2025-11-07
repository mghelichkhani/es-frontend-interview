'use client'
import type { PurchaseNode } from './hooks/usePurchases'

export type PurchaseRowProps = {
  p: PurchaseNode
}

export default function PurchaseRow({ p }: PurchaseRowProps) {
  return (
    <tr className="border-t">
      <td className="p-2 md:p-3">
        <div className="flex items-center gap-2">
          {p.product.imageUrl && (
            <img src={p.product.imageUrl} alt="" className="hidden sm:block h-7 w-7 rounded object-cover" />
          )}
          <span className="text-sm font-medium md:text-base">{p.product.name}</span>
        </div>
      </td>
      <td className="p-2 md:p-3">
        <div className="flex items-center gap-2">
          {p.user.profilePictureUrl && (
            <img src={p.user.profilePictureUrl} alt="" className="hidden sm:block h-7 w-7 rounded-full object-cover" />
          )}
          <span className="text-sm md:text-base">{p.user.firstName} {p.user.lastName}</span>
        </div>
      </td>
    </tr>
  )
}
