const fs = require("fs");
const path = require("path");

const audioDirectory = path.join(__dirname, "../public/audio");
const manifestFilePath = path.join(audioDirectory, "manifest.json");

try {
  if (!fs.existsSync(audioDirectory)) {
    console.error("❌ Error: Audio directory does not exist:", audioDirectory);
    process.exit(1);
  }

  const files = fs.readdirSync(audioDirectory);
  const audioFiles = files.filter((file) => file.endsWith(".mp3"));

  const manifest = { files: audioFiles };

  fs.writeFileSync(manifestFilePath, JSON.stringify(manifest, null, 2));

  console.log("✅ Manifest generated successfully:", manifestFilePath);
} catch (error) {
  console.error("❌ Error generating manifest:", error);
  process.exit(1);
}
