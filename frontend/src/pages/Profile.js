import React, { useContext } from 'react'
import { UserContext } from '../user-context/UserContext'

function Profile() {

    const {user, setUser} = useContext(UserContext)
  return (
    <div>{JSON.stringify(user, null, 2)}</div>
  )
}

export default Profile