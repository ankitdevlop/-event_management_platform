import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import TopBar from './pages/TopBar/TopBar';
import ViewEvents from './pages/Events/ViewEvents';
import EventDetails from './pages/Events/EventDetails';
import AddEvents from './pages/Events/AddEvents';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem('token'); // Replace with proper auth check logic
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <div style={{ position: "sticky", top: "0" }}>
      {isAuthenticated() && (
        <div style={{ position: "sticky", top: "0" }}>
          <TopBar />
        </div>
      )}
      </div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route 
          path="/dashboard" 
          element={
            
              <Dashboard />
           
          } 
        />
        <Route 
          path="/viewEvents" 
          element={
            <ProtectedRoute>
              <ViewEvents />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/EventDetails" 
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/addEvent" 
          element={
            <ProtectedRoute>
              <AddEvents />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <ToastContainer/>

    </div>
  );
}

export default App;
