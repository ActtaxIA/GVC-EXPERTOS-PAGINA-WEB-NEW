'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
}

export function Accordion({
  items,
  className,
  allowMultiple = false,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('divide-y divide-gray-200', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between w-full text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg font-semibold text-charcoal group-hover:text-gold transition-colors pr-4">
                {item.title}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              )}
            >
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
