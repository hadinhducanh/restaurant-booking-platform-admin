import agent from "@/api/agent";
import { LocationResponse } from "@/models/Location";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function LocationDetail() {
  const { locationId } = useParams<{ locationId: string }>();
  const [location, setLocation] = useState<LocationResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const result = await agent.Location.getById(Number(locationId));
        setLocation(result);
        setSelectedImage(
          result?.image
            ?.replace(/[\[\]]/g, "")
            .split(",")
            .map((url: string) => url.trim())[0]
        );
      } catch (error) {
        console.error("Error fetching location details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) {
      fetchLocationDetails();
    }
  }, [locationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  const formatArrayToCommaSeparated = (arr: any[], key: string) =>
    arr.map((item) => item[key]).join(", ");

  const imageUrls = location?.image
    ?.replace(/[\[\]]/g, "")
    .split(",")
    .map((url) => url.trim());

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleThumbnailClick = (img: string) => {
    setSelectedImage(img);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Wrap the image and info section in a flex container */}
      <div className="flex flex-col md:flex-row md:space-x-8 h-full">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex-1">
          {/* Ensure both sections grow equally */}
          <div className="grid grid-cols-1 gap-4 h-full">
            {/* Main Image */}
            {selectedImage && (
              <div className="w-full h-96 max-h-96">
                {" "}
                {/* Set a fixed height for the main image */}
                <img
                  src={selectedImage}
                  alt="Main Location"
                  className="w-full h-full rounded-lg shadow-md object-cover" // Ensure the image fits the container
                />
              </div>
            )}

            {/* Thumbnails Carousel using React Slick */}
            <Slider {...sliderSettings}>
              {imageUrls &&
                imageUrls.map((img: string, index: number) => (
                  <div key={index} className="p-2">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 rounded-lg shadow-md object-cover cursor-pointer"
                      onClick={() => handleThumbnailClick(img)}
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>

        {/* Info Section */}
        <div
          className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg flex-1"
          style={{
            background:
              "linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )",
          }}
        >
          {" "}
          {/* Gradient Background Applied */}
          <h2 className="text-2xl text-white font-semibold mb-4">
            {location?.name}
          </h2>
          <p className="text-gray-200 mb-2">
            <strong>Address:</strong> {location?.address}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Phone:</strong> {location?.phone}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Views:</strong> {location?.view}
          </p>
          <p className="text-gray-200 mb-2 flex">
            <strong className="mr-2">Rating:</strong>{" "}
            {location?.rating && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {[...Array(Math.floor(location?.rating))].map((_, index) => (
                  <FaStar key={index} color="yellow" />
                ))}
                {location?.rating % 1 !== 0 && <FaStarHalfAlt color="yellow" />}
              </div>
            )}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>On Suggest:</strong> {location?.onSuggest ? "Yes" : "No"}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>On Sale:</strong> {location?.onSale ? "Yes" : "No"}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>On Banner:</strong> {location?.onBanner ? "Yes" : "No"}
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Brand:</strong> {location?.brand?.name}
          </p>
          {/* Display category names */}
          <p className="text-gray-200 mb-2">
            <strong>Categories:</strong>{" "}
            {location?.category &&
              formatArrayToCommaSeparated(location.category, "name")}
          </p>
          {/* Display tag names */}
          <p className="text-gray-200 mb-2">
            <strong>Tags:</strong>{" "}
            {location?.tag && formatArrayToCommaSeparated(location.tag, "name")}
          </p>
          {/* Status with conditional background color */}
          <p className="text-gray-200 mb-2">
            <strong className="mr-2">Status:</strong>
            <span
              className={`py-1 px-3 rounded-lg text-white font-bold ${
                location?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {location?.status}
            </span>
          </p>
          <p className="text-gray-200 mb-2">
            <strong>Description:</strong> {location?.description}
          </p>
        </div>
      </div>

      {/* Last Section: Display working hours */}
      <section
        className="bg-white px-6 py-2 shadow-md rounded-lg mt-4"
        style={{
          background:
            "linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )", // Gradient background for working hours
        }}
      >
        <h3 className="text-xl font-semibold mb-4 text-white">
          <i className="fas fa-clock mr-2"></i> Working Hours:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-200">
          {location?.workingHour &&
            location.workingHour.map((hour) => (
              <div
                key={hour.id}
                className="flex items-center space-x-4 bg-opacity-50 bg-gray-800 p-4 rounded-lg justify-between"
              >
                {/* Fixed width for the day */}
                <div className="text-lg font-bold text-white">
                  {" "}
                  {/* Ensures all days take the same space */}
                  {hour.day}
                </div>
                {/* Monospaced font for the time to align properly */}
                <div className="text-base text-white">
                  {hour.startTime} - {hour.endTime}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
