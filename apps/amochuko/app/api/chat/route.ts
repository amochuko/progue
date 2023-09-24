import { PINECONE } from '@/lib/config';
import { PineconeClient } from '@pinecone-database/pinecone';
import { LangChainStream, StreamingTextResponse } from 'ai';
import { CallbackManager } from 'langchain/callbacks';
import { VectorDBQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { NextRequest } from 'next/server';

// This is the route we will use when asking a question to our chatbot, which will then read from the vector store and use OpenAI models to give us back a response.

export async function POST(req: NextRequest) {
  // Parse the POST request's JSON body
  const body = await req.json();

  // use Vercel's `ai` package to setup a stream
  const { stream, handlers } = LangChainStream();

  // init Pinecone client
  const pineconeClient = new PineconeClient();
  await pineconeClient.init({
    apiKey: PINECONE.API_KEY ?? '',
    environment: PINECONE.ENVIRONMENT as string,
  });
  const pineconeIndex = pineconeClient.Index(PINECONE.INDEX_NAME as string);

  // Initialize our vetor store
  const vectorstore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  // specify the OpenAI model we'd like to use, and turn on streaming
  const model = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    streaming: true,
    callbacks: CallbackManager.fromHandlers(handlers),
  });

  // define the Langchain chain
  const chain = VectorDBQAChain.fromLLM(model, vectorstore, {
    k: 1,
    returnSourceDocuments: true,
  });

  // call our chain with the prompt given by the user
  chain.call({ query: body.prompt }).catch(console.error);

  // return output stream
  return new StreamingTextResponse(stream);
}
