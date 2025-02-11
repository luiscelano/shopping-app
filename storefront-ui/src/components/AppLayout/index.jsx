import React from 'react'
import * as styles from './styles'
import { Outlet } from 'react-router-dom'
import NavigationBar from 'src/components/NavigationBar'

const AppLayout = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <styles.LayoutContainer>
        <Outlet />
      </styles.LayoutContainer>
    </React.Fragment>
  )
}

export default AppLayout
