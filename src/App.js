import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import Spinner from "./components/Loaders/Spinner";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlannerPage from "./pages/PlannerPage";
import SmartPark from "./pages/smartPark";
import AddSpotPage from "./pages/smartPark/addspot";
import AboutPlace from "./pages/smartPark/addspot/AboutPlace";
import AddImages from "./pages/smartPark/addspot/AddImages";
import SetPrice from "./pages/smartPark/addspot/SetPrice";
import SpotBookings from "./pages/smartPark/bookings";
import MySpots from "./pages/smartPark/mySpots";
import "./App.css";
import TripsPage from "./pages/TripsPage";
import Register from "./pages/AuthPage/Register";
import Login from "./pages/AuthPage/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import ClusterMap from "./pages/smartPark/ClusterMap";
import ParkingSpotCard from "./components/ParkingSpotCard";
import BookSpot from "./pages/smartPark/parkingSpot";
export default function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="p-2 bg-black">
      <Navbar />
      <Toaster />
      {loading ? <Spinner /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<ClusterMap />} />
        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/smartPark" element={<SmartPark />} />
        <Route
          path="/smartPark/add-spot"
          element={
            <ProtectedRoute>
              <AddSpotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/smartPark/slot/:slotID"
          element={
            <ProtectedRoute>
              <BookSpot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/smartPark/add-spot/about-place"
          element={<AboutPlace />}
        />
        <Route path="/smartPark/add-spot/add-images" element={<AddImages />} />
        <Route path="/smartPark/add-spot/set-price" element={<SetPrice />} />
        <Route path="/smartPark/bookings" element={<SpotBookings />} />
        <Route path="/smartPark/my-spots" element={<MySpots />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
