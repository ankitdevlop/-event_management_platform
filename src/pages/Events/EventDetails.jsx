import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, getEventById } from './eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

function EventDetails() {
  const navigate = useNavigate();
  const { isLoading, onlyEventDetails } = useSelector(state => state.eventReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("_id");

  const queryParams = `?eventId=${eventId}`;
  const fetchEvents = () => {

    dispatch(getEventById(queryParams)).unwrap()
      .then((res) => {
        toast.success("success");
      })
      .catch((error) => {
        toast.success("fail")
      });
  }
  const handleDelete = (id) => {
    const queryParams = `?_id=${id}`
    dispatch(deleteEvent(queryParams)).unwrap()
      .then((res) => {
        navigate('/viewEvents')
        toast.success("success");
      })
      .catch((error) => {
        toast.success("fail")
      });
  }


  useEffect(() => {
    fetchEvents()
  }, [])
  // console.log('onlyEventDetails?.event?.eventDescription', onlyEventDetails?.event?.eventImage)
  return (
    <div>
      {isLoading && <Loader />}

      <section className="text-white bg-black body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {/* Event Name and Description */}
            <h1 className="text-3xl font-medium title-font mb-4 text-white">{onlyEventDetails?.event?.eventName}</h1>
            <p className="leading-relaxed text-white mb-4">{onlyEventDetails?.event?.eventDescription}</p>

            {/* Event Date & Time */}
            <div className="mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 4h-3V2h-2v2h-6V2H8v2H5a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3z"></path>
              </svg>
              <div>
                <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">Event Date & Time</h2>
                <p className="leading-relaxed">{onlyEventDetails?.event?.eventDate}</p>
              </div>
            </div>

            {/* Duration */}
            <div className="mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8V4m0 0l3 3m-3-3L9 7M4 12h16m-16 0l3-3m-3 3l3 3m3 4v4m0 0l3-3m-3 3l-3-3"></path>
              </svg>
              <div>
                <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">Duration</h2>
                <p className="leading-relaxed">{onlyEventDetails?.event?.duration}</p>
              </div>
            </div>

            {/* Number of Attendees */}
            <div className="mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.21 0-4-1.79-4-4 0-.5.13-.97.35-1.38l2.38 2.38c.26.26.66.26.92 0l1.88-1.88c-.3-.71-.48-1.48-.48-2.34 0-2.21 1.79-4 4-4 .68 0 1.31.15 1.88.43l2.38-2.38C19.87 11.03 20 11.5 20 12c0 2.21-1.79 4-4 4s-4-1.79-4-4z"></path>
              </svg>
              <div>
                <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">Number of Attendees</h2>
                <p className="leading-relaxed">{onlyEventDetails?.event?.attendedPeople.length} people</p>
              </div>
            </div>

            {/* Created By */}
            <div className="mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.21 0-4-1.79-4-4 0-1.11.4-2.1 1.05-2.83.36-.35.78-.67 1.22-.95-.39-.45-.75-.93-1.05-1.43-.72 0-1.44.1-2.1.32-.42-.67-.68-1.47-.68-2.38 0-2.21 1.79-4 4-4 1.74 0 3.2 1.13 3.74 2.7-.35-.13-.75-.23-1.17-.32 1.07 0 2.03.39 2.76 1.02-.23-.69-.42-1.42-.69-2.16-2.16-.57-3.95-.44-5.56.6-.72-.48-1.53-.85-2.44-1.11 1.04-1.13 2.67-1.93 4.52-1.93 1.83 0 3.52.75 4.68 1.97-.35.13-.72.27-1.08.42 1.28.69 2.3 1.64 2.81 2.76-.8.56-1.71 1-2.69 1.3-.28-.56-.62-1.09-1.01-1.57z"></path>
              </svg>
              <div>
                <h2 className="font-medium title-font text-sm text-white mb-1 tracking-wider">Created By</h2>
                <p className="leading-relaxed">{onlyEventDetails?.event?.createdBy}</p>
              </div>
            </div>

          </div>

          {/* Event Image */}
          <img className=" object-cover object-center rounded-lg md:mt-0 mt-12" src={onlyEventDetails?.event?.eventImage instanceof FileList
            ? URL.createObjectURL(onlyEventDetails?.event?.eventImage[0])
            : onlyEventDetails?.event?.eventImage} alt="event" />
        </div>
        <div className="flex justify-center space-x-4 mt-10">
          <button
            className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            onClick={() => handleDelete(onlyEventDetails?.event?._id)}
          >
            Delete Event
          </button>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => navigate("/viewEvents")}
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
}

export default EventDetails;
