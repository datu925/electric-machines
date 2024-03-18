import path = require("node:path");
import fs = require("node:fs/promises");
import { Brand } from "./table_merger";

export type Metadata = {
  brandName?: Brand;
};

export async function retrieveMetadata(directory: string): Promise<Metadata> {
  const metadata_file = path.join(directory, "metadata.json");
  try {
    const metadata: Metadata = JSON.parse(
      await fs.readFile(metadata_file, { encoding: "utf8" })
    );
    return metadata;
  } catch (e) {
    console.log(`No metadata file found: ${metadata_file}`);
  }
  return {};
}
