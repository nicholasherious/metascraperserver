const Users = require('../models/Users');

const followUser = async (req, res) => {
  console.log(req.params.id);
  if (req.body.userId !== req.params.id) {
    try {
      const user = await Users.findById(req.params.id);

      const currentUser = await Users.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.body.userId } });
        res.status(200).json('User has been followed');
      } else {
        res.status(403).json('You already follow this user.');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You cant follow yourself');
  }
};

module.exports = { followUser };
