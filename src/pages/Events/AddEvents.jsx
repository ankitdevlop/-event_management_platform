import React, { useEffect, useState } from 'react';
import eventImg from '../../assets/event.png'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, UplaodImg } from './eventSlice';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

function AddEvents() {
  const [imageBase64, setImageBase64] = useState(null);
  const [eventImgUrl, setEventImgUrl] = useState(null)
  const { isLoading } = useSelector(state => state.eventReducer);

  const schema = yup.object({
    eventName: yup.string().required("Name is required"),
    eventDescription: yup.string().required("event Description is Required"),
    eventImage: yup.string().required("img is Required"),
    category: yup.string().required("category is Required"),
    duration: yup.string().required("duration is Required"),
    eventDate: yup.string().required("eventDate is Required"),
  })
  const dispatch = useDispatch();
  const navigate = useNavigate()



  const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result; // Includes "data:image/png;base64,"

        if (base64String) {
          setImageBase64(reader.result); // Store full Base64 string (with prefix)
          setValue("eventImage", base64String); // Save in form state
          console.log("Base64 Image:", base64String); // Ensure correct format
        } else {
          console.error("Invalid Base64 format");
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        toast.error("Error reading image file.");
      };

      reader.readAsDataURL(file); // Converts to Base64 format
    } else {
      toast.error("Please select a valid image file.");
    }
  };


  const handleAddEvent = async (data) => {
    try {
      // First, upload the image and get its URL
      const uploadResponse = await dispatch(UplaodImg({ base64Image: data.eventImage })).unwrap();

      if (!uploadResponse?.imageUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      setEventImgUrl(uploadResponse.imageUrl); // Update state (though not necessary for form submission)

      // Construct request data
      const requestData = {
        eventName: data?.eventName,
        eventDescription: data?.eventDescription,
        eventImage: uploadResponse.imageUrl, // Use directly from API response
        duration: data?.duration,
        createdBy: data?.createdBy,
        category: data?.category, // Correct the key name
        eventDate: data?.eventDate,
      };

      // Now, create the event
      const eventResponse = await dispatch(createEvent(requestData)).unwrap();

      toast.success(eventResponse?.message);
      navigate('/viewEvents');
      reset(); // Reset the form after success
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      {isLoading && <Loader />}

      <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <img src={eventImg} width={50} alt="Event" className="mr-4" />
          <h2 className="text-white text-4xl">Add New Event Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label htmlFor="eventName" className="block mb-2 text-sm font-medium text-white">Event Name</label>
            <input
              type="eventName"
              id="eventName"
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name"
              {...register('eventName')}
            />
            {errors.eventName &&
              <div className="text-red-700">{errors?.eventName?.message}</div>
            }
          </div>

          {/* Event Date & Time */}
          <div>
            <label htmlFor="event-date" className="block mb-2 text-sm font-medium text-white">Event Date & Time</label>
            <input
              type="datetime-local"
              id="event-date"
              {...register("eventDate")}
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.eventDate &&
              <div className="text-red-700">{errors?.eventDate?.message}</div>
            }
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Description</label>
            <textarea
              id="message"
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a description..."
              {...register('eventDescription')}

            ></textarea>
            {errors.eventDescription &&
              <div className="text-red-700">{errors?.eventDescription?.message}</div>
            }
          </div>

          {/* Event Duration */}
          <div>
            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-white">Event Duration</label>
            <input
              type="text"
              id="duration"
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 2 hours"
              {...register('duration')}

            />
            {errors.duration &&
              <div className="text-red-700">{errors?.duration?.message}</div>
            }
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">
              Event Category
            </label>
            <select
              id="category"
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              {...register("category")}
            >
              <option value="">Select a category</option>
              <option value="party">Party</option>
              <option value="wedding">Wedding</option>
              <option value="sports">Sports</option>
              <option value="festival">Festival</option>
              <option value="corporate">Corporate</option>
            </select>
            {errors.category && <div className="text-red-700">{errors.category.message}</div>}
          </div>


          {/* File Upload */}
          <div>
            <label htmlFor="user_avatar" className="block mb-2 text-sm font-medium text-white">Upload File</label>
            <input
              type="file"
              id="user_avatar"
              on
              className="w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none"
              onChange={handleFileChange}
            />
            {errors.eventImage &&
              <div className="text-red-700">{errors?.eventImage?.message}</div>
            }
            {imageBase64 && (
              <div className="col-span-2">
                <p className="text-white mb-2">Preview:</p>
                <img src={imageBase64} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            className="w-full bg-indigo-500 text-white font-medium text-lg py-3 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={handleSubmit(handleAddEvent)}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEvents;
