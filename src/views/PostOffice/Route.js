// ** React Imports
import { lazy } from 'react'

const List = lazy(() => import('./list'))
const Add = lazy(() => import('./add'))
// const Edit = lazy(() => import('./edit'))

const Route = [  
  {
    element: <List />,
    path: '/post_office'
  },
  {
    element: <Add />,
    path: '/post_office_add'
  },
  // {
  //   element: <Edit />,
  //   path: '/post_office_edit/:id'
  // }
]

export default Route