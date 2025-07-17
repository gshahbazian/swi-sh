import React from 'react'
import test from 'ava'
import { render } from 'ink-testing-library'
import App from './source/app'

test('app renders without crashing', (t) => {
  const { lastFrame } = render(<App />)
  t.truthy(lastFrame())
})
