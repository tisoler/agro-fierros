import React from "react"
import SkeletonItem from "../SkeletonItem";

export default function SkeletonCarruselUnidades({ variante = 'grande' }: { variante?: 'grande' | 'chico' }) {
  return (
    <div className={`
      flex flex-col w-full ${variante === 'grande' ? 'py-12 md:py-20 px-2 md:px-20' : 'pt-4 pb-12 md:pt-10 md:pb-20 px-0'} 
    `}>
      <div className="">
        { variante === 'grande' && <SkeletonItem className="h-[25px] w-[25px] rounded-lg mb-2 ml-1" />}
        <SkeletonItem className="h-[30px] md:h-[36px] w-[200px] md:w-[285px] rounded-2xl" />
      </div>
      <div className="flex items-center relative w-full overflow-hidden pt-6">
        <SkeletonItem className="h-[32px] w-[32px] rounded hidden md:flex" />
        <div className='flex gap-4 md:mx-1 overflow-x-hidden md:w-[calc(100%-64px)]'>
          {
            new Array(6).fill(true).map((_, idx) => (
              <div key={idx} className="w-[240px] md:w-[280px] border-1 border-gray-300 flex flex-col justify-between">
                <SkeletonItem className="w-[240px] md:w-[280px] h-[220px] md:h-[250px]"/>
                <div className="w-full h-[72px] border-b-1 border-b-gray-300"/>
                <div className="flex">
                  <div className="w-full h-[63px] border-b-1 border-b-gray-300"/>
                  <div className="w-full h-[63px] border-b-1 border-b-gray-300 border-x-1 border-x-gray-300"/>
                  <div className="w-full h-[63px] border-b-1 border-b-gray-300"/>
                </div>
                <SkeletonItem className="w-[240px] md:w-[280px] h-[44px]"/>
              </div>
            ))
          }
        </div>
        <SkeletonItem className="h-[32px] w-[32px] rounded hidden md:flex" />
      </div>
    </div>
  );
}
