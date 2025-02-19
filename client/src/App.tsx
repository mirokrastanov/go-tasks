import { Container, Stack } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

export const BACKEND_URL = import.meta.env.MODE === "development"
  ? import.meta.env.VITE_BE_DEV
  : import.meta.env.VITE_BE_PROD;

// console.log(import.meta.env.MODE, import.meta.env.VITE_BE_DEV, import.meta.env.VITE_BE_PROD, BACKEND_URL);


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
