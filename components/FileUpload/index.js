import { ChangeEvent, useRef, useState } from 'react';
import { Button, CardMedia, ImageListItem } from '@mui/material';
import request from '@/Util/request';
import url from '@/constant/url';
import Image from 'next/image';

export default function CustomFileInput({setName, name}) {
  const [file, setFile] = useState();
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    // 🚩 do the file upload here normally...
    request.post('/course/upload', formData).then(response => {
      console.log(response.data);
      setName(response.data)
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <div>

      {/* 👇 Our custom button to select and upload a file */}
      <Button variant={'contained'} onClick={handleUploadClick}>
        {'选择文件'}
      </Button>

      {/* 👇 Notice the `display: hidden` on the input */}
      {name && <ImageListItem sx={{maxWidth: '300px'}}><img src={url + '/' + name}  alt={'11'}/></ImageListItem> }
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
