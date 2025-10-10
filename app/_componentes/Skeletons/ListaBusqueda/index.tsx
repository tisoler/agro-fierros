import React from "react"
import SkeletonItem from "../SkeletonItem";

export default function SkeletonListaBusqueda() {
  return (
    <>
      {
        new Array(10).fill(null).map((_, index) => (
          <SkeletonItem key={index} className="w-full md:w-full md:max-w-[340px] h-[180px] md:h-[430px]" />
        ))
      }
    </>
  );
};
