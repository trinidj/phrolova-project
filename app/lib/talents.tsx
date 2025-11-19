// Utility functions for processing and displaying resonator talents
import React from 'react'
import { getAttributeColor } from '@/lib/utils'
import { ATTRIBUTES } from './constants'

/**
 * Generic utility for applying transformations to pattern matches in text
 * @param text - The text to process
 * @param pattern - The regex pattern to match
 * @param transformer - Function that receives (match, index) and returns a React element
 * @returns An array of React elements and strings, or the original text if no matches
 */
function applyTextTransformation(
  text: string,
  pattern: RegExp,
  transformer: (match: RegExpMatchArray, index: number) => React.ReactElement
): (string | React.ReactElement)[] | string {
  const matches = Array.from(text.matchAll(pattern))

  if (matches.length === 0) {
    return text
  }

  const result: (string | React.ReactElement)[] = []
  let lastIndex = 0

  matches.forEach((match, idx) => {
    const matchIndex = match.index!

    // Add text before this match
    if (matchIndex > lastIndex) {
      result.push(text.substring(lastIndex, matchIndex))
    }

    // Add the transformed element
    result.push(transformer(match, idx))

    lastIndex = matchIndex + match[0].length
  })

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex))
  }

  return result
}

/**
 * Colorizes numbers with units (e.g., "5s", "2.5%", "100") in text
 * @param text - The text to process
 * @param prefix - Optional prefix for generating unique keys
 * @returns An array of React elements and strings with colorized numbers
 */
export function colorizeNumbers(text: string, prefix: string = '') {
  const numberPattern = /\b\d+(?:\.\d+)?(?:%|s)?/g
  const result = applyTextTransformation(text, numberPattern, (match, idx) => (
    <span key={`${prefix}num-${idx}`} className="text-rarity-5 font-semibold">
      {match[0]}
    </span>
  ))
  return Array.isArray(result) ? result : [result]
}

/**
 * Colorizes attribute names (e.g., "Electro", "Fusion DMG", "Aero Erosion") in text
 * Also colorizes negative status effects with their attribute colors
 * @param text - The text to process
 * @returns An array of React elements and strings with colorized attributes
 */
export function colorizeAttributes(text: string, prefix: string = '') {
  const attributeNames = ATTRIBUTES.map(attr => attr.label)
  
  // Map status effects to their attribute names (capitalized)
  const statusEffects: Record<string, string> = {
    'Fusion Burst': 'Fusion',
    'Glacio Chafe': 'Glacio',
    'Aero Erosion': 'Aero',
    'Electro Flare': 'Electro',
    'Spectro Frazzle': 'Spectro',
    'Havoc Bane': 'Havoc'
  }
  
  // First, replace status effects with their colored versions
  let result: (string | React.ReactElement)[] | string = text
  
  Object.entries(statusEffects).forEach(([statusEffect, attributeName]) => {
    const statusPattern = new RegExp(`\\b${statusEffect}(?:\\s+DMG)?\\b`, 'g')
    
    if (Array.isArray(result)) {
      result = result.flatMap((part, partIndex) => {
        if (typeof part === 'string') {
          return applyTextTransformation(part, statusPattern, (match, idx) => (
            <span
              key={`${prefix}status-${attributeName}-${partIndex}-${idx}`}
              className="font-semibold"
              style={{ color: getAttributeColor(attributeName) }}
            >
              {match[0]}
            </span>
          ))
        }
        return part
      })
    } else if (typeof result === 'string') {
      result = applyTextTransformation(result, statusPattern, (match, idx) => (
        <span
          key={`${prefix}status-${attributeName}-${idx}`}
          className="font-semibold"
          style={{ color: getAttributeColor(attributeName) }}
        >
          {match[0]}
        </span>
      ))
    }
  })
  
  // Then handle regular attribute patterns like "Aero DMG", etc.
  const attributePattern = new RegExp(`\\b(${attributeNames.join('|')})(?:\\s+DMG)?\\b`, 'g')
  
  if (Array.isArray(result)) {
    result = result.flatMap((part, partIndex) => {
      if (typeof part === 'string') {
        return applyTextTransformation(part, attributePattern, (match, idx) => (
          <span
            key={`${prefix}attr-${partIndex}-${idx}`}
            className="font-semibold"
            style={{ color: getAttributeColor(match[1]) }}
          >
            {match[0]}
          </span>
        ))
      }
      return part
    })
  } else if (typeof result === 'string') {
    result = applyTextTransformation(result, attributePattern, (match, idx) => (
      <span
        key={`${prefix}attr-${idx}`}
        className="font-semibold"
        style={{ color: getAttributeColor(match[1]) }}
      >
        {match[0]}
      </span>
    ))
  }
  
  return result
}

/**
 * Applies both attribute and number colorization to text
 * @param text - The text to process
 * @param prefix - Optional prefix for generating unique keys
 * @returns An array of React elements and strings with both colorizations applied
 */
export function colorizeText(text: string, prefix: string = '') {
  // First apply attribute colorization
  const withAttributes = colorizeAttributes(text, prefix)

  // If it's still just text, apply number colorization
  if (typeof withAttributes === 'string') {
    return colorizeNumbers(withAttributes, prefix)
  }

  // If we have an array with mixed content, apply number colorization to string parts
  return withAttributes.flatMap((part, idx) => {
    if (typeof part === 'string') {
      return colorizeNumbers(part, `${prefix}attr${idx}-`)
    }
    return part
  })
}

/**
 * Renders talent descriptions with proper formatting and attribute colorization
 * @param description - The talent description text (supports markdown-style **bold**, lists, and multiple paragraphs)
 * @returns JSX element with formatted description
 */
export function renderDescription(description?: string) {
  if (!description) {
    return <p className="text-muted-foreground italic">Description coming soon...</p>
  }

  const paragraphs = description.split('\n\n')

  // Merge consecutive list items (paragraphs starting with -, *, or •)
  const mergedParagraphs: string[] = []
  let currentList: string[] = []

  paragraphs.forEach((paragraph) => {
    const isListItem = paragraph.match(/^[•\-*]\s+/)

    if (isListItem) {
      currentList.push(paragraph)
    } else {
      // If we had accumulated list items, merge them
      if (currentList.length > 0) {
        mergedParagraphs.push(currentList.join('\n'))
        currentList = []
      }
      mergedParagraphs.push(paragraph)
    }
  })

  // Don't forget any remaining list items
  if (currentList.length > 0) {
    mergedParagraphs.push(currentList.join('\n'))
  }

  return (
    <>
      {mergedParagraphs.map((paragraph, index) => {
        // Check if this is a list (lines starting with - or * or numbers)
        const listMatch = paragraph.match(/^[•\-*]\s+/m)
        if (listMatch) {
          // Split into individual list items, filtering out empty lines
          const items = paragraph.split('\n').filter(line => line.trim())
          return (
            <ul key={index} className="list-disc list-inside space-y-1 ml-2">
              {items.map((item, itemIndex) => {
                // Remove the list marker (-, *, or •)
                const cleanItem = item.replace(/^[•\-*]\s+/, '')
                return (
                  <li key={`${index}-${itemIndex}`} className="text-sm sm:text-base">
                    {colorizeText(cleanItem, `p${index}-li${itemIndex}-`)}
                  </li>
                )
              })}
            </ul>
          )
        }

        const isBold = paragraph.startsWith('**') && paragraph.includes('**', 2)

        if (isBold) {
          const match = paragraph.match(/^\*\*(.*?)\*\*(.*)/)
          if (match) {
            const [, boldText, remainingText] = match
            return (
              <div key={index}>
                <strong className="font-semibold text-base text-rarity-5">{boldText}</strong>
                {remainingText && <span>{colorizeText(remainingText, `p${index}-`)}</span>}
              </div>
            )
          }
        }

        return <p key={index}>{colorizeText(paragraph, `p${index}-`)}</p>
      })}
    </>
  )
}
