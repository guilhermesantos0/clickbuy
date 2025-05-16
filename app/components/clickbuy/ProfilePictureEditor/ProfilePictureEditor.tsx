import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import styles from '@/components/clickbuy/ProfilePictureEditor/styles'
import { IconSymbol } from '@/components/ui/IconSymbol'
import * as FileSystem from 'expo-file-system';
type ImageFile = {
        uri: string;
        filename: string;
        type: string;
        };
interface Props {
  currentImage: string;
  onImageChange: (file: ImageFile) => void;
}

const ProfilePictureEditor: React.FC<Props> = ({ currentImage, onImageChange }) => {
  const [profileImageFile, setProfileImageFile] = useState<ImageFile | null>(null);
  const [preview, setPreview] = useState<string>(currentImage);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permissão para acessar a galeria é necessária!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
          try {
              const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
              });
  
              if (!result.canceled) {
              const uri = result.assets[0].uri;
              const fileName = uri.split('/').pop() || 'image.jpg';
              const mimeType = 'image/jpeg';
              const file = {
                  uri: uri,
                  filename: fileName,
                  type: mimeType,
              };
  
              setProfileImageFile(file);
              setPreview(file.uri)
              onImageChange(file);
              }
          } catch (error) {
              console.error('Erro ao escolher imagem:', error);
          }
          };

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.ImageContainer} onPress={pickImage}>
      <Image
          style={styles.Image}
          source={typeof preview === 'string' ? { uri: preview } : preview}
        />

        <View style={styles.IconOverlay}>
          <IconSymbol size={24} name='pencil' color='#FFF' />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePictureEditor;
