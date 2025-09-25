import React from "react"
import SkeletonItem from "../SkeletonItem";

export default function SkeletonUnidadDetalle() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-start w-full max-w-[1200px] pl-2">
        <SkeletonItem className="h-[16px] md:h-[20px] mt-1 mb-1 w-[95%] md:w-[468px] rounded" />
      </div>
      <div className="flex flex-col max-w-[1200px] w-full bg-white px-2 md:px-8">
        <div className="flex gap-8 pt-6 md:pt-12 pb-12 border-b-[1.9px] border-b-neutral-200">
          <div className='gap-2 hidden md:flex'>
            <div className='flex flex-col gap-2'>
              {
                new Array(5).fill(1).map((_, idx) => (
                  <SkeletonItem key={idx} className="h-[69px] w-[90px] rounded" />
                ))
              }
            </div>
            <SkeletonItem className="w-[640px] h-[490px]" />
          </div>
          <section className="flex flex-1 flex-col items-start text-black gap-1">
            <div className="flex justify-between items-center w-full">
              <SkeletonItem className="h-[24px] mb-2 w-[195px] rounded" />
              <SkeletonItem className="w-[130px] h-[32px] rounded" />
            </div>
            <SkeletonItem className="w-[366px] h-[28px] mt-[4px] md:h-[72px] md:mt-0" />
            <div className='gap-2 flex md:hidden aspect-[4/5] h-[calc(100vw*5/4)] w-full my-4'>
              <SkeletonItem className="w-full h-full rounded" />
            </div>
            <div className="flex gap-3 md:mt-4 font-semibold">
              <SkeletonItem className="h-[34px] w-[65px] rounded" />
              <SkeletonItem className="h-[34px] w-[108px] rounded" />
              <SkeletonItem className="h-[34px] w-[108px] rounded" />
            </div>
            <div className='w-full mt-5'>
              <SkeletonItem className="h-[26px] w-[190px] mt-2 mb-2 rounded" />
              {
                new Array(6).fill(1).map((_, idx) => (
                  <SkeletonItem key={idx} className={`w-full h-[41px] border-b-1 border-b-neutral-200 ${idx % 2 !== 0 && 'bg-white'}`} />
                ))
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
