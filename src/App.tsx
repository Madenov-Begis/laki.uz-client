import { router } from './shared/routes/router'
import { Container } from './shared/ui/container/container'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <main className="relative max-w-[600px] mx-auto h-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 pointer-events-none"></div>
      <Container>
        <div className="relative z-10">
          <RouterProvider router={router} />
        </div>
      </Container>
    </main>
  )
}

export default App
