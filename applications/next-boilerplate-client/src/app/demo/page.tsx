'use client'

import { useState } from 'react'
import { MultiSelect, type Option } from '@/components/MultiSelect'
import { Button } from '@/components/Button'

const mockItems: Option[] = [
  { id: '1', label: 'Item A' },
  { id: '2', label: 'Item B' },
  { id: '3', label: 'Item C' },
  { id: '4', label: 'Item D' },
  { id: '5', label: 'Item E' },
  { id: '6', label: 'Item F' },
  { id: '7', label: 'Item G' },
  { id: '8', label: 'Item H' },
]

export default function DemoPage() {
  const [selectedItems1, setSelectedItems1] = useState<string[]>([])
  const [selectedItems2, setSelectedItems2] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Simulate server-side filtering
  const filteredItems = searchQuery
    ? mockItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockItems

  return (
      <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Component Demos</h1>

      <div className="space-y-8">
        {/* Button Components */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Button Components</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="tertiary">Tertiary Button</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" disabled>Primary Disabled</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
              <Button variant="tertiary" disabled>Tertiary Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" onClick={() => alert('Primary clicked!')}>
                Click Me (Primary)
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
                Click Me (Secondary)
              </Button>
              <Button variant="tertiary" onClick={() => alert('Tertiary clicked!')}>
                Click Me (Tertiary)
              </Button>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-200" />

        {/* MultiSelect Components */}
        {/* Basic Usage */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Usage</h2>
          <div className="flex items-center gap-4">
            <MultiSelect
              label="Select Items"
              value={selectedItems1}
              onChange={setSelectedItems1}
              options={mockItems}
            />
            <div className="text-sm text-gray-600">
              Selected: {selectedItems1.length > 0 ? selectedItems1.join(', ') : 'None'}
            </div>
          </div>
        </section>

        {/* With Search */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">With Server-Side Search</h2>
          <div className="flex items-center gap-4">
            <MultiSelect
              label="Search Items"
              value={selectedItems2}
              onChange={setSelectedItems2}
              options={filteredItems}
              onSearchTermChange={setSearchQuery}
              placeholder="Type to search..."
            />
            <div className="text-sm text-gray-600">
              Selected: {selectedItems2.length > 0 ? selectedItems2.join(', ') : 'None'}
            </div>
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-500">Searching for: &quot;{searchQuery}&quot;</p>
          )}
        </section>

        {/* With Loading State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">With Loading State</h2>
          <MultiSelect
            label="Loading Items"
            value={[]}
            onChange={() => {}}
            options={[]}
            isLoading={true}
          />
        </section>

        {/* With Error State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">With Error State</h2>
          <MultiSelect
            label="Error Example"
            value={[]}
            onChange={() => {}}
            options={[]}
            error="Failed to load options"
          />
        </section>

        {/* Selected Values Display */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Selected Values</h2>
          <div className="space-y-2 rounded border p-4">
            <div>
              <strong>List 1:</strong>{' '}
              {selectedItems1.length > 0 ? selectedItems1.join(', ') : 'None selected'}
            </div>
            <div>
              <strong>List 2:</strong>{' '}
              {selectedItems2.length > 0 ? selectedItems2.join(', ') : 'None selected'}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

