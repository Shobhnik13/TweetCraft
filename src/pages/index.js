import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const [loading,setLoading]=useState(false)
  const [tweet,setTweet]=useState('')
  const [topic,setTopic]=useState('')
  const [mood,setMood]=useState('')
  const generateTweet=async()=>{
      try{
        toast('Generating tweet!', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          }); 
        setLoading(true);
          const res=await fetch('/api/generator',{
            method:"POST",
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({topic,mood})
          })
          const {tweet}=await res.json();
          setTweet(tweet);
      }catch(err){
        toast.error(`${err}`, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
          // console.log('failed to generate tweet:',err)
      }finally{
        setLoading(false)
        setTopic('')
        setMood('')
        toast.success('Tweet generated  successfuly!', {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
      }
  }
  return (
   <div className='min-h-screen flex items-center justify-center bg-gray-200'>
    {/* this upper div will contain all elements */}
    {/* this lower div  is for all the labels and h1(WHOLE CONTENT)*/}
    <div className='bg-white shadow-lg rounded-lg p-6 w-96 space-y-4 '>
      <h1 className='text-3xl font-bold text-center text-blue-950 bg-gradient-to-r from-blue-400 to-blue-200 p-4 rounded-md '>TweetCraft</h1>
    {/* div for each label and input -> topic */}
    <div className='flex flex-col space-y-2'>
      <label htmlFor="topic" className='text-lg'>
        Topic:
      </label>
      <input type="text" required value={topic} onChange={(e)=>setTopic(e.target.value)} className='border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400' />
    </div>

    {/* div for each label and input -> mood */}
    <div className='flex flex-col space-y-2'>
      <label htmlFor="mood" className='text-lg'>
        Mood:
      </label>
      <input type="text" value={mood} required onChange={(e)=>setMood(e.target.value)} className='border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400' />
    </div>

    {/* button to generate  */}
    
      <button
      disabled={loading || (topic.length<=0 || mood.length<=0)}
      className='bg-blue-500 text-white rounded-md py-2 px-4 w-full hover:bg-blue-600 hover:scale-90 duration-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
      onClick={generateTweet}> 
      {loading?'Generating tweet....':'Generate tweet'} 
      </button>
        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      {/* showing the generated tweet  */}
      {tweet && <p className="text-center text-lg font-medium text-blue-500">{tweet}</p> }
    </div>
   </div>
    )
}
