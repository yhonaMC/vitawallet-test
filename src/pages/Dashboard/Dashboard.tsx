import { Header, Cards, Record } from '@/components'
import { useAuth, useDataTransactions } from '@/hooks'

const Dashboard = () => {
  const { user } = useAuth()
  const { balance, transactions, isLoading } = useDataTransactions()
  const displayName = user?.attributes?.first_name

  return (
    <>
      <div>
        <Header name={displayName} />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-200"></div>
          </div>
        ) : (
          <>
            <div className="mt-24">
              <Cards cards={balance} />
            </div>
            <Record transactions={transactions} />
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
