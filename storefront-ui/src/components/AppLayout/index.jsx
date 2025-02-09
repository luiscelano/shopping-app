import React from 'react'
import * as styles from './styles'
import { Outlet } from 'react-router-dom'
import NavigationBarV2 from 'src/components/NavigationBar/v2'

const AppLayout = () => {
  return (
    <React.Fragment>
      <NavigationBarV2 />
      <styles.LayoutContainer>
        <Outlet />
      </styles.LayoutContainer>
    </React.Fragment>
  )
}

export default AppLayout
