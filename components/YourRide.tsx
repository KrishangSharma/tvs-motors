import React from "react";
const YourRide = () => {
  return (
    <main className="w-full">
      <div className="w-1/2 bg-blue-500 transform -skew-x-[34deg] pl-16 -ml-10 py-8 font-roboto">
        <div className="uppercase font-bold text-blue-700 opacity-10 text-6xl pl-44 transform skew-x-[34deg] tracking-widest">
          {/* Background text */}
          Vehicles
        </div>
        <h2 className="text-sm transform skew-x-[34deg] uppercase text-white ml-16 -mt-16">
          Discover Your Ride
          <span className="text-4xl block font-medium tracking-wider">
            Vehicles
          </span>
        </h2>
      </div>
    </main>
  );
};

export default YourRide;
