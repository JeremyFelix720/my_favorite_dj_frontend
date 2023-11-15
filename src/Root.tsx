
// On met les routes ici.

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//import { BrowserRouter } from 'react-router-dom'

import Connexion from './components/Connexion'
import Home from './components/Home'
import Add from './components/Add'
import Modification from './components/Modification'

export default function App() {
  //const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Connexion />,
    },
    {
        path: "/connexion",
        element: <Connexion />,
      },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/add",
        element: <Add />,
    },
    {
      path: "/modification",
      element: <Modification />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}