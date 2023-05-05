import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRefac from './AppRefac'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <QueryClientProvider client={ queryClient }>
      <CssBaseline/>
        <AppRefac/>
    </QueryClientProvider>
  </>
  // </React.StrictMode>,
)
