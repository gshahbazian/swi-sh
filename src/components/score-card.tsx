import React from 'react'
import { Box, Text } from 'ink'
import { Game } from '../mock-data'

interface ScoreCardProps {
  game: Game
  isSelected: boolean
}

export default function ScoreCard({ game, isSelected }: ScoreCardProps) {
  const getStatusColor = () => {
    switch (game.status) {
      case 'in-progress':
        return 'green'
      case 'upcoming':
        return 'yellow'
      case 'final':
        return 'gray'
      default:
        return 'white'
    }
  }

  const getStatusText = () => {
    switch (game.status) {
      case 'in-progress':
        return `Q${game.quarter} ${game.timeRemaining}`
      case 'upcoming':
        return game.startTime
      case 'final':
        return 'FINAL'
      default:
        return ''
    }
  }

  const isWinning = (teamScore: number, opponentScore: number) => {
    return game.status !== 'upcoming' && teamScore > opponentScore
  }

  return (
    <Box
      borderStyle={isSelected ? 'double' : 'round'}
      borderColor={isSelected ? 'cyan' : getStatusColor()}
      paddingX={1}
      flexDirection="column"
      minWidth={20}
    >
      <Box justifyContent="center">
        <Text color={getStatusColor()} bold>
          {getStatusText()}
        </Text>
      </Box>

      <Box marginTop={1} flexDirection="column" gap={1}>
        <Box justifyContent="space-between">
          <Text bold={isWinning(game.awayTeam.score, game.homeTeam.score)}>
            {game.awayTeam.abbreviation}
          </Text>
          <Text bold={isWinning(game.awayTeam.score, game.homeTeam.score)}>
            {game.awayTeam.score}
          </Text>
        </Box>

        <Box justifyContent="space-between">
          <Text bold={isWinning(game.homeTeam.score, game.awayTeam.score)}>
            {game.homeTeam.abbreviation}
          </Text>
          <Text bold={isWinning(game.homeTeam.score, game.awayTeam.score)}>
            {game.homeTeam.score}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
