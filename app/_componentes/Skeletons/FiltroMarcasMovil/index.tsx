import React from "react"
import SkeletonItem from "../SkeletonItem";

export default function SkeletonFiltroMarcas() {
  return (
    <SkeletonItem className="w-full h-[238px]">
      <h3 className="font-semibold mb-1 text-xl mt-3 ml-3">Marcas</h3>
    </SkeletonItem>
  );
}
