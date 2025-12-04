import feedBack from "../models/feedbackModels.js";

//Create New Feedback
const createFeedback = async (req, res) => {
  try {
    const { name, role, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFeedback = await feedBack.create({
      name,
      role,
      message,
    });

    return res.status(201).json({ message: "Feedback added", newFeedback });
  } catch (error) {
    console.error("Create error", error);
    return res.status(500).json({ message: "internal server erro" });
  }
};

//get all Feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await feedBack.find({ approved: true }).sort({
      createdAt: -1,
    });
    return res.json(getAllFeedback);
  } catch (error) {
    console.error("Fetch err", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
