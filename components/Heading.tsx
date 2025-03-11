export default function Heading({
  smText,
  lgText,
}: {
  smText: string;
  lgText: string;
}) {
  return (
    <h2 className=" text-xs mx-auto md:text-sm uppercase flex flex-col">
      <span className="text-gray-400 tracking-wide">{smText}</span>
      <span className="max-w-max text-2xl md:text-4xl font-bold block tracking-wider bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
        {lgText}
      </span>
    </h2>
  );
}
