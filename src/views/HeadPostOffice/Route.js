// ** React Imports
import { lazy } from 'react'

const List = lazy(() => import('./list'))
const Add = lazy(() => import('./add'))
const Edit = lazy(() => import('./edit'))

const Route = [  
  {
    element: <List />,
    path: '/head_post_office'
  },
  {
    element: <Add />,
    path: '/head_post_office_add'
  },
  // {
  //   element: <Edit />,
  //   path: '/head_post_office_edit/:id'
  // }
]

export default Route