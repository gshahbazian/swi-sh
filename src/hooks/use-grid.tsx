import { useStdout } from 'ink'

export default function useGrid() {
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

  return { columnsCount }
}
