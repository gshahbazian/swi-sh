#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import meow from 'meow'
import App from './app'

const cli = meow(
  `
	Usage
	  $ swi-sh

	Options
		--refresh  Refresh interval in milliseconds (default: 1000)

	Examples
	  $ swi-sh
	  $ swi-sh --refresh=2000
`,
  {
    importMeta: import.meta,
    flags: {
      refresh: {
        type: 'number',
        default: 1000,
      },
    },
  }
)

render(<App refreshInterval={cli.flags.refresh} />)
