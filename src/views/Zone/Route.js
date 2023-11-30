// ** React Imports
import { lazy } from 'react'

const List = lazy(() => import('./list'))
const Add = lazy(() => import('./add'))
// const Edit = lazy(() => import('./edit'))

const Route = [  
  {
    element: <List />,
    path: '/zone'
  },
  {
    element: <Add />,
    path: '/zone_add'
  },
  // {
  //   element: <Edit />,
  //   path: '/zone_edit/:id'
  // }
]

export default Route