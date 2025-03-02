import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const audioDirectory = path.join(process.cwd(), "public", "audio");

  fs.readdir(audioDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read audio files" });
    }

    const audioFiles = files.filter((file) => file.endsWith(".mp3"));

    res.status(200).json(audioFiles);
  });
}
