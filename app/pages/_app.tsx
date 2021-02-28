import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
} from 'blitz'
import App from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'
import { queryCache } from 'react-query'
import { getSessionContext } from '@blitzjs/server'

import LoginForm from 'app/auth/components/LoginForm'

import 'app/core/styles/index.css'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { Suspense } from 'react'

const AuthView = ({ children }) => {
  const currentUser = useCurrentUser()

  return !currentUser ? <LoginForm /> : children
}

function AppPage({ Component, pageProps, ...props }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      {/* <Suspense fallback="Loading...">
        <AuthView>{getLayout(<Component {...pageProps} />)}</AuthView>
      </Suspense> */}
      {getLayout(<Component {...pageProps} />)}
      {/* <Suspense fallback="Loading...">
      </Suspense> */}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

export default AppPage
