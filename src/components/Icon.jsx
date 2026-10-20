const paths = {
  arrow: "M4 12h16m-6-6 6 6-6 6",
  left: "M20 12H4m6-6-6 6 6 6",
  down: "m6 9 6 6 6-6",
  mail: "M3 5h18v14H3z m0 1 9 7 9-7",
  phone: "M7 3H3v3c0 8.3 6.7 15 15 15h3v-4l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z",
  leaf: "M20 3C10 3 3 7 4 16c9 4 17-2 16-13ZM4 20 16 8",
  box: "m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8m-9 5v9M7 5.8l9 5",
  flask: "M9 3h6m-5 0v7L4 20h16l-6-10V3M7 15h10",
  globe:
    "M2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20ZM22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  file: "M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h8",
  check: "m5 12 4 4L19 6",
  chat: "M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z",
  pin: "M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "m6 6 12 12M6 18 18 6",
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  pause: "M8 5v14M16 5v14",
  play: "m8 4 12 8-12 8V4Z",
  shield: "m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Zm-4 10 3 3 5-6",
  sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
  heart: "M20 5c-3-3-7-1-8 1-1-2-5-4-8-1-5 5 8 15 8 15S25 10 20 5Z",
  facebook: "M14 22V12h4l1-4h-5V6c0-2 1-2 4-2V1h-3c-4 0-5 3-5 5v2H7v4h3v10",
  instagram:
    "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1-5h.01",
  linkedin: "M4 9v12M4 4v.01M9 21V9h4v2c4-4 7-1 7 3v7M13 12v9",
  whatsapp:
    "M20 11.5a8.5 8.5 0 0 1-12.5 7.4L3 20l1.2-4.3A8.5 8.5 0 1 1 20 11.5ZM8 7c-2 3 3 8 6 8l2-2-3-1-1 1-3-3 1-1-2-2Z",
};
export default function Icon({ name, className = "" }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.leaf} />
    </svg>
  );
}
