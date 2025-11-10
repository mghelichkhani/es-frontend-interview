import { Page } from '@playwright/test'

/**
 * Helper function to get the count of data rows in the purchases table
 */
export async function getPurchaseRowCount(page: Page): Promise<number> {
  const table = page.getByRole('table')
  // Get rows that have cells (exclude header row)
  const rows = table.getByRole('row').filter({ has: page.getByRole('cell') })
  return rows.count()
}
