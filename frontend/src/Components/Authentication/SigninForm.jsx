import React, { useRef, useState } from 'react'
import styles from '../Style.module.css'
import { useNavigate } from 'react-router'
import { ChatState } from '../Context/ChatProvider'
import UseApi from '../../hooks/UseApi'

const SigninForm = () => {
  const email = useRef(null)
  const password = useRef(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {user, setUser, createToast} = ChatState()
  const api = UseApi()
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    const emailValue = email.current.value
    const passwordValue = password.current.value 

    if(emailValue && passwordValue) {
      try{
        const {data} = await api.post('/api/user/login', {
          email: emailValue,
          password: passwordValue
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        setUser(data)
        setLoading(false)
        navigate('/chats')

      } catch (error) {
        createToast(error.response.data.message || 'Unexpected error')
        setLoading(false)
      }
    } else {
      createToast('Please enter email and password')
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
            <button type='submit' className={`btn btn-primary d-flex justify-content-center  ${styles.customBtn}`} disabled={loading}>{loading? 'Loading...':'Sign In'}</button>
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