
import { Suspense } from 'react'
import '@/Globals.css'
import Loading from '@/ui/Loading'
import { useRoutes } from 'react-router-dom';
import { routes } from '@routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {

  const element = useRoutes(routes);

  return (
    <main>
      <Suspense fallback={<Loading />}>
         {element}
      </Suspense>
      <Toaster />
    </main>
  )
}

export default App
