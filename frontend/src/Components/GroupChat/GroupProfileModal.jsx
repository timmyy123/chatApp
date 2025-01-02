import React from 'react'

const GroupProfileModal = ({ toggleFetch, setToggleFetch }) => {
  return (
    <div className='modal fade' id='groupProfileModal' data-bs-backdrop='static' tabIndex={'-1'} aria-labelledby='groupProfileModalLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header justify-content-center'>
            <h1 className='modal-title fs-5' id='groupProfileModalLabel'>Group Info</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GroupProfileModal