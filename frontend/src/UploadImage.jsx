import React, { useEffect, useState } from 'react'

const UploadImage = () => {

  const [image,setImage] = useState();
  const [imageDb,setImageDb] = useState();

  useEffect(()=>{
    getImages();
  },[])
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
    const responseMessage =await response.json();
    console.log(responseMessage);
   } catch (error) {
    console.log(error);
   }

  }

  const getImages = async ()=>{
    try {
      const res=await fetch('http://localhost:8000/get-images')
    const data=await res.json()
    setImageDb(data.message);
    console.log(data);
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

        {
          imageDb && imageDb.map((ele,index)=>{
            // "/" this by default public folder and in public folder i have mad images folder from there i am fetching images
            return <img src={`/images/${ele.image}`} key={index} className='h-[300px] w-[300px] rounded-md  m-5'/>
          })
        }
    </div>
  )
}

export default UploadImage