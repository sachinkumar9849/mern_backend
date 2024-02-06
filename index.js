require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { createProduct } = require("./controller/Product");
const sliderRouter = require("./routes/Slider");
const productsRouter = require("./routes/Products");
const wishlistRoutes = require("./routes/Wishlist");
const categoriesRouter = require("./routes/Categories");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieParser = require("cookie-parser");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { User } = require("./model/User");
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");
const path = require("path")

// JWT option
const opts = {};
opts.jwtFromRequest = cookieExtractor;

opts.secretOrKey = process.env.JWT_SECRET_KEY;

//middlewares
// server.use(express.static("build"));
server.use(express.static(path.resolve(__dirname,"build")))
server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", isAuth(), productsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", ordersRouter.router);
server.use("/slider", isAuth(), sliderRouter.router);
server.use("/wishlist", isAuth(), wishlistRoutes.router);

// Passport Strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid credentials" });
          }
          const token = jwt.sign(
            sanitizeUser(user),
            process.env.JWT_SECRET_KEY
          );
          done(null, { id: user.id, role: user.role, token });
        }
      );
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      return done(err, false);
    }
  })
);

//this creates session variable req.user on being called
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  cb(null, { id: user.id, role: user.role });
});

passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  cb(null, user);
});

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected");
}
server.listen(process.env.PORT, () => {
  console.log("server started");
});
