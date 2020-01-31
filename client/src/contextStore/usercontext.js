import { createContext } from 'react'

const UserContext = createContext({
  user: {
    name: '',
    email: '',
    location: '',
    contactNo: ''
  },
  valueChanger: () => {}
})

export default UserContext
