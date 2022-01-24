import React, { useState } from 'react';
import { Box, Typography, Input, InputLabel, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import SettingHeader from '../SettingsHeader/SettingsHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import uploadProfilePhoto from '../../helpers/APICalls/uploadProfilePhoto';
import { useSnackBar } from '../../context/useSnackbarContext';
import deleteProfilePhoto from '../../helpers/APICalls/deleteProfilePhoto';

const ProfilePhoto = (): JSX.Element => {
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>('');
  const { updateSnackBarMessage } = useSnackBar();

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    setIsUploading(true);
    uploadProfilePhoto(formData).then((data) => {
      if (data.error) {
        console.error(data.error);
        updateSnackBarMessage(data.error);
      }
      setPhoto(data.imagePath);
    });
    setIsUploading(false);
    setFile(undefined);
  };

  const deletePhoto = () => {
    deleteProfilePhoto(photo);
    setPhoto('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SettingHeader header="Profile Photo" />
      <Avatar
        alt="profile photo"
        src={photo && `http://localhost:3001/profile${photo}`}
        sx={{ width: 120, height: 120, marginBottom: 4 }}
      />
      <Box textAlign="center">
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'secondary.main' }}>
          Be sure to use a photo that <br /> clearly shows your face
        </Typography>
        <form>
          <Input id="button-file" name="avatar" type="file" onChange={handleImgChange} sx={{ opacity: 0 }} />
          <InputLabel htmlFor="button-file">
            {isUploading ? (
              <LoadingButton loading sx={{ px: 1.5, py: 2, mb: 3 }} />
            ) : (
              <Button component="span" variant="outlined" color="primary" size="large" sx={{ px: 1.5, py: 2, mb: 3 }}>
                Upload a file from your device
              </Button>
            )}
          </InputLabel>
        </form>
        <Button
          variant="text"
          startIcon={<DeleteIcon color="info" />}
          color="secondary"
          sx={{ textTransform: 'none' }}
          onClick={deletePhoto}
        >
          Delete photo
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
