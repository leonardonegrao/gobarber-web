import React from 'react'
import {
  RouteProps as ReactRouterProps,
  Route as ReactRouterRoute,
  Redirect
} from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { user } = useAuth()

  return (
    <ReactRouterRoute
      {...rest}
      render={({ location }) => {
        // eslint-disable-next-line multiline-ternary
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

export default Route
