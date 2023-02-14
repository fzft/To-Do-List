import { TodoListProvider } from '@/context/TodolistApp'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <TodoListProvider>
    <div>
      <Component {...pageProps} />
    </div>
    </TodoListProvider>
  )
}
