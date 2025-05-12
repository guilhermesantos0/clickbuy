import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';

interface Props {
  images: String[] | undefined;
  mainImage: String | undefined;
}

const ImageGallery: React.FC<Props> = ({ images, mainImage }) => {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className={styles.GalleryWrapper}>
      <div className={styles.Thumbnails}>
        {images?.map((img, index) => (
          <div
            key={index}
            className={`${styles.Thumb} ${selectedImage === img ? styles.Active : ''}`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={`http://localhost:5000${img}`} alt={`Miniatura ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className={styles.MainImageBox}>
        <div className={styles.MainImageContainer}>
          <img src={`http://localhost:5000${selectedImage}`} alt="Imagem principal" className={styles.MainImage} />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
