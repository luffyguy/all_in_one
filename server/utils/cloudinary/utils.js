import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name || "luffyguy",
  api_key: process.env.Cloudinary_Key || 583833116582731,
  api_secret: process.env.Cloudinary_Secret || "5edWeeV_ZejzJ41rpv3zRh3x0AQ",
});

export default cloudinary;
