import { useFilePicker } from 'use-file-picker';
import React from 'react';
import 'bulma/css/bulma.min.css';

export default function FileChooser() {
  const [openFileSelector, { filesContent, loading}] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 0.1, // in megabytes
    maxFileSize: 50,
    imageSizeRestrictions: {
      maxHeight: 9000, // in pixels
      maxWidth: 1600,
      minHeight: 50,
      minWidth: 768,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="is-flex">
      <button onClick={() => openFileSelector()} className="button is-medium">Logo de la empresa</button>
      {filesContent.map((file, index) => (
        <div key={index} className="is-flex">
        <img className="image is-48x48" alt={file.name} src={file.content}></img>
          <h3 className="title is-4">{file.name}</h3>
        </div>
      ))}
    </div>
  );
}