import { ReactNode } from "react";

function SkeletonItem({ className = "", children }: { className?: string, children?: ReactNode }) {
  return (
    <div 
      className={`relative overflow-hidden bg-gray-300 ${className}`}
    >
      {/* Efecto de barrido */}
      <div className="absolute inset-0 -translate-x-full animate-sweep bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
      {children}
    </div>
  );
}

export default SkeletonItem;

