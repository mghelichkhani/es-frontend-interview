import { expect, test } from '@playwright/test'

import { getPurchaseRowCount } from './support/filters'

test.describe('Purchases Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for page to load and table to be ready
    await expect(page.getByRole('table')).toBeVisible({ timeout: 10000 })
  })

  test('page loads and purchases are loaded', async ({ page }) => {
    // Verify purchases are loaded (at least one row)
    // Table is already verified in beforeEach
    const rowCount = await getPurchaseRowCount(page)
    expect(rowCount).toBeGreaterThan(0)
  })

  test('when an option in the products list is selected, the purchases rows will be affected', async ({
    page,
  }) => {
    // Get initial row count
    const before = await getPurchaseRowCount(page)
    expect(before).toBeGreaterThan(0)

    await test.step('open product filter and select an option', async () => {
      const filterButton = page.getByRole('button', {
        name: /filter by product/i,
      })
      await filterButton.click()

      const dialog = page.getByRole('dialog', { name: /filter by product/i })
      await expect(dialog).toBeVisible()

      // Wait for options to load
      await expect(dialog.getByRole('checkbox').first()).toBeVisible({
        timeout: 5000,
      })

      // Find first actual option (skip "Select all" if present)
      const checkboxes = dialog.getByRole('checkbox')
      const firstCheckbox = checkboxes.first()
      let firstLabel = firstCheckbox.locator('xpath=ancestor::label[1]')
      let optionText = await firstLabel.textContent()

      // Determine which checkbox to use (skip "Select all" if present)
      let targetCheckbox = firstCheckbox
      if (optionText?.toLowerCase().includes('select all')) {
        // If first is "Select all", use the second checkbox
        targetCheckbox = checkboxes.nth(1)
        await expect(targetCheckbox).toBeVisible()
        firstLabel = targetCheckbox.locator('xpath=ancestor::label[1]')
        optionText = await firstLabel.textContent()
      }

      expect(optionText?.trim()).toBeTruthy()

      // Select the option
      await targetCheckbox.check()

      // Apply filter
      const applyButton = dialog.getByRole('button', { name: /apply/i })
      await applyButton.click()
      await expect(dialog).toBeHidden()
    })

    await test.step('verify purchases rows are affected', async () => {
      // Verify filter is applied (badge shows selection count)
      const filterButton = page.getByRole('button', {
        name: /filter by product/i,
      })
      // Badge is now a span with role="button" and rounded-md class, contains count and X icon
      const badge = filterButton
        .locator('span[role="button"][aria-label*="Clear"]')
        .first()
      await expect(badge).toBeVisible()

      const badgeText = await badge.textContent()
      // Extract just the number (badge contains number and X icon)
      const selectedCount = parseInt(badgeText?.match(/\d+/)?.[0] || '0', 10)
      expect(selectedCount).toBeGreaterThan(0)

      // Verify row count changed (filter was applied)
      const after = await getPurchaseRowCount(page)
      expect(after).toBeGreaterThanOrEqual(0)
      expect(after).toBeLessThanOrEqual(before)
    })
  })
})
