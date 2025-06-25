import { memo } from 'react'
import { AppLayoutProps } from './AppLayout.type'

const AppLayout = memo<AppLayoutProps>(({ children }) => {
  return <>{children}</>
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
