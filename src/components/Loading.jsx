import { useEffect } from "react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Loading...</h1>
      <div className="animate-spin rounded-full w-12 border-b-4 border-blue-500">
        <img src="images/pokeball.png" alt="pokeball" className="" />
      </div>
    </div>
  );
}
