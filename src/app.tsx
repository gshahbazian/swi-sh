import React, { useState, useEffect } from 'react'
import { Box, Text, useInput, useStdout } from 'ink'
import ScoreGrid from './components/score-grid'
import GameDetail from './components/game-detail'
import { Game, generateMockGames, updateGameScores } from './mock-data'
import { BBallSpinner } from './components/bball-spinner'

export default function App({
  refreshInterval = 1000,
}: {
  refreshInterval?: number
}) {
  const [initialGames, setInitialGames] = useState<Game[]>([])

  useEffect(() => {
    const fetchInitialGames = async () => {
      const games = await generateMockGames(10)
      setInitialGames(games)
    }

    fetchInitialGames()
  }, [])

  if (initialGames.length === 0) {
    return <BBallSpinner />
  }

  return (
    <GamesApp refreshInterval={refreshInterval} initialGames={initialGames} />
  )
}

function GamesApp({
  refreshInterval,
  initialGames,
}: {
  refreshInterval?: number
  initialGames: Game[]
}) {
  const [games, setGames] = useState(initialGames)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showDetail, setShowDetail] = useState(false)
  const { stdout } = useStdout()

  // Calculate columns count same way as ScoreGrid
  const terminalWidth = stdout.columns || 80
  const cardMinWidth = 22
  const cardSpacing = 2
  const padding = 2
  const availableWidth = terminalWidth - padding * 2
  const columnsCount = Math.max(
    1,
    Math.floor(availableWidth / (cardMinWidth + cardSpacing))
  )

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const updateScores = async () => {
      try {
        const updatedGames = await updateGameScores(games)
        setGames(updatedGames)
      } finally {
        timeoutId = setTimeout(updateScores, refreshInterval)
      }
    }

    timeoutId = setTimeout(updateScores, refreshInterval)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [refreshInterval, games])

  // Only enable keyboard input if stdin is a TTY (not when piping) and not in test environment
  if (process.stdin.isTTY && process.env.NODE_ENV !== 'test') {
    useInput((input, key) => {
      if (showDetail) {
        // In detail view, only handle back navigation
        if (key.escape || input.toLowerCase() === 'q') {
          setShowDetail(false)
        }
        return
      }

      // In grid view, handle navigation and selection
      if (key.leftArrow) {
        setSelectedIndex((prev) => Math.max(0, prev - 1))
        return
      }

      if (key.rightArrow) {
        setSelectedIndex((prev) => Math.min(games.length - 1, prev + 1))
        return
      }

      if (key.upArrow) {
        setSelectedIndex((prev) => {
          const newIndex = prev - columnsCount
          return newIndex >= 0 ? newIndex : prev
        })
        return
      }

      if (key.downArrow) {
        setSelectedIndex((prev) => {
          const newIndex = prev + columnsCount
          return newIndex < games.length ? newIndex : prev
        })
        return
      }

      if (key.return) {
        setShowDetail(true)
        return
      }

      if (input.toLowerCase() === 'q') {
        process.exit(0)
      }
    })
  }

  if (showDetail && games[selectedIndex]) {
    return <GameDetail game={games[selectedIndex]} />
  }

  return (
    <Box flexDirection="column">
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="cyan">
          🏀 Live Basketball Scores 🏀
        </Text>
      </Box>

      <ScoreGrid games={games} selectedIndex={selectedIndex} />

      {process.stdin.isTTY && (
        <Box justifyContent="center" marginTop={1}>
          <Text color="gray">
            Use arrow keys to navigate • Press ENTER for details • Press Q to
            quit
          </Text>
        </Box>
      )}
    </Box>
  )
}
