import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryProvider } from './lib/react-query/QueryProvider'
import { AuthProvider } from './contexts/AuthProvider'
import { TooltipProvider } from './components/ui/tooltip'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <App />            
          </TooltipProvider>
        </AuthProvider>       
      </QueryProvider>
    </Router>   
  </StrictMode>,
)
