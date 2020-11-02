import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Data from './Data'

const getUserCode = () => {
  const existing_code: string | null = window.localStorage.getItem('example_db_app_code')
  if (existing_code) {
    return existing_code
  }
  const new_code: string = String(Math.random() * 10e15)
  window.localStorage.setItem('example_db_app_code', new_code)
  return new_code
}

const App: React.FC<{}> = () => {
  const user_code: string = getUserCode()
  return (
    <div>
      <h1>Example DB App</h1>
      <p>User Code: {user_code}</p>
      <Data fetch={window.fetch.bind(window)} userCode={user_code} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
