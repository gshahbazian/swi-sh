import React from 'react'
import { Box } from 'ink'
import ScoreCard from './score-card'
import { Game } from '../service/mock-data'
import useGrid from '../hooks/use-grid'

export default function ScoreGrid({
  games,
  selectedIndex,
}: {
  games: Game[]
  selectedIndex: number
}) {
  const { columnsCount } = useGrid()

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
