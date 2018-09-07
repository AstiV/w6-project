//mongoose models
const User = require("./models/User");
const WO = require("./models/WO");
const Translator = require("./models/Translator");

//npm modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

//routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const meetingRouter = require("./routes/meeting");
const filterRouter = require("./routes/filter");

//utils
const { createTranslator, createUser, createWO } = require("./utils/userCreation");

//MONGO SETUP
//connect to MongoDB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/translations",
    { useNewUrlParser: true }
);

//serves all files from translations-client/public folder through "/"
app.use(express.static(path.join(__dirname, "/public")));

//Save sessions so that there is no need
//to constantly log in when server is restarted
app.use(
    session({
        secret: "translations",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(fileUpload());

//VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

//PASSPORT SETUP

passport.use(
    "local-login",
    new LocalStrategy((username, password, next) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(null, false, { message: "Incorrect username" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return next(null, false, { message: "Incorrect password" });
            }
            return next(null, user);
        });
    })
);

passport.use(
    "local-signup",
    new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        // To avoid race conditions
        process.nextTick(() => {
            User.findOne(
                {
                    username: username
                },
                (err, user) => {
                    if (err) {
                        return next(err);
                    }

                    if (user) {
                        return next(null, false);
                    } else {
                        // Destructure the body
                        const { username, email, password, role, name } = req.body;

                        createUser({ username, email, password, role, name }).then(user => {
                            if (user.role === "Translator") {
                                User.findOne({ email }).then(user => {
                                    createTranslator(user._id).then(newUser => {
                                        return next(null, newUser);
                                    });
                                });
                            } else if (user.role === "WO") {
                                User.findOne({ email }).then(user => {
                                    createWO(user._id).then(newUser => {
                                        return next(null, newUser);
                                    });
                                });
                            }
                        });
                    }
                }
            );
        });
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }

        // const cleanUser = user.toObject();
        // delete cleanUser.password;

        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/meeting", meetingRouter);
app.use("/filter", filterRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`server starting on port 3000`);
});

module.exports = app;
