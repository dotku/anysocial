import type { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

console.log("process.env.PROJECT_REF", process.env.SUPABASE_PROJECT_REF);

const config: CodegenConfig = {
  schema: {
    [`https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/graphql/v1`]:
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
        },
      },
  }, // Using the local endpoint, update if needed
  documents: "src/**/*.tsx",
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["npm run prettier"], // optional
  },
};

export default config;
