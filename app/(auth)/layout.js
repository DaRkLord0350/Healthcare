import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 h-full flex items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex w-1/2 h-full relative">
        <Image
          src="https://images.pexels.com/photos/6129437/pexels-photo-6129437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={1000}
          height={1000}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10 flex flex-col items-center justify-center">
          <div className="backdrop-blur-sm bg-white/20 rounded-xl px-8 py-6 shadow-lg flex flex-col items-center"
               style={{ marginTop: "-10%" }}>
            <h1 className="text-4xl 2xl:text-5xl font-extrabold text-black drop-shadow text-center">
              Kinda HMS
            </h1>
            <p className="text-red-200 text-lg text-center mt-2 drop-shadow">
              You're welcome
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
