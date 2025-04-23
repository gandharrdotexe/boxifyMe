const { uploadToCloudinary } = require("../services/uploadService");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ imageUrl: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

const getImage = (req, res) => {
  const cloudinary = require("../config/cloudinary");
  const { publicId } = req.params;
  const fullPublicId = `user_uploads/${publicId}.png`; // Optional: detect extension
  const imageUrl = cloudinary.url(fullPublicId);
  res.json({ imageUrl });
};

module.exports = { uploadImage, getImage };
