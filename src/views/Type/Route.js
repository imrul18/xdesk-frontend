// ** React Imports
import { lazy } from 'react'

const List = lazy(() => import('./list'))
const Add = lazy(() => import('./add'))
// const Edit = lazy(() => import('./edit'))

const Route = [  
  {
    element: <List />,
    path: '/type'
  },
  {
    element: <Add />,
    path: '/type_add'
  },
  // {
  //   element: <Edit />,
  //   path: '/type_edit/:id'
  // }
]

export default Route