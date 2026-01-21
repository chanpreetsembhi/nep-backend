// adminController.js
import Admin from "../models/admin.model.js"; // Adjust path to your Admin model

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin in database
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Direct password comparison (or use bcrypt if passwords are hashed)
    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      isAdmin: true,
      user: {
        id: admin._id,
        username: admin.username,
        role: "admin"
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    
    const admin = await Admin.findById(id).select('-password'); // Exclude password
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: admin._id,
        username: admin.username,
        role: "admin"
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};