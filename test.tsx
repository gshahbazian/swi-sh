import React from 'react'
import test from 'ava'
import { render } from 'ink-testing-library'
import App from './src/app'

test('app renders without crashing', (t) => {
  const { lastFrame, unmount } = render(<App refreshInterval={0} />)
  t.truthy(lastFrame())
  unmount()
})
