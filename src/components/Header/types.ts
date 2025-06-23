export interface BaseHeaderProps {
  name?: string
  className?: string
}

export interface HeaderStyleProps {
  variant?: 'default' | 'compact'
  showIcon?: boolean
  showLogout?: boolean
}

export interface HeaderProps extends BaseHeaderProps, HeaderStyleProps {}
