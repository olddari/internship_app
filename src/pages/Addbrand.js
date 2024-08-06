import React from 'react'
import CustomInput from '../components/CustomInput'

const Addbrand = () => {
  return (
    <div>
      <h3 className='mb-4'>Add Brand</h3>
      <div>
        <div>
          <CustomInput type='text' label='Enter Category'/>
          <button className=' btn-success border-0 rounded-3 mt-3' type='submit'>Add Brand</button>
        </div>
      </div>
    </div>
  )
}

export default Addbrand
