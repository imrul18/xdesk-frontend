// ** React Imports
import { lazy } from 'react'

const List = lazy(() => import('./list'))
const Add = lazy(() => import('./add'))
const Edit = lazy(() => import('./edit'))

const Route = [  
  {
    element: <List />,
    path: '/user'
  },
  {
    element: <Add />,
    path: '/user_add'
  },
  {
    element: <Edit />,
    path: '/user_edit/:id'
  }
]

export default Route