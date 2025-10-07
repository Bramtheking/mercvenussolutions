export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER,
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", cloudinaryConfig.uploadPreset!)
  formData.append("folder", cloudinaryConfig.folder!)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    throw error
  }
}

export function getCloudinaryUrl(publicId: string, transformations?: string): string {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`
  if (transformations) {
    return `${baseUrl}/${transformations}/${publicId}`
  }
  return `${baseUrl}/${publicId}`
}
