import cloudinary from "../../utils/cloudinary/utils.js";

export const uploadToCloudinary = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr);
    console.log(uploadedResponse);
    res.status(200).json({ message: "Uploaded" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getFromCloudinary = async (req, res) => {
  try {
    const { resources } = await cloudinary.v2.search
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.json(publicIds);
  } catch (error) {
    res.status(500).json(error);
  }
};
