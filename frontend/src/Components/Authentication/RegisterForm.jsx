import React, { useState } from 'react'
import styles from '../Style.module.css'
import { useNavigate } from 'react-router'
import { ChatState } from '../Context/ChatProvider'
import UseApi from '../../hooks/UseApi'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { createToast, setUser } = ChatState()
  const api = UseApi()

  const handelSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { name, email, password, confirmPassword } = formData;

    if(name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const {data} = await api.post(
            'api/user',
            {
              name,
              email,
              password
            }
          )
          localStorage.setItem('userInfo', JSON.stringify(data))
          setUser(data)
          setLoading(false)
          navigate('/chats')
        } catch(error){
          createToast(error.response.data.message||'Unexpected Error')
        }
      } else {
        createToast("Passwords don't match")
        setLoading(false)
      }
    } else {
      createToast('Please enter all the fields')
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <div className={`card text-center p-4 ${styles.customCard}`} style={{ width: '50%', maxWidth: '600px', minWidth: '300px' }}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handelSubmit}>
        <div className='row mb-2'>
          <div className='col-12 col-lg-6'>
            <label htmlFor="name" className='form-label'>Username</label>
            <input type="text" className='form-control' id='name' name='name' value={formData.name} placeholder='Choose a username' onChange={handleChange} />
          </div>
          <div className='col-12 col-lg-6'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input type="email" className='form-control' id='email' name='email' value={formData.email} placeholder='Enter your email' onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" className='form-control' id='password' name='password' value={formData.password} placeholder='Choose a password' onChange={handleChange} />
          </div>
          <div className='col-12 col-md-6'>
            <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
            <input type="password" className='form-control' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} placeholder='Confirm your password' onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-6 mt-3 px-2'>
            <button type='submit' className={`btn btn-primary  ${styles.customBtn}`} disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
          </div>
          <div className='col-12 col-md-6 mt-3 px-2'>
            <button type='button' className={`btn btn-primary  ${styles.customBtn}`} onClick={()=>navigate('/')}>Sign In</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm