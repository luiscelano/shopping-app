import React from 'react'
import * as styles from './styles'
import { BeatLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <>
      <styles.SpinnerContainer>
        <BeatLoader color={'#00377B'} />
      </styles.SpinnerContainer>
    </>
  )
}

export default Spinner
