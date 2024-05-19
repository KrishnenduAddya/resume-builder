import React, { useState } from 'react';
import ReactCrop from 'react-easy-crop';

const PhotoUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setModalOpen(true);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    // Handle cropped area data (e.g., save it to state)
    console.log('Cropped area:', croppedArea);
    console.log('Cropped area in pixels:', croppedAreaPixels);
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const handleUpload = () => {
    // Handle image upload (e.g., send it to the server)
    console.log('Uploading image...');
    setModalOpen(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div open={modalOpen}>
          <ReactCrop
            src={URL.createObjectURL(selectedImage)}
            crop={crop}
            zoom={zoom}
            onCropComplete={handleCropComplete}
            onChange={handleCropChange}
            onZoomChange={handleZoomChange}
          />
          <button variant="primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
