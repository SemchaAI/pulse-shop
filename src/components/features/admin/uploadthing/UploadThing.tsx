'use client';
import { UploadDropzone } from '@/utils/uploadthing/uploadthing';
import css from './uploadThing.module.scss';
import { useState } from 'react';
import { ClientUploadedFileData } from 'uploadthing/types';
import { Copy } from 'lucide-react';

export const UploadThing = () => {
  const [files, setFiles] = useState<
    ClientUploadedFileData<{
      uploadedBy: string;
      url: string;
    }>[]
  >([]);
  return (
    <div className={css.container}>
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setFiles(res);
          console.log('Files: ', res);
          // alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        onUploadAborted={() => alert('Upload aborted!')}
      />

      <div className={css.fileList}>
        {files.map((file) => (
          <div
            key={file.key}
            className={css.file}
          >
            <p>Name: {file.name}</p>
            <p className={css.url}>
              URL: <a href={file.url}>LINK</a>
              <Copy
                className={css.copyIcon}
                size={16}
                onClick={() =>
                  navigator.clipboard.writeText(file.url.split('/f/')[1])
                }
              />
            </p>
            <p>Uploaded by: {file.serverData.uploadedBy}</p>
            <p>Size: {file.size}</p>
            <p>Type: {file.type}</p>
          </div>
        ))}
      </div>
      {files.length > 0 && (
        <div className={`${css.file} ${css.links}`}>
          Array of links{' '}
          <Copy
            className={css.copyIcon}
            size={16}
            onClick={() =>
              navigator.clipboard.writeText(
                JSON.stringify(files.map((f) => f.url.split('/f/')[1]))
              )
            }
          />
        </div>
      )}
    </div>
  );
};
