import React from 'react'
import SearchesBox from './searchesBox'
import UsersList from './usersList'

class App extends React.Component {
  render() {
    return (
        <div className='search'>
          <h1>User Search Page</h1>
          <SearchesBox/>
          <UsersList/>
        </div>
      )
  }
}

export default App
