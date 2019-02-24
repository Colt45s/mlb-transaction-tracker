import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import InfiniteLoader from './infiniteLoader'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    line-height: 1.75;
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  }
`

export default () => (
  <>
    <GlobalStyle />
    <InfiniteLoader />
  </>
)
