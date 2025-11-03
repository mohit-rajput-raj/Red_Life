import { useState, ChangeEvent } from "react";

export default function ImageUploadPreview() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {image ? (
        <img
          src={image}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl shadow-md border border-gray-300"
        />
      ) : (
        <div className="w-40 h-40 flex items-center justify-center text-gray-400 bg-gray-100 border border-dashed border-gray-300 rounded-xl">
          No image
        </div>
      )}

      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
