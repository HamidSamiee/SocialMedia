import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryProvider } from './lib/react-query/QueryProvider'
import { AuthProvider } from './contexts/AuthProvider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryProvider>
        <AuthProvider>
            <App /> 
        </AuthProvider>       
      </QueryProvider>
    </Router>   
  </StrictMode>,
)
