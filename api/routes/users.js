const router = require("express").Router();
const Users = require("../models/Users");
const verify = require("../verifyToken");
const CryptoJS = require("crypto-js");

// Update
router.put("/:id", verify, async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    // If we are updating password encrypt it
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can update only your details !!");
  }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can delete only your account !!");
  }
});

// Get 1 user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const { password, ...otherDetails } = user._doc;

    res.status(200).json(otherDetails);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get ALL users
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const query = req.query.new;
    try {
      const users = query
        ? await Users.find().sort({ _id: -1 }).limit(10)
        : await Users.find();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can access only your account !!");
  }
});

router.get("/stats", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);

    try {
      const data = await Users.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot access stats !!");
  }
});

module.exports = router;
