import React from "react";

const page = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <div className="w-1/3 border min-h-72 p-5 flex flex-col gap-y-5">
        <div className="mb-2 border-b">
          <h1 className="text-2xl text-white text-center">Profile</h1>
        </div>
        <h1 className="text-white text-lg">Shailesh Kuamr</h1>
        <h1 className="text-white text-lg">Shaielsh@google.com</h1>
        <button className="px-6 py-2 rounded-md bg-green-600">Logout</button>
      </div>
    </div>
  );
};

export default page;
