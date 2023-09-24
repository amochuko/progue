'use client';

import { PDFAnalyzerBot } from '../(models)/pdf-analyzer';

export default function AIHomePage() {
  return (
    <div className='p-4'>
      <PDFAnalyzerBot />
      {/* <TranscriptionWhisper /> */}
      {/* <ChatAssistantBot /> */}
    </div>
  );
}
