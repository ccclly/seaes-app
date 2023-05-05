import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';

const Input = styled('input')({
  display: 'none',
});

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file);
    // 这里可以将文件上传到服务器

  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          size={'small'}
        >
          选择文件
        </Button>
      </label>
      <TextField
        id="outlined-basic"
        label="File Name"
        variant="outlined"
        value={file ? file.name : ''}
        InputProps={{
          readOnly: true,
        }}
        size={'small'}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!file}
      >
        上传
      </Button>
    </form>
  );
}

export default FileUpload;
