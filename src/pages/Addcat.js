import React from 'react'
import CustomInput from '../components/CustomInput'

const Addcat = () => {
  return (
    <div>
      <h3 className='mb-4'>Add Category</h3>
      <div>
        <div>
          <CustomInput type='text' label='Enter Category'/>
          <button className=' btn-success border-0 rounded-3 mt-3' type='submit'>Add Category</button>
        </div>
      </div>
    </div>
  )
}

export default Addcat
