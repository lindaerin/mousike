"use client";

import { useState, useEffect } from "react";
import useKeyboardEvent from "@/hooks/useKeyboardEvent";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.NODE_ENV === "production" ? "/mousike" : "");

const lofiBackgroundUrl = `${basePath}/images/lofi.jpg`;

export interface AudioFile {
  title: string;
  url: string;
}

const Home = () => {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const res = await fetch(`${basePath}/audio/manifest.json`);

        if (!res.ok) throw new Error("Failed to fetch audio manifest");

        const data = await res.json();

        const audioFiles = data.files.map((file: string) => ({
          title: file.replace(".mp3", ""),
          url: `${basePath}/audio/${file}`,
        }));

        setAudios(audioFiles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudioFiles();
  }, []);

  useKeyboardEvent("z", () => {
    setIsVisible((prev) => !prev);
  });

  return (
    <main
      className="h-screen w-screen flex items-center justify-center p-6 relative transition-all duration-500 bg-[#2e2222] text-[#f0d9b5]"
      style={{
        backgroundImage: `url(${lofiBackgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`fixed top-10 right-10 p-4 rounded-lg shadow-lg w-96 backdrop-blur-md bg-[#9BB5DF]/60 border border-[#9BB5DF] audio-container ${
          isVisible ? "" : "hidden"
        }`}
      >
        Main Page
      </div>
    </main>
  );
};

export default Home;
