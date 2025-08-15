
import { Suspense } from 'react'
import '@/Globals.css'
import Loading from '@/ui/Loading'
import { useRoutes } from 'react-router-dom';
import { routes } from '@routes/routes';
function App() {

  const element = useRoutes(routes);

  return (
    <Suspense fallback={<Loading />}>
      {element}
    </Suspense>
  )
}

export default App
