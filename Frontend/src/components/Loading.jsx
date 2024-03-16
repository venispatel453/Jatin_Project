import React from "react";
import { ThreeDots } from "react-loader-spinner"; // Import loader spinner component
import "../styling/loading.css"; // Import CSS file for styling

// Loading component
const Loading = () => {
  return (
    <div className="loading-spinner-container">
      {" "}
      {/* Container for loading spinner */}
      {/* ThreeDots spinner */}
      <ThreeDots
        visible={true} // Set visibility to true
        height="150" // Set height of spinner
        width="130" // Set width of spinner
        color="#fff" // Set color of spinner
        radius="10" // Set radius of spinner
        ariaLabel="three-dots-loading" // Set ARIA label for accessibility
        wrapperStyle={{}} // Additional wrapper style (empty object)
        wrapperClass="" // Additional wrapper class (empty string)
      />
    </div>
  );
};

export default Loading; // Export Loading component
