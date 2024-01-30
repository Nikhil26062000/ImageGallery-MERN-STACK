import React, { useState } from 'react'

const UploadImage = () => {

  const [image,setImage] = useState();
  const onInputChange = (e) => {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("uploadedImage",image);

   try {
    const response = await fetch("http://localhost:8000/upload-image",{
      method:"POST",
      body :formdata,
      
        
      
    })
   } catch (error) {
    console.log(error);
   }

  }
  
  return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="file" accept="image/*" onChange={onInputChange}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default UploadImage