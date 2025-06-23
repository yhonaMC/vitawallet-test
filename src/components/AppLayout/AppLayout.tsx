import { memo, type ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = memo<AppLayoutProps>(({ children }) => {
  return <>{children}</>
})

AppLayout.displayName = 'AppLayout'

export default AppLayout
