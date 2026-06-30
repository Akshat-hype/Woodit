const IMAGE_MAX_DIMENSION = 1920;
const IMAGE_QUALITY = 0.78;

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Could not compress image"));
      },
      type,
      quality,
    );
  });

export const compressImageForUpload = async (file) => {
  if (!file?.type?.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  const image = await createImageBitmap(file);
  const scale = Math.min(
    1,
    IMAGE_MAX_DIMENSION / Math.max(image.width, image.height),
  );
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, width, height);
  image.close?.();

  const blob = await canvasToBlob(canvas, "image/webp", IMAGE_QUALITY);

  if (blob.size >= file.size) {
    return file;
  }

  const name = file.name.replace(/\.[^.]+$/, ".webp");
  return new File([blob], name, {
    type: "image/webp",
    lastModified: Date.now(),
  });
};
