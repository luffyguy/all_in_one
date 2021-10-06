import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

const CloudinaryImages = () => {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/cloudinary/images"
      );
      const data = await res;
      console.log(data.data);
      setImageIds(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div>
      <h1 className="title">Images</h1>
      {imageIds &&
        imageIds.map((imageId, index) => (
          <Image
            key={index}
            cloudName="luffyguy"
            publicId={imageId}
            width="300"
            crop="scale"
          />
        ))}
    </div>
  );
};

export default CloudinaryImages;
