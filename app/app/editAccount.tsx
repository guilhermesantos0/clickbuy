import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import ProfilePictureEditor from '@/components/clickbuy/ProfilePictureEditor/ProfilePictureEditor'
import { useUser } from '@/contexts/UserContext';
const genericPhoto = require('@/assets/ClickBuy/iconeGenerico.png');
import ip from '@/ip'
import fourthStep from './styles/Cadastro/fourthStep';

const editAccount = () => {
  const {user, setUser} = useUser();

  const [profileImage, setProfileImage] = useState(
    user?.profilePic ? `http://${ip}:5000${user?.profilePic}` : genericPhoto
  );
  
  const handleImageChange = (file: { uri: string; name: string | undefined; type: string; }) => {
    const imageUrl = file.uri;
    console.log(imageUrl)
    setProfileImage(imageUrl);
  };
  
  
  return (
    <View>
      <ProfilePictureEditor 
        currentImage={profileImage} 
        onImageChange={handleImageChange} 
      />
      <Text style ={fourthStep.text}>Nome</Text>
                  <TextInput
                    style={[fourthStep.Input]}
                    value={user?.personalData.name}
                    onChangeText={() => console.log('oi')}
                    keyboardType='default'
                    autoCapitalize="none"
                  />
    </View>
  );
  
}

export default editAccount