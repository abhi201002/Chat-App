const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  search,
  findFriends
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/search/:username/:cur_user", search)
router.get("/friends", findFriends)

module.exports = router;
