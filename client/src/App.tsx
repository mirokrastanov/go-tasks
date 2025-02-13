import { Container, Stack } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

export const BACKEND_URL = import.meta.env.VITE_BE_URL; //client folder .env

function App() {

  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  )
}

export default App
