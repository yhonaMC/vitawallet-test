import { memo } from 'react'
import clsx from 'clsx'
import { TransactionRowProps } from './TrasactionRow.type'

const VARIANT_STYLES = {
  default: 'text-black-100 font-semibold text-base',
  highlight: 'text-blue-100 font-semibold text-base'
} as const

const SPACING_STYLES = {
  default: 'mt-1',
  last: 'mt-2'
} as const

export const TransactionRow = memo<TransactionRowProps>(
  ({ label, value, variant = 'default', isLast = false }) => {
    const containerClasses = clsx(
      'flex justify-between',
      isLast ? SPACING_STYLES.last : SPACING_STYLES.default
    )

    const valueClasses = clsx(
      VARIANT_STYLES[variant],
      variant === 'highlight' && 'flex gap-2'
    )

    const labelClasses = 'text-black-100 text-sm font-normal'

    return (
      <div className={containerClasses}>
        <span className={labelClasses}>{label}</span>
        <span className={valueClasses}>{value}</span>
      </div>
    )
  }
)

TransactionRow.displayName = 'TransactionRow'
