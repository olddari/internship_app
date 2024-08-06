import React, { useState } from 'react'
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const Addblog = () => {

    const [desc, setDesc] = useState();
    const handleDesc = (e) =>{
        setDesc (e);
    }

  return (
    <div>
      <h3 className='mb-3'>Add Blog</h3>
        <div className=''>
            <div>
                <CustomInput type='text' Label=''/>
                <select name='' id='' className='form-control py-3 mb-3 mt-3'>
                <option value=''>Select Blog Category</option>
                </select>
                <ReactQuill theme="snow" value={desc} onChange={(evt)=>{handleDesc(evt)}} />
                <button className=' btn-success border-0 rounded-3 mt-3' type='submit'>Add Blog</button>
            </div>
        </div>
    </div>
  )
}

export default Addblog
