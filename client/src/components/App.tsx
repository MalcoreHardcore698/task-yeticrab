import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RouteProps } from '../utils/interfaces'
import { fetchPosts } from '../redux/actions'
import routes from '../routes'
import '../assets/styles/App.css'

export default () => {
  const dispatch: any = useDispatch()

  useEffect(() => {
      dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((props: RouteProps, index: number) =>
            <Route key={index} {...props} />
          )}
        </Switch>
      </Router>
    </div>
  )
}