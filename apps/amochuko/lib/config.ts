const OPENAI = { API_KEY: process.env.OPENAI_API_KEY };

const PINECONE = {
  API_KEY: process.env.PINECONE_API_KEY,
  INDEX_NAME: process.env.PINECONE_INDEX_NAME,
  ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
};

export { OPENAI, PINECONE };
