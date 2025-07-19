import React from 'react'
import { Box, useStdout } from 'ink'
import ScoreCard from './score-card'
import { Game } from '../service/mock-data'

export default function ScoreGrid({
  games,
  selectedIndex,
}: {
  games: Game[]
  selectedIndex: number
}) {
  const { stdout } = useStdout()
  const terminalWidth = stdout.columns || 80

  const cardMinWidth = 22
  const cardSpacing = 2
  const padding = 2

  const availableWidth = terminalWidth - padding * 2
  const columnsCount = Math.max(
    1,
    Math.floor(availableWidth / (cardMinWidth + cardSpacing))
  )

  const rows: Game[][] = []
  for (let i = 0; i < games.length; i += columnsCount) {
    rows.push(games.slice(i, i + columnsCount))
  }

  return (
    <Box flexDirection="column" paddingX={1}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} marginBottom={1} gap={1}>
          {row.map((game, colIndex) => {
            const gameIndex = rowIndex * columnsCount + colIndex
            const isSelected = gameIndex === selectedIndex

            return (
              <Box key={game.id} marginRight={1}>
                <ScoreCard game={game} isSelected={isSelected} />
              </Box>
            )
          })}
        </Box>
      ))}
    </Box>
  )
}
