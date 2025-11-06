// Utility functions for processing and displaying resonator talents

export const ATTRIBUTE_COLORS: Record<string, string> = {
  'Electro': 'text-purple-400',
  'Fusion': 'text-orange-400',
  'Glacio': 'text-cyan-400',
  'Aero': 'text-emerald-400',
  'Havoc': 'text-fuchsia-400',
  'Spectro': 'text-yellow-400',
}

/**
 * Colorizes numbers with units (e.g., "5s", "2.5%", "100") in text
 * @param text - The text to process
 * @param prefix - Optional prefix for generating unique keys
 * @returns An array of React elements and strings with colorized numbers
 */
export function colorizeNumbers(text: string, prefix: string = '') {
  // Match numbers with optional decimals and optional units (%, s)
  const numberPattern = /\b\d+(?:\.\d+)?(?:%|s)?/g

  const matches = Array.from(text.matchAll(numberPattern))

  if (matches.length === 0) {
    return [text]
  }

  const result = []
  let lastIndex = 0

  matches.forEach((match, idx) => {
    const fullMatch = match[0]
    const matchIndex = match.index!

    // Add text before this match
    if (matchIndex > lastIndex) {
      result.push(text.substring(lastIndex, matchIndex))
    }

    // Add the colored number
    result.push(
      <span key={`${prefix}num-${idx}`} className="text-rarity-5 font-semibold">
        {fullMatch}
      </span>
    )

    lastIndex = matchIndex + fullMatch.length
  })

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex))
  }

  return result
}

/**
 * Colorizes attribute names (e.g., "Electro", "Fusion DMG") in text
 * @param text - The text to process
 * @returns An array of React elements and strings with colorized attributes
 */
export function colorizeAttributes(text: string) {
  // Match attribute names optionally followed by " DMG"
  const attributePattern = new RegExp(`\\b(${Object.keys(ATTRIBUTE_COLORS).join('|')})(\\s+DMG)?\\b`, 'g')

  // Use matchAll to get all matches with their positions
  const matches = Array.from(text.matchAll(attributePattern))

  if (matches.length === 0) {
    return text
  }

  const result = []
  let lastIndex = 0

  matches.forEach((match, idx) => {
    const fullMatch = match[0] // e.g., "Electro DMG" or "Electro"
    const attribute = match[1] // e.g., "Electro"
    const matchIndex = match.index!

    // Add text before this match
    if (matchIndex > lastIndex) {
      result.push(text.substring(lastIndex, matchIndex))
    }

    // Add the colored attribute
    result.push(
      <span key={idx} className={`font-semibold ${ATTRIBUTE_COLORS[attribute]}`}>
        {fullMatch}
      </span>
    )

    lastIndex = matchIndex + fullMatch.length
  })

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex))
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
  const withAttributes = colorizeAttributes(text)

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
 * @param description - The talent description text (supports markdown-style **bold** and multiple paragraphs)
 * @returns JSX element with formatted description
 */
export function renderDescription(description?: string) {
  if (!description) {
    return <p className="text-muted-foreground italic">Description coming soon...</p>
  }

  const paragraphs = description.split('\n\n')

  return (
    <>
      {paragraphs.map((paragraph, index) => {
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
