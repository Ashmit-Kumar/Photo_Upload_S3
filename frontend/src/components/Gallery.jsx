import React from "react";

const Gallery = ({ images }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt={image.filename} style={{ width: "100%" }} />
      ))}
    </div>
  );
};

export default Gallery;
