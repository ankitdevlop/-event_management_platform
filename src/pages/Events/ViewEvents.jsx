import React, { useEffect, useState } from 'react';
import UpCommingEvents from './UpCommingEvents';
import PastEvents from './PastEvents';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from './eventSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

function ViewEvents() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, events } = useSelector(state => state.eventReducer);


    // State for filters
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Function to fetch filtered events
    const fetchEvents = () => {
        let queryParams = "";

        if (category) queryParams += `category=${category}&`;
        if (startDate) queryParams += `startDate=${startDate}&`;
        if (endDate) queryParams += `endDate=${endDate}&`;

        // Remove trailing '&' if exists
        queryParams = queryParams ? `?${queryParams.slice(0, -1)}` : "";

        const apiUrl = `${queryParams}`;

        dispatch(getEvent(apiUrl)).unwrap()
            .then((res) => {
                toast.success("success");
            })
            .catch((error) => {
                toast.success("fail")
            });
    };

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <div className="text-center bg-black py-24">
            {/* Add Event Button */}
            {isLoading && <Loader />}

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                <h3 className='text-white font-bold text-lg'>Add New Event</h3>
                <button
                    onClick={() => navigate("/addEvent")}
                    className="group cursor-pointer outline-none hover:rotate-90 duration-300 mb-8"
                    title="Add New"
                >
                    <svg
                        className="stroke-teal-500 fill-none group-hover:fill-green-100 group-active:stroke-teal-200 group-active:fill-teal-100 group-active:duration-0 duration-300"
                        viewBox="0 0 24 24"
                        height="50px"
                        width="50px"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                        <path strokeWidth="1.5" d="M8 12H16"></path>
                        <path strokeWidth="1.5" d="M12 16V8"></path>
                    </svg>
                </button>

                {/* Category Filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                >
                    <option value="">All Categories</option>
                    <option value="party">Party</option>
                    <option value="music">Music</option>
                    <option value="wedding">Wedding</option>
                    <option value="conference">Conference</option>
                    <option value="sports">Sports</option>
                    <option value="festival">Festival</option>
                </select>

                {/* Start Date */}
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                />

                {/* End Date */}
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                />

                {/* Filter Button */}
                <button
                    onClick={fetchEvents}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                    Filter Events
                </button>
            </div>

            {/* Upcoming and Past Events */}
            <UpCommingEvents data={events?.upcomingEvents} />
            <PastEvents data={events?.pastEvents} />
        </div>
    );
}

export default ViewEvents;
