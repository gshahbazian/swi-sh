export interface Team {
  name: string
  abbreviation: string
  score: number
}

export interface Game {
  id: string
  homeTeam: Team
  awayTeam: Team
  status: 'upcoming' | 'in-progress' | 'final'
  quarter?: number
  timeRemaining?: string
  startTime?: string
}

const teams = [
  { name: 'Los Angeles Lakers', abbreviation: 'LAL' },
  { name: 'Golden State Warriors', abbreviation: 'GSW' },
  { name: 'Boston Celtics', abbreviation: 'BOS' },
  { name: 'Brooklyn Nets', abbreviation: 'BKN' },
  { name: 'Phoenix Suns', abbreviation: 'PHX' },
  { name: 'Milwaukee Bucks', abbreviation: 'MIL' },
  { name: 'Miami Heat', abbreviation: 'MIA' },
  { name: 'Dallas Mavericks', abbreviation: 'DAL' },
  { name: 'Denver Nuggets', abbreviation: 'DEN' },
  { name: 'Philadelphia 76ers', abbreviation: 'PHI' },
  { name: 'Chicago Bulls', abbreviation: 'CHI' },
  { name: 'Toronto Raptors', abbreviation: 'TOR' },
  { name: 'New York Knicks', abbreviation: 'NYK' },
  { name: 'Atlanta Hawks', abbreviation: 'ATL' },
  { name: 'Memphis Grizzlies', abbreviation: 'MEM' },
  { name: 'Portland Trail Blazers', abbreviation: 'POR' },
]

function getRandomScore(status: Game['status']): number {
  if (status === 'upcoming') return 0
  if (status === 'final') return Math.floor(Math.random() * 40) + 85
  return Math.floor(Math.random() * 30) + 15
}

function getRandomQuarter(): number {
  return Math.floor(Math.random() * 4) + 1
}

function getRandomTimeRemaining(): string {
  const minutes = Math.floor(Math.random() * 12)
  const seconds = Math.floor(Math.random() * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function getRandomStartTime(): string {
  const hours = [7, 8, 9, 10]
  const hour = hours[Math.floor(Math.random() * hours.length)]
  const minutes = Math.random() > 0.5 ? '00' : '30'
  return `${hour}:${minutes} PM`
}

export function generateMockGames(count: number = 10): Game[] {
  const games: Game[] = []
  const usedTeams = new Set<string>()

  for (let i = 0; i < count && usedTeams.size < teams.length - 1; i++) {
    let homeTeam: (typeof teams)[0] | undefined
    let awayTeam: (typeof teams)[0] | undefined

    do {
      homeTeam = teams[Math.floor(Math.random() * teams.length)]
    } while (!homeTeam || usedTeams.has(homeTeam.abbreviation))
    usedTeams.add(homeTeam.abbreviation)

    do {
      awayTeam = teams[Math.floor(Math.random() * teams.length)]
    } while (!awayTeam || usedTeams.has(awayTeam.abbreviation))
    usedTeams.add(awayTeam.abbreviation)

    const statusRandom = Math.random()
    let status: Game['status']
    if (statusRandom < 0.3) {
      status = 'upcoming'
    } else if (statusRandom < 0.6) {
      status = 'in-progress'
    } else {
      status = 'final'
    }

    const game: Game = {
      id: `game-${i + 1}`,
      homeTeam: {
        name: homeTeam.name,
        abbreviation: homeTeam.abbreviation,
        score: getRandomScore(status),
      },
      awayTeam: {
        name: awayTeam.name,
        abbreviation: awayTeam.abbreviation,
        score: getRandomScore(status),
      },
      status,
    }

    if (status === 'in-progress') {
      game.quarter = getRandomQuarter()
      game.timeRemaining = getRandomTimeRemaining()
    } else if (status === 'upcoming') {
      game.startTime = getRandomStartTime()
    }

    games.push(game)
  }

  return games
}

export function updateGameScores(games: Game[]): Game[] {
  return games.map((game) => {
    if (game.status !== 'in-progress') return game

    const scoreChange = Math.random() > 0.7
    const updatedGame = { ...game }

    if (scoreChange) {
      if (Math.random() > 0.5) {
        updatedGame.homeTeam = {
          ...game.homeTeam,
          score: game.homeTeam.score + (Math.random() > 0.5 ? 2 : 3),
        }
      } else {
        updatedGame.awayTeam = {
          ...game.awayTeam,
          score: game.awayTeam.score + (Math.random() > 0.5 ? 2 : 3),
        }
      }
    }

    const timeRemaining = game.timeRemaining || '12:00'
    const timeParts = timeRemaining.split(':').map(Number)
    const minutes = timeParts[0] || 12
    const seconds = timeParts[1] || 0
    let newSeconds = seconds - 1
    let newMinutes = minutes

    if (newSeconds < 0) {
      newSeconds = 59
      newMinutes -= 1
    }

    if (newMinutes < 0) {
      if (game.quarter && game.quarter < 4) {
        updatedGame.quarter = game.quarter + 1
        updatedGame.timeRemaining = '12:00'
      } else {
        updatedGame.status = 'final'
        delete updatedGame.quarter
        delete updatedGame.timeRemaining
      }
    } else {
      updatedGame.timeRemaining = `${newMinutes}:${newSeconds
        .toString()
        .padStart(2, '0')}`
    }

    return updatedGame
  })
}
