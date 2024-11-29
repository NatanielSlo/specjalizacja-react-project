import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PollDetails from './polldetails.jsx'

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      children: [
          {
              path: "polls/:id",
              element: <PollDetails />,
          },
      ],
  },
  {
      path: "/home",
      element: <App />,
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
