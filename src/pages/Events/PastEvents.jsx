import React from 'react'
import { useNavigate } from 'react-router-dom';

function PastEvents({ data }) {
  const navigate = useNavigate();
  return (
    <div>
      <section class="text-white body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Past Events</h1>
          </div>
          <div class="flex flex-wrap -m-2">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full" onClick={() => navigate(`/EventDetails?_id=${item._id}`)}>
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item?.eventImage} />
                    <div className="flex-grow">
                      <h2 className="text-white title-font font-medium">Category: {item?.category}</h2>
                      <p className="text-white">Event Date: {item?.eventDate}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center">No Data Found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PastEvents
