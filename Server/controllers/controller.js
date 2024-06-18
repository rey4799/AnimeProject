const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Favorite } = require("../models");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const midtransClient = require("midtrans-client");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CloudName,
  api_key: process.env.CLOUDINARY_APIKey,
  api_secret: process.env.CLOUDINARY_APISecret,
  secure: true,
});

class Controller {
  // untuk User
  static async addUser(req, res, next) {
    try {
      const newUser = await User.create(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
  static async postlogin(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) throw { name: "UsernameEmpty" };
      if (!password) throw { name: "PasswordEmpty" };

      const user = await User.findOne({ where: { username } });
      if (!user) throw { name: "InvalidLogin" };
      const result = comparePass(password, user.password);
      if (!result) throw { name: "InvalidLogin" };
      const token = createToken({ id: user.id });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const loginUser = await User.findByPk(req.user.id);
      if (!loginUser) {
        throw {
          name: "NotFound",
          message: `loginUser id ${req.params.id} not found`,
        };
      }
      // console.log(req.file);
      const base64String = req.file.buffer.toString("base64");
      const dataUrl = `data:${req.file.mimetype};base64,${base64String}`;

      let cloudinaryResult = await cloudinary.uploader.upload(dataUrl, {
        public_id: req.file.originalname,
        folder: "test",
      });
      console.log(cloudinaryResult);

      if (req.file) {
        await loginUser.update({ avatarUrl: cloudinaryResult.secure_url });
      }

      await loginUser.update({
        username: req.body.username,
        email: req.body.email,
      });
      res.json(loginUser);
    } catch (error) {
      next(error);
    }
  }

  // Untuk Anime
  static async getAllAnime(req, res, next) {
    try {
      let url = "https://api.jikan.moe/v4/anime";

      const animes = await axios({
        method: "get",
        url,
        params: req.query,
      });

      res.json(animes.data);
    } catch (error) {
      next(error);
    }
  }
  static async getAnimeById(req, res, next) {
    try {
      const anime = await axios({
        method: "get",
        url: "https://api.jikan.moe/v4/anime/" + req.params.id,
      });
      if (!anime) {
        throw {
          name: "NotFound",
          message: `Anime id ${req.params.id} not found`,
        };
      } else {
        res.json(anime.data);
      }
    } catch (error) {
      next(error);
    }
  }

  //Untuk Favorites
  static async getAllFavorite(req, res, next) {
    try {
      const favorites = await Favorite.findAll({
        where: { UserId: req.user.id },
      });

      const favAnime = [];

      for (let index = 0; index < favorites.length; index++) {
        const element = favorites[index];

        console.log(element);
        const fav = element.toJSON();
        console.log(fav);
        const { data } = await axios({
          method: "get",
          url: "https://api.jikan.moe/v4/anime/" + element.AnimeId,
        });
        fav.anime = data.data;
        favAnime.push(fav);
      }

      res.json(favAnime);
    } catch (error) {
      next(error);
    }
  }
  static async createFavorite(req, res, next) {
    try {
      const UserId = req.user.id;
      console.log(UserId);
      const AnimeId = req.body.animeId;
      console.log(AnimeId);
      const favorite = await Favorite.create({ UserId, AnimeId });
      res.status(201).json(favorite);
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      const deleted = await Favorite.destroy({ where: { id: req.params.id } });
      if (deleted) {
        res.json({ message: "Item has been deleted" });
      } else {
        throw {
          name: "FavNotFound",
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async subscription(req, res, next) {
    try {
      await User.update(
        {
          role: "superUser",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      res.json({ message: `User with id ${req.user.id} now is a subscriber` });
    } catch (error) {
      next(error);
    }
  }
  static async generateMidtransToken(req, res, next) {
    try {
      const findUser = await User.findByPk(req.user.id);
      if (findUser.role === "superUser") {
        throw { name: "alreadySubscribed" };
      }

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000), //harus unique
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: findUser.username,
          email: findUser.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      // console.log(midtransToken);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
  static async ai(req, res, next) {
    try {
      if (!req.file) {
        throw { name: "FileNotFound" };
      }
      // console.log(req.file);
      const base64String = req.file.buffer.toString("base64");

      // Call the AI model function (assuming `genAI` is configured)
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = "what anime corresponds to this picture?";

      // const imageParts = fileToGenerativePart(cloudinaryResult.secure_url);
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64String,
            mimeType: req.file.mimetype,
          },
        },
      ]);
      console.log(result);
      const response = result.response;
      const text = response.text();

      console.log(text);
      res.json({ message: "Images uploaded and analyzed. Anime:", text });

      // res.json({ message: "foto upload" });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_ID,
      });
      console.log(ticket);
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: String(Math.floor(1000000 + Math.random() * 9000000)),
        },
      });

      const access_token = createToken({ id: user.id });

     res.json({access_token})
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
