import { Header } from '../../components'
import Cards from '../../components/Cards/Cards'
import Record from '../../components/Record/Record'
import { useAuth, useDataTransactions } from '../../hooks'

const Dashboard = () => {
  const { user } = useAuth()
  const { balance, transactions } = useDataTransactions()
  const displayName = user?.attributes?.first_name

  return (
    <>
      <div>
        <Header name={displayName} />
        <div className="mt-24">
          <Cards cards={balance} />
        </div>
        <Record transactions={transactions} />
      </div>
    </>
  )
}

export default Dashboard
