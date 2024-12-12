import React, { useRef } from 'react'
import styles from './Form.module.css'

const SigninForm = () => {
  const email = useRef(null)
  const password = useRef(null)
  console.log('rendered')
  const handleSubmitt = () => {
  
  }
  return (
    <div className={`card text-center p-4 ${styles.customCard}`} style={{width: '30%', maxWidth: '300px', minWidth: '200px'}}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmitt}>
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
        <button className='btn btn-primary mt-2'>Sign In</button>
      </form>
    </div>
  )
}

export default SigninForm