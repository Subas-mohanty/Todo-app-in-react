import React from 'react'

function DateFormat({todo}) {
    const time = todo.id;


    function getMonth(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[date.getMonth()];
      }

    function formatTime() {
        const time = todo.id;
        const date = new Date(time);
      
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
      
        // Add leading zeros for single-digit hours, minutes, and seconds
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        return formattedTime;
      }


      function formatDate() {
        const time = todo.id;
        const date = new Date(time);
      
        const day = date.getDate();
        const month = getMonth(date);
      
        // Add leading zeros for single-digit hours, minutes, and seconds
        const formattedTime = `${day.toString().padStart(2, '0')}:${month.toString().padStart(2, '0')}`;
        
        return formattedTime;
      }

      const formattedTime = formatTime();
      const formattedDate = formatDate();
      
  return (
    <>
        <div className='flex justify-center items-center mt-1'>
            <div className='px-2'>{formattedDate}</div>
            <div>{formattedTime}</div>
        </div>
    </>
  )
}

export default DateFormat