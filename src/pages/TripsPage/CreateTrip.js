import React, { useState, useEffect } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import ItemPlace from "./ItemPlace";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CreateTrip() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [title, setTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handleAddPlace = (place) => {
    setQuery("");
    // setSelectedPlaces([...selectedPlaces, place]);
    const fomrattedData = {
      id: place.id,
      place_name: place.place_name,
      lng: place.geometry.coordinates[0],
      lat: place.geometry.coordinates[1],
    };
    setSelectedPlaces([...selectedPlaces, fomrattedData]);
  };
  const handleRemovePlace = (id) => {
    const newPlaces = selectedPlaces.filter((place) => place.id !== id);
    setSelectedPlaces(newPlaces);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&autocomplete=true`
        )
          .then((res) => res.json())
          .then((data) => setResults(data.features))
          .catch((error) => console.error("Error fetching data:", error));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getPlacePos = (id) =>
    selectedPlaces?.findIndex((place) => place.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setSelectedPlaces((selectedPlaces) => {
      const originalPos = getPlacePos(active.id);
      const newPos = getPlacePos(over.id);
      return arrayMove(selectedPlaces, originalPos, newPos);
    });
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/trip/create`,
        {
          user: user._id,
          title: title,
          fromDate: fromDate,
          toDate: toDate,
          places: selectedPlaces,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("successfully created your trip");
        navigate("/trips");
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
    dispatch(HideLoading());
  };
  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg p-5 my-2">
        <p className="font-bold text-xl mb-4">Create your trip</p>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title of the trip"
          className="w-full p-2 border rounded-md mb-4"
        />
        <p className="text-gray-400 mb-1">
          select from and to date of your trip
        </p>
        <div className="flex flex-wrap items-center gap-2 w-full">
          <input
            type="date"
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
            placeholder="from date"
            className="w-1/2 p-2 border rounded-md mb-4"
            style={{
              colorScheme: "dark",
            }}
          />
          <input
            type="date"
            onChange={(e) => {
              setToDate(e.target.value);
            }}
            placeholder="to date"
            className="w-[49%] p-2 border rounded-md mb-4"
            style={{
              colorScheme: "dark",
            }}
          />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a location..."
          className="w-full p-2 border rounded-md mb-4"
        />
        <div>
          {results &&
            results?.length > 0 &&
            results?.map((result) => (
              <div
                key={result.id}
                className="mb-2 p-2 border rounded-md cursor-pointer"
                onClick={() => handleAddPlace(result)}
              >
                <h3 className="text-lg font-semibold">{result.place_name}</h3>
                <p className="text-gray-400">
                  {result.context?.map((context) => context.text).join(", ")}
                </p>
              </div>
            ))}
        </div>
      </div>
      {selectedPlaces?.length > 0 ? (
        <>
          <div className="border rounded-lg p-5 my-2">
            <div className="flex flex-wrap justify-between mb-4 items-center">
              <p className="font-bold text-xl">Selected places to visit</p>
              <button
                onClick={handleSave}
                className="text-xl  rounded-lg px-4 p-2 bg-green-400 text-black"
              >
                save
              </button>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedPlaces}
                strategy={verticalListSortingStrategy}
              >
                {selectedPlaces.map((place, index) => (
                  <ItemPlace
                    key={"place" + index}
                    place={place}
                    fromDate={fromDate}
                    toDate={toDate}
                    removePlace={handleRemovePlace}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
