import Image from "next/image";

const Card = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="flex gap-2 p-1 md:p-2">
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="rounded-lg object-cover object-center"
        />
      </div>
      <p className="text-lg text-slate-700 text-ellipsis">{title}</p>
    </div>
  );
};

export default Card;
