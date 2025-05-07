import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfilePictureEditor from '@/components/clickbuy/ProfilePictureEditor/ProfilePictureEditor'
import { useUser } from '@/contexts/UserContext';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');
import ip from '@/ip'

const editAccount = () => {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState(
    user?.profilePic ? `http://${ip}:5000${user?.profilePic}` : genericPhoto
  );
  
  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };
  
  return (
    <View>
      <ProfilePictureEditor 
        currentImage={profileImage} 
        onImageChange={handleImageChange} 
      />
    </View>
  );
  
}

export default editAccount