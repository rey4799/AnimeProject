function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      return;
    case "UsernameEmpty":
      res.status(400).json({ message: "Username cannot be empty" });
      return;
    case "PasswordEmpty":
      res.status(400).json({ message: "Password cannot be empty" });
      return;
    case "InvalidLogin":
      res.status(401).json({ message: "Username/Password Invalid" });
      return;
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: " Invalid Token" });
      break;
    case "FavNotFound":
      res.status(404).json({ message: "Item not found" });
      break;
    case "FileNotFound":
      res.status(404).json({ message: "File not found" });
      break;
    case "alreadySubsribed":
      res.status(404).json({ message: "User already subscribed" });
      break;
    case "NotFound":
      res.status(404).json({ message: err.message });
      break;
    case "forbidden":
      res.status(403).json({ message: "You have to Subcribe First" });
      break;

    default:
      res.status(500).json({ message: "Internal Server Error" });
      return;
  }
  if (err.message === "Unexpected end of form") {
    res.status(400).json({ message: "File is required" });
  }
}

module.exports = errorHandler;
