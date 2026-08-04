import { useState } from "react";
import { FaStar } from "react-icons/fa";

function Rating() {
  const [rating, setRating] = useState(4);

  return (
    <div className="mt-6">

      <div className="flex items-center gap-2">

        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl cursor-pointer transition hover:scale-125 ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-500"
            }`}
          />
        ))}

        <span className="text-gray-300 ml-3 text-lg">
          {rating}.0 / 5
        </span>

      </div>

    </div>
  );
}

export default Rating;