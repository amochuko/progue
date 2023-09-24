import { PINECONE } from '@/lib/config';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { NextRequest, NextResponse } from 'next/server';

// This function accepts a pdf file from a user upload,
// decode the data on the file with an trains an AI model
// with the data then provides answers to questions relate to the file content

export async function POST(req: NextRequest) {
  // extract form data from the request
  const data = await req.formData();

  // extract the uploaded file from the FormData
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file found!' });
  }

  // check file is pdf type
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ success: false, error: 'Invalid file type' });
  }

  // TODO: Check against file size
  if (file.size > 2000000000) {
    return NextResponse.json({
      success: false,
      error: 'File size can not exceed 2MB',
    });
  }

  // use PDFLoader to load the PDF and split it inot smaller docs

  const pdfLoader = new PDFLoader(file);
  const splitDocs = await pdfLoader.loadAndSplit();

  /**
   * Pinecoine is an Vector database
   * init Pinecone client
   */
  const pineconeClient = new PineconeClient();
  await pineconeClient.init({
    apiKey: PINECONE.API_KEY as string,
    environment: PINECONE.ENVIRONMENT as string,
  });

  const pIndexName = PINECONE.INDEX_NAME as string;
  // pick the index to work with
  const pineconeIndex = pineconeClient.Index(pIndexName);

  try {
    /**
     * Insert data
     * LangChain, a framework for building applications
     * powered by large language models (LLMs).
     */
    // use Langchain's integration with Pinecone to store the doc
    await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });
  } catch (err: any) {
    // return NextResponse.json({
    //   success: false,
    //   data: {
    //     error: err.message,
    //   },
    // });

    return NextResponse.json(
      { success: false, data: { error: err.message } },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      size: file.size,
      name: file.name,
      lastModified: file.lastModified,
      type: file.type,
    },
  });
}

export async function GET(req: NextRequest) {
  const body = req.body;

  console.log(['body: ', body]);

  return NextResponse.json({ hey: 'Hello world!' });
}
