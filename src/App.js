import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Loaders/Spinner";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlannerPage from "./pages/PlannerPage";
import SmartPark from "./pages/smartPark";
import AddSpotPage from "./pages/smartPark/addspot";
import SpotBookings from "./pages/smartPark/bookings";
import MySpots from "./pages/smartPark/mySpots";
import TripsPage from "./pages/TripsPage";
import Register from "./pages/AuthPage/Register";
import Login from "./pages/AuthPage/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import BookSpot from "./pages/smartPark/parkingSpot";
import "./App.css";
import Weather from "./pages/PlannerPage/Weather";
import TripWeather from "./pages/TripsPage/TripWeather";
import CreateTrip from "./pages/TripsPage/CreateTrip";
import TripPage from "./pages/TripsPage/TripPage";
import GuidesPage from "./pages/GuidesPage";
import MainHome from "./pages/PopularPage/MainHome";
import VRPage from "./pages/VRPage";
import PanellumPage from "./pages/VRPage/PanellumPage";
import LocalPage from "./pages/LocalPage";
import PricingPage from "./pages/PricingPage";

export default function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="p-2 bg-black">
      <Navbar />
      <Toaster />
      {loading ? <Spinner /> : null}

      <Routes>
        <Route path="/" element={<HomePage />} />
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
          path="/trips/create"
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trip/:tripID"
          element={
            <ProtectedRoute>
              <TripPage />
            </ProtectedRoute>
          }
        />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/popular" element={<MainHome />} />
        <Route path="/vr-view" element={<VRPage />} />
        <Route path="/vr-view/3dview" element={<PanellumPage />} />
        <Route path="/local-events" element={<LocalPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/smartPark/bookings" element={<SpotBookings />} />
        <Route path="/smartPark/my-slots" element={<MySpots />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/trip/weather" element={<TripWeather />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
