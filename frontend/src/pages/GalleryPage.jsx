import React, { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import { fetchImages } from "../services/api";

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchImages();
      setImages(data);
    };
    loadImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <Gallery images={images} />
    </div>
  );
};

export default GalleryPage;
