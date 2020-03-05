import React, { useState, useContext } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Web3Status } from './Web3Status'
import { Web3Context } from './WithWeb3Context'
import { ContractsDataContext } from './ContractsDataContextProvider'
import AddressShortcut from './AddressShortcut'
import { NetworkStatus } from './NetworkStatus'

export const SideMenuContext = React.createContext({})

export const SideMenuProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SideMenuContext.Provider value={{ isOpen, toggle }}>
      {props.children}
    </SideMenuContext.Provider>
  )
}

export const SideMenu = (props) => {
  const { isOpen } = useContext(SideMenuContext)
  const { yourAddress } = useContext(Web3Context)
  const { isTokenHolder, isKeepTokenContractDeployer } = useContext(ContractsDataContext)

  return (
    <nav className={`${ isOpen ? 'active ' : '' }side-menu`}>
      <ul>
        <NavLink exact to="/tokens" label='TOKENS'/>
        <NavLink exact to="/rewards" label='REWARDS'/>
        <NavLink exact to="/operations" label='OPERATIONS'/>
        <NavLink exact to="/authorizer" label='authorizer'/>

        { isTokenHolder &&
            <>
                <NavLink exact to="/stake" label='STAKE'/>
                <NavLink exact to="/token-grants" label='TOKE GRANTS'/>
            </>
        }
        { isKeepTokenContractDeployer && <NavLink exact to="/create-token-grants" label='CREATE TOKEN GRANTS'/> }
        <Web3Status />
        <div className='account-address'>
          <span className="text-label text-bold">ADDRESS&nbsp;</span>
          <AddressShortcut classNames="text-small" address={yourAddress} />
          <NetworkStatus />
        </div>
      </ul>
    </nav>
  )
}

const NavLink = ({ label, to, exact }) => {
  const match = useRouteMatch({
    path: to,
    exact,
  })

  return (
    <Link to={to}>
      <li className={ match ? 'active-page-link' : '' }>
        {label}
      </li>
    </Link>
  )
}
