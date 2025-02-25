export const Heading = ({
  bg,
  bgText,
  textSm,
  textLg,
}: {
  bg: string;
  bgText: string;
  textSm: string;
  textLg: string;
}) => {
  return (
    <div
      className={`w-1/2 bg-${bg} transform -skew-x-[34deg] pl-16 -ml-10 py-8 font-roboto`}
    >
      <div
        className={`uppercase font-bold text-${bg} opacity-10 text-6xl pl-44 transform skew-x-[34deg] tracking-widest`}
      >
        {/* Background text */}
        {bgText}
      </div>
      <h2 className="text-sm transform skew-x-[34deg] uppercase text-white ml-16 -mt-16">
        {textSm}
        <span className="text-4xl block font-medium tracking-wider">
          {textLg}
        </span>
      </h2>
    </div>
  );
};
