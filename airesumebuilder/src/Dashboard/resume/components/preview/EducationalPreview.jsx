import React from 'react'

const EducationalPreview = ({resumeInfo}) => {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

  return (
    <div>
        <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2' style={{
            color:resumeInfo?.themeColor
        }}>Educational Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }}/>

        {
          resumeInfo?.education.map((item,index)=>(
            <div key={index} className='my-5'>
              <h2 className='text-sm font-bold'
                  style={{
                    color:resumeInfo?.themeColor
                  }}
              >{item?.universityName}</h2>
              <h2 className='text-xs flex justify-between'>{item?.degree} in {item?.major} <span>{formatDate(item?.startDate)} - {formatDate(item?.endDate)}</span></h2>
              <p className='text-xs my-2'>
                {item?.description}
              </p>
            </div>
          ))
        }

        </div>

    </div>
  )
}

export default EducationalPreview