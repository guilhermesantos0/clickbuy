import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import styles from '@/components/clickbuy/ProfilePictureEditor/styles'
import { IconSymbol } from '@/components/ui/IconSymbol'
import * as FileSystem from 'expo-file-system';

interface Props {
  currentImage: string;
  onImageChange: (file: { uri: string; name: string | undefined; type: string; }) => void;
}

const ProfilePictureEditor: React.FC<Props> = ({ currentImage, onImageChange }) => {
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
        setPreview(uri);
  
        const fileInfo = await FileSystem.getInfoAsync(uri);
        const fileUri = fileInfo.uri;
        const fileName = fileUri.split('/').pop();
        const mimeType = 'image/jpeg';
  
        const fileBlob = {
          uri: fileUri,
          name: fileName,
          type: mimeType,
        };
  
        onImageChange(fileBlob);
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
