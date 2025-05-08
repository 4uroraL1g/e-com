import axios from "axios";

// Cloudinary configuration
const CLOUD_NAME = "dkeysvv8o"; // Matches your Cloudinary account
const UPLOAD_PRESET = "ml_default"; // Replace with the correct upload preset
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Uploads an image to Cloudinary.
 * @param {File} file - The file to upload.
 * @returns {Object} - An object containing the public ID and secure URL of the uploaded image.
 */
export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // Correct key for file upload
    formData.append("upload_preset", UPLOAD_PRESET); // Ensure this matches your Cloudinary configuration

    const { data } = await axios.post(CLOUDINARY_URL, formData);

    return {
      publicId: data?.public_id,
      url: data?.secure_url,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};