'use client';

import { useState } from 'react';

export function TranscriptionWhisper() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handlFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (!file) return;

    setFile(file);
  };

  const getTranscription = async () => {
    setIsLoading(true);

    if (!file) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set('file', file);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('file uploaded successfull');
      } else {
        console.error('Failed to upload file');
      }

      const data = await response.json();
      setResponse(data.output.text);
    } catch (err) {
      console.error('An error occurred while uploading rhe file', err);
    } finally {
      setFile(null);
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between px-24 py-5'>
      <h1 className='text-5xl font-sans'>Whisperer</h1>
      <div className='flex h-[35rem] w-[40rem] flex-col items-center bg-gray-800 rounded-xl'>
        <div className=' h-full flex flex-col gap-2 ooverflow-y-auto py-8 px-3 w-full'>
          <input type='file' accept='.wav, .mp3' onChange={handlFileChange} />

          <div className='w-[90%] h-max border-2 break-words'>
            {isLoading ? 'Loading...' : response ? response : ''}
          </div>
        </div>
        <div className=' relative w-[80%] bottom-4 flex justify-center'>
          <button
            onClick={getTranscription}
            className='w-max bg-blue-500 px-4 py-2 rounded-sm '
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
