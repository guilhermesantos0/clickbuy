import React, { useState } from 'react';
import styles from './ProfilePictureEditor.module.scss';
import { useDropzone } from 'react-dropzone';

import { FaPencilAlt } from 'react-icons/fa';

const PencilIcon = FaPencilAlt as any;

interface ProfilePictureEditorProps {
  currentImage: string;
  onImageChange: (file: File) => void;
}


const ProfilePictureEditor: React.FC<ProfilePictureEditorProps> = ({ currentImage, onImageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
      setIsModalOpen(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper} onClick={() => setIsModalOpen(true)}>
        <img src={preview} alt="Profile" className={styles.profileImage} />
        <div className={styles.overlay}>
          <PencilIcon className={styles.icon} />
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div {...getRootProps()} className={styles.dropzone}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Solte a imagem aqui...</p>
              ) : (
                <p>Clique ou arraste uma imagem para fazer upload</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureEditor;
