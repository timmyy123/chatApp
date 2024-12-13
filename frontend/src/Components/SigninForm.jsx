import React, { useRef, useState } from 'react'
import styles from './Form.module.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const SigninForm = () => {
  const email = useRef(null)
  const password = useRef(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  console.log('rendered')
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const emailValue = email.current.value
    const passwordValue = password.current.value 

    if(emailValue && passwordValue) {
      try{
        const {response} = await axios.post('/api/user/login', {
          email: emailValue,
          password: passwordValue
        })

        localStorage.setItem('userInfo', JSON.stringify(response))
        setLoading(false)
        navigate('/chats')

      } catch (error) {
        alert(
          error || 'Unexpected error'
        )
        setLoading(false)
      }
    } else {
      alert('Please enter email and password')
      setLoading(false)
    }
  
  }
  return (
    <div className={`card text-center p-4 ${styles.customCard}`} style={{width: '30%', maxWidth: '300px', minWidth: '200px'}}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className='text-center row'>
          <label htmlFor="email" className='form-label'>Email</label>
          <input type="email" 
          className='form-control' 
          id='email' 
          placeholder='Enter your email'
          ref={email}
          />
          <label htmlFor="password" className='form-label'>Password</label>
          <input type="password" 
          className='form-control' 
          id='password' 
          placeholder='Enter your password'
          ref={password}
          />
          <div className='col-12 col-md-6 mt-3 px-1'> 
            <button type='submit' className={`btn btn-primary  ${styles.customBtn}`} disabled={loading}>{loading? 'Loading...':'Sign In'}</button>
          </div>
          <div className='col-12 col-md-6 mt-3 px-1'>
            <button type='button' className={`btn btn-primary  ${styles.customBtn}`} onClick={()=>navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SigninForm