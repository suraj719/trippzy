import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
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
export default function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="p-2 bg-black">
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/smartPark" element={<SmartPark />} />
            <Route path="/smartPark/add-spot" element={<AddSpotPage />} />
            <Route
              path="/smartPark/add-spot/about-place"
              element={<AboutPlace />}
            />
            <Route
              path="/smartPark/add-spot/add-images"
              element={<AddImages />}
            />
            <Route
              path="/smartPark/add-spot/set-price"
              element={<SetPrice />}
            />
            <Route path="/smartPark/bookings" element={<SpotBookings />} />
            <Route path="/smartPark/my-spots" element={<MySpots />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}
