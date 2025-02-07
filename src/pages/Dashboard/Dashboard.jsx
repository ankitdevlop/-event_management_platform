import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate=useNavigate()
  return (
<section className="text-white border-b-orange-50 bg-black body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Features of Our Platform</h1>
      <p className="lg:w-1/2 w-full leading-relaxed text-white">Discover the features that make our platform the perfect tool for managing your events and attendees with ease.</p>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M20 2v20M4 2v20"></path>
            </svg>
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">User Authentication</h2>
          <p className="leading-relaxed text-base">Easily register or log in to your account. Want to explore without signing up? Use the "Guest Login" to access limited features right away.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4" onClick={()=>navigate("/viewEvents")}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 12l9 4V8l-9 4V3L3 8v8l9-4v5"></path>
            </svg>
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Event Dashboard</h2>
          <p className="leading-relaxed text-base">Get a complete overview of all your upcoming and past events. Easily filter events by category, date, and more for better organization.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 3v18m9-9H3"></path>
            </svg>
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Event Creation</h2>
          <p className="leading-relaxed text-base">Create new events with ease. Simply fill out the form with the event name, description, date, time, and other important details to get started.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M12 3v18m9-9H3"></path>
            </svg>
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Real-Time Attendee List</h2>
          <p className="leading-relaxed text-base">Track your event's growth in real-time by seeing the number of attendees as they register for your event. Stay updated instantly!</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M8 3v18m8-18v18"></path>
            </svg>
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">Responsive Design</h2>
          <p className="leading-relaxed text-base">Whether you're on a desktop, tablet, or smartphone, our platform adjusts seamlessly, offering an optimal experience across all devices.</p>
        </div>
      </div>
    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={navigate('/viewEvents')}>Get Started Now</button>
  </div>
</section>

  )
}

export default Dashboard
