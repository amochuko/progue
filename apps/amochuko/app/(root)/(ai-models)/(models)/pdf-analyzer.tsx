'use client';

import { useCompletion } from 'ai/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const PDFAnalyzerBot = () => {
  const [alertMsg, setAlertMsg] = useState('');
  const [isFileUploading, setIsFileUploading] = useState(false);

  // When a file is dropped in the dropzone, call the `/api/addData` API to train our bot on a new PDF File
  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0];

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }
    const formData = new FormData();
    formData.set('file', file);

    try {
      setIsFileUploading(true);
      const res = await fetch('/api/ai/upload', {
        method: 'POST',
        body: formData,
      });

      const body = await res.json();

      if (!body.success) {
        setIsFileUploading(false);
        throw body;
      } else {
        setAlertMsg('Data added successfully');
      }
    } catch (err: any) {
      setIsFileUploading(false);
      setAlertMsg(err.data.error);
    }
  }, []);

  // configure react-dropzone
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({ onDrop });

  // for rejected files
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.type}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  // Vercel AI hook for generating completions through an AI model
  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    error,
  } = useCompletion({ api: '/api/chat' });

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div
        {...getRootProps({
          className:
            'dropzone bg-gray-900 border border-gray-80 p-8 rounded-md hover:bg-gray-800 transition-colors duration-200 ease-in-out cursor-pointer',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className='text-white'>
            {' '}
            {isFileUploading ? 'File uploading...' : 'Drop the files here...'}
          </p>
        ) : (
          <p className='text-white'>
            {isFileUploading
              ? 'File uploading...'
              : 'Drag and drop some files here, or click to select files'}
          </p>
        )}
      </div>
      <br />
      {!isFileUploading && alertMsg && (
        <p className=' text-gray-800 border p-2 rounded-sm bg-red-200 '>
          {alertMsg}
        </p>
      )}

      <div className='mx-auto w-full items-center max-w-md py-24 flex flex-col stretch'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            className='w-full max-w-md text-black border border-gray-300 rounded shadow-xl p-2'
            value={input}
            placeholder='Enter your prompt...'
            onChange={handleInputChange}
          />

          <button
            disabled={isLoading}
            type='submit'
            className='py-2 border rounded-lg bg-gray-900 text-sm text-white'
          >
            Submit
          </button>

          {error?.message && (
            <p className='text-center text-gray-800 border p-2 rounded-sm bg-red-200 '>
              Error processing chat: {error.message}
            </p>
          )}

          {isLoading && <p className='text-center'>Thinking...</p>}
          {completion && <p className='text-center'>Anwser: {completion}</p>}
        </form>
      </div>
    </main>
  );
};
