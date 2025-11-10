import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import MultiSelect from './MultiSelect'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'multiSelect.defaultLabel': 'Select items',
      'common.search.placeholder': 'Search...',
      'common.apply': 'Apply',
      'common.cancel': 'Cancel',
      'common.selectAll': 'Select all',
      'common.deselectAll': 'Deselect all',
      'common.clearSearch': 'Clear search',
      'common.noResults': 'No results',
      'multiSelect.selectItem': 'Select {label}',
    }
    return translations[key] || key
  },
}))

const mockOptions = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
]

describe('MultiSelect', () => {
  const mockOnChange = vi.fn()
  const mockOnSearchTermChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default label', () => {
    render(
      <MultiSelect value={[]} onChange={mockOnChange} options={mockOptions} />,
    )

    expect(screen.getByText('Select items')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(
      <MultiSelect
        label="Custom Label"
        value={[]}
        onChange={mockOnChange}
        options={mockOptions}
      />,
    )

    expect(screen.getByText('Custom Label')).toBeInTheDocument()
  })

  it('opens popover when trigger button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect value={[]} onChange={mockOnChange} options={mockOptions} />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
  })

  it('displays list of queried items when opened', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect value={[]} onChange={mockOnChange} options={mockOptions} />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
      expect(screen.getByText('Option 3')).toBeInTheDocument()
    })
  })

  it('filters items when searching', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        value={[]}
        onChange={mockOnChange}
        options={mockOptions}
        onSearchTermChange={mockOnSearchTermChange}
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument()
    })

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Option 1')

    await waitFor(
      () => {
        expect(mockOnSearchTermChange).toHaveBeenCalled()
      },
      { timeout: 2000 },
    )
  })

  it('selects all items when "Select all" is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect value={[]} onChange={mockOnChange} options={mockOptions} />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(
        screen.getByRole('checkbox', { name: /select all/i }),
      ).toBeInTheDocument()
    })

    const selectAllButton = screen.getByRole('checkbox', {
      name: /select all/i,
    })
    await user.click(selectAllButton)

    // Click apply to confirm selection
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument()
    })
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['1', '2', '3'])
    })
  })

  it('deselects all items when "Select all" is clicked and all are selected', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        value={['1', '2', '3']}
        onChange={mockOnChange}
        options={mockOptions}
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(
        screen.getByRole('checkbox', { name: /select all/i }),
      ).toBeInTheDocument()
    })

    const selectAllButton = screen.getByRole('checkbox', {
      name: /select all/i,
    })
    await user.click(selectAllButton)

    // Click apply to confirm selection
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument()
    })
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([])
    })
  })

  it('selects individual item when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect value={[]} onChange={mockOnChange} options={mockOptions} />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    // Click on the label text to select the checkbox
    const option1Label = screen.getByText('Option 1').closest('label')
    expect(option1Label).toBeInTheDocument()
    await user.click(option1Label!)

    // Click apply to confirm selection
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument()
    })
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['1'])
    })
  })

  it('deselects individual item when clicked and already selected', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        value={['1']}
        onChange={mockOnChange}
        options={mockOptions}
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    // Click on the label text to select the checkbox
    const option1Label = screen.getByText('Option 1').closest('label')
    expect(option1Label).toBeInTheDocument()
    await user.click(option1Label!)

    // Click apply to confirm selection
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument()
    })
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([])
    })
  })

  it('reverts changes when cancel button is clicked', async () => {
    const user = userEvent.setup()
    const initialValue = ['1']
    render(
      <MultiSelect
        value={initialValue}
        onChange={mockOnChange}
        options={mockOptions}
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    // Select option 2
    const option2Label = screen.getByText('Option 2').closest('label')
    expect(option2Label).toBeInTheDocument()
    await user.click(option2Label!)

    // Click cancel
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    // onChange should not be called with the new selection
    expect(mockOnChange).not.toHaveBeenCalledWith(['1', '2'])
  })

  it('applies changes when apply button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        value={['1']}
        onChange={mockOnChange}
        options={mockOptions}
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    // Select option 2
    const option2Label = screen.getByText('Option 2').closest('label')
    expect(option2Label).toBeInTheDocument()
    await user.click(option2Label!)

    // Click apply
    const applyButton = screen.getByRole('button', { name: /apply/i })
    await user.click(applyButton)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['1', '2'])
    })
  })

  it('shows loading spinner when isLoading is true', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        value={[]}
        onChange={mockOnChange}
        options={mockOptions}
        isLoading={true}
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
  })

  it('displays error message when error is provided', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        value={[]}
        onChange={mockOnChange}
        options={mockOptions}
        error="Something went wrong"
      />,
    )

    const triggerButton = screen.getByRole('button', { name: /select items/i })
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })
})
