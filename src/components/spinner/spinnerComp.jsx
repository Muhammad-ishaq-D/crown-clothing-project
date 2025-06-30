import React from 'react'
import { SpinnerContainer, SpinnerOverlay } from './spinnerStyles'

export default function Spinner() {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  )
}
