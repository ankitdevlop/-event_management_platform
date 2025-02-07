import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";


const initialState = {
    isLoading: false,
    error: null,
    onlyEventDetails: null,
    events: null
}

export const createEvent = createAsyncThunk("event/createEvent", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.createEvent,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const UplaodImg = createAsyncThunk("event/uploadImg", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.uploadImg,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const updateEvent = createAsyncThunk("user/updateEvent", async ({ requestData, queryParams }) => {
    try {
        let data = {
            method: METHOD_TYPE.put,
            url: API_ENDPOINTS.updateEvent + queryParams,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const getEventById = createAsyncThunk("user/getEventById", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getEventById + queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const getEvent = createAsyncThunk("user/getEvent", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getEvent + queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const deleteEvent = createAsyncThunk("user/deleteEvent", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: API_ENDPOINTS.deleteEvent + queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});



const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createEvent.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateEvent.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getEventById.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.onlyEventDetails = payload;
            })
            .addCase(getEvent.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.events = payload;
            })

            .addMatcher(isAnyOf(createEvent.pending, updateEvent.pending, getEvent.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(createEvent.rejected, updateEvent.rejected, getEvent.rejected), (state, { error }) => {
                state.isLoading = false;
                state.error = error.message ? error.message : "Request Failed Please Try Again ";

            })
    }
});

const eventReducer = eventSlice.reducer;

export { eventReducer };
export default eventReducer;