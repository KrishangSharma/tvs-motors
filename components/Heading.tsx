export default function Heading({
  smText,
  lgText,
}: {
  smText: string;
  lgText: string;
}) {
  return (
    <h2 className="text-xs max-w-7xl mx-auto md:text-sm uppercase ">
      <span className="text-gray-400 tracking-wide">{smText}</span>
      <span className="text-2xl md:text-4xl block tracking-wider bg-gradient-to-r from-customRed to-customBlue text-transparent bg-clip-text">
        {lgText}
      </span>
    </h2>
  );
}
