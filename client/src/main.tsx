import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'
import theme from './chakra/theme.ts'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
)
