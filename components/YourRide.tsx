import React from "react";
const YourRide = () => {
  return (
    <main className="w-full">
      <div className="w-full md:w-1/2 bg-blue-500 transform -skew-x-[34deg] pl-8 md:pl-16 -ml-8 md:-ml-10 py-4 md:py-8 font-roboto">
        <div className="uppercase font-bold text-blue-700 opacity-10 text-4xl md:text-6xl pl-20 md:pl-44 transform skew-x-[34deg] tracking-widest">
          Vehicles
        </div>
        <h2 className="text-xs md:text-sm transform skew-x-[34deg] uppercase text-white ml-8 md:ml-16 -mt-8 md:-mt-16">
          Discover Your Ride
          <span className="text-2xl md:text-4xl block font-medium tracking-wider">
            Vehicles
          </span>
        </h2>
      </div>
    </main>
  );
};

export default YourRide;
