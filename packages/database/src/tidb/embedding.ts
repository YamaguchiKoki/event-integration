import axios from "axios";
import { env } from "@workspace/configs"

const OPENAI_API_URL = "https://api.openai.com/v1/embeddings";
const EMBEDDING_MODEL = "text-embedding-ada-002";

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        input: text,
        model: EMBEDDING_MODEL,
      },
      {
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0].embedding;
  } catch (error) {
    console.error("Failed to generate embedding:", error);
    throw new Error("Embedding generation failed");
  }
}
