import {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../context/auth.context'
import axios from 'axios'
import API_URL from '../../services/apiConfig'
import { Grid } from '@mui/material'




const PeopleIFollow = () => {

    const { user } = useContext(AuthContext);



  return (
    <div>PeopleIFollow</div>
  )
}

export default PeopleIFollow