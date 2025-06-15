type AptDetailsProps = {
  title: string;
  description: string;
  rooms: number;
  price: number;
};

export const AptDetails = ({
  title,
  description,
  rooms,
  price,
}: AptDetailsProps) => (
  <div className="w-1/2">
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-gray-600 my-4">{description}</p>
    <div className="flex justify-between text-lg font-medium text-gray-700">
      <span>{rooms} rooms</span>
      <span>${price} /month</span>
    </div>
  </div>
);
