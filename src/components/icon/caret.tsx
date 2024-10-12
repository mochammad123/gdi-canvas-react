const rotateList = {
    top: "rotate(180deg)",
    bottom: "rotate(0deg)",
    right: "rotate(-90deg)",
    left: "rotate(90deg)",
}
export default function CaretIcon({ className, rotate="bottom", width="13", height="8" }: { className?:string; rotate?: keyof typeof rotateList; width?:string; height?:string }) {
  return (
    <svg
    style={{transform: rotateList[rotate]}}
      width={width}
      height={height}
      className={className}
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.375 0.5L6.5 7.5L12.625 0.5H0.375Z"
        fill="#1D1F26"
      />
    </svg>
  );
}
