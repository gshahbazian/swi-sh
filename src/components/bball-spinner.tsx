import React, { useState, useEffect } from 'react'
import { Text } from 'ink'

const frames = [
  '🏀      ',
  '  🏀    ',
  '    🏀  ',
  '      🏀',
  '    🏀  ',
  '  🏀    ',
]

export function BBallSpinner() {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length)
    }, 100) // change frame every 100ms

    return () => clearInterval(timer)
  }, [])

  return <Text>{frames[frameIndex]}</Text>
}
