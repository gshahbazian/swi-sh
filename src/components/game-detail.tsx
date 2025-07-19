import React from 'react'
import { Box, Text } from 'ink'
import { Game } from '../service/mock-data'

export default function GameDetail({ game }: { game: Game }) {
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
        return `Quarter ${game.quarter} - ${game.timeRemaining} remaining`
      case 'upcoming':
        return `Game starts at ${game.startTime}`
      case 'final':
        return 'Game Final'
      default:
        return ''
    }
  }

  const getScoreDifference = () => {
    if (game.status === 'upcoming') return null

    const diff = Math.abs(game.homeTeam.score - game.awayTeam.score)
    const leader =
      game.homeTeam.score > game.awayTeam.score
        ? game.homeTeam.abbreviation
        : game.awayTeam.abbreviation

    return diff === 0 ? 'Tied' : `${leader} leads by ${diff}`
  }

  const isWinning = (teamScore: number, opponentScore: number) => {
    return game.status !== 'upcoming' && teamScore > opponentScore
  }

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box justifyContent="center" marginBottom={2}>
        <Text bold color="cyan">
          🏀 Game Details 🏀
        </Text>
      </Box>

      <Box
        borderStyle="double"
        borderColor="cyan"
        paddingX={2}
        paddingY={1}
        flexDirection="column"
        alignItems="center"
      >
        <Box marginBottom={1}>
          <Text color={getStatusColor()} bold>
            {getStatusText()}
          </Text>
        </Box>

        <Box flexDirection="column" alignItems="center" gap={1}>
          <Box flexDirection="row" alignItems="center" gap={4}>
            <Box flexDirection="column" alignItems="center" minWidth={15}>
              <Text
                bold={isWinning(game.awayTeam.score, game.homeTeam.score)}
                color={
                  isWinning(game.awayTeam.score, game.homeTeam.score)
                    ? 'green'
                    : 'white'
                }
              >
                {game.awayTeam.name}
              </Text>
              <Text
                bold={isWinning(game.awayTeam.score, game.homeTeam.score)}
                color={
                  isWinning(game.awayTeam.score, game.homeTeam.score)
                    ? 'green'
                    : 'white'
                }
              >
                ({game.awayTeam.abbreviation})
              </Text>
            </Box>

            <Box flexDirection="column" alignItems="center" minWidth={8}>
              <Text
                bold
                color={
                  isWinning(game.awayTeam.score, game.homeTeam.score)
                    ? 'green'
                    : 'white'
                }
              >
                {game.awayTeam.score}
              </Text>
            </Box>

            <Box flexDirection="column" alignItems="center" minWidth={4}>
              <Text bold color="gray">
                VS
              </Text>
            </Box>

            <Box flexDirection="column" alignItems="center" minWidth={8}>
              <Text
                bold
                color={
                  isWinning(game.homeTeam.score, game.awayTeam.score)
                    ? 'green'
                    : 'white'
                }
              >
                {game.homeTeam.score}
              </Text>
            </Box>

            <Box flexDirection="column" alignItems="center" minWidth={15}>
              <Text
                bold={isWinning(game.homeTeam.score, game.awayTeam.score)}
                color={
                  isWinning(game.homeTeam.score, game.awayTeam.score)
                    ? 'green'
                    : 'white'
                }
              >
                {game.homeTeam.name}
              </Text>
              <Text
                bold={isWinning(game.homeTeam.score, game.awayTeam.score)}
                color={
                  isWinning(game.homeTeam.score, game.awayTeam.score)
                    ? 'green'
                    : 'white'
                }
              >
                ({game.homeTeam.abbreviation})
              </Text>
            </Box>
          </Box>

          {getScoreDifference() && (
            <Box marginTop={1}>
              <Text color="yellow" bold>
                {getScoreDifference()}
              </Text>
            </Box>
          )}
        </Box>

        {game.status === 'in-progress' && (
          <Box marginTop={2} flexDirection="column" alignItems="center">
            <Text color="gray">Game Statistics</Text>
            <Box marginTop={1} flexDirection="row" gap={4}>
              <Text>Quarter: {game.quarter}/4</Text>
              <Text>Time: {game.timeRemaining}</Text>
            </Box>
          </Box>
        )}

        {game.status === 'upcoming' && (
          <Box marginTop={2} flexDirection="column" alignItems="center">
            <Text color="gray">Game Preview</Text>
            <Box marginTop={1}>
              <Text>Tip-off: {game.startTime}</Text>
            </Box>
          </Box>
        )}

        {game.status === 'final' && (
          <Box marginTop={2} flexDirection="column" alignItems="center">
            <Text color="gray">Final Score</Text>
            <Box marginTop={1}>
              <Text>Game completed</Text>
            </Box>
          </Box>
        )}
      </Box>

      <Box justifyContent="center" marginTop={2}>
        <Text color="gray">Press ESC or Q to go back to the scoreboard</Text>
      </Box>
    </Box>
  )
}
