const mongoose = require("mongoose");
const User = require("../models/User");
const Translator = require("../models/Translator");
const WO = require("../models/WO");
const Meeting = require("../models/Meeting");
const bcrypt = require("bcrypt");

const dbName = "translations";
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`);

const users = [
    {
        email: "test@wo.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
        username: "testwo",
        name: "Hans Müller",
        role: "WO"
    },
    {
        email: "test@volunteer.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
        username: "testvolunteer",
        role: "Translator",
        name: "Afolabi Taavi"
    },
    {
        email: "test@volunteer1.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
        username: "testvolunteer1",
        role: "Translator",
        name: "Eadric Sahib"
    },
    {
        email: "test@professional.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
        username: "testprofessional",
        role: "Translator",
        name: "Gadisse Nehi"
    },
    {
        email: "test@professional1.com",
        password: bcrypt.hashSync("test", bcrypt.genSaltSync(8), null),
        username: "testprofessional1",
        role: "Translator",
        name: "Virgil Pekka"
    }
];

const meetings = [
    {
        title: "Case #13 - Adebowale",
        participants: "Hans Müller - Legal guardian, Taavi Adebowale - Minor",
        caseInfo:
            "Woke celiac tumeric mixtape, photo booth lomo umami wayfarers blog fashion axe 3 wolf moon migas hammock. Kinfolk godard man bun, biodiesel tattooed four dollar toast XOXO vaporware. Brunch shabby chic gentrify +1 kale chips, narwhal sartorial kogi af truffaut kombucha ennui.",
        address: "Eichhornstr. 3, Berlin",
        date: "3.10.2018",
        time: "10:30"
    },
    {
        title: "Case #42 - Maaike",
        participants: "Hans Müller - Legal guardian, Abarrane Maaike - Minor",
        caseInfo:
            "Kinfolk tbh af jianbing. Next level mustache affogato ramps jianbing plaid. Gentrify kombucha salvia, sustainable brooklyn af flannel prism iPhone tumblr authentic beard shabby chic. Humblebrag bespoke distillery normcore brooklyn tattooed freegan, leggings succulents ethical snackwave. Pinterest literally craft beer narwhal.",
        address: "Kantstr. 3, Berlin",
        date: "25.9.2018",
        time: "14:00"
    },
    {
        title: "Case #1337 - Ealasaid",
        participants: "Hans Müller - Legal guardian, Fahim Ealasaid - Minor",
        caseInfo:
            "Bicycle rights cray shoreditch iPhone, hashtag fashion axe umami +1 echo park. Hell of lumbersexual flannel beard sustainable. Single-origin coffee cred umami tbh tattooed migas, marfa literally distillery deep v. Fixie squid put a bird on it yr microdosing yuccie try-hard pok pok sustainable man braid vape vexillologist migas street art.",
        address: "Kantstr. 3, Berlin",
        date: "10.11.2018",
        time: "11:00"
    }
];

User.create(users, err => {
    if (err) throw err;
    console.log(`Created ${users.length} users`);

    User.findOne({ email: "test@volunteer.com" }).then(translator => {
        const newTranslator = {
            user: translator.id,
            telephone: "1234-5678",
            role: "Volunteer",
            profileImageUrl:
                "https://res.cloudinary.com/adiya/image/upload/v1536241105/d95jjmjespsbldmtahgh.png",
            location: "Berlin",
            languages: [{ language: "Oromo", level: "B2" }, { language: "Maninka", level: "B1" }],
            rating: 4,
            availability: "Mondays from 14.00",
            background: "Doctor, Father of 2 daughters",
            preferedSetting: "No preferences"
        };

        Translator.create(newTranslator, err => {
            if (err) throw err;
            console.log(`Created one translator`);
        });
    });

    User.findOne({ email: "test@volunteer1.com" }).then(translator => {
        const newTranslator = {
            user: translator.id,
            telephone: "1234-5678",
            role: "Volunteer",
            profileImageUrl:
                "https://res.cloudinary.com/adiya/image/upload/v1536243616/profilepicprofessional.jpg",
            location: "Hamburg",
            languages: [{ language: "Wolof", level: "C1" }],
            rating: 3,
            availability: "All day on Tuesday",
            background: "Lawyer",
            preferedSetting: "No traumatic topics"
        };

        Translator.create(newTranslator, err => {
            if (err) throw err;
            console.log(`Created one translator`);
        });
    });

    User.findOne({ email: "test@professional1.com" }).then(translator => {
        const newTranslator = {
            user: translator.id,
            telephone: "1234-5678",
            role: "Professional",
            profileImageUrl:
                "https://res.cloudinary.com/adiya/image/upload/v1536243679/profilepicvolunteer.jpg",
            location: "München",
            languages: [{ language: "Dari", level: "C1" }],
            rating: 4,
            availability: "All day on Tuesday",
            background: "Professional translator, Lived 10 years on Madagascar",
            preferedSetting: "No special preferrences"
        };

        Translator.create(newTranslator, err => {
            if (err) throw err;
            console.log(`Created one translator`);
        });
    });

    User.findOne({ email: "test@professional.com" }).then(translator => {
        const newTranslator = {
            user: translator.id,
            telephone: "23-890",
            role: "Professional",
            profileImageUrl:
                "https://res.cloudinary.com/adiya/image/upload/v1536241027/plkumrwfq0mywzx32dlf.png",
            location: "Leipzig",
            languages: [{ language: "Tigrinya", level: "C1" }, { language: "Wolof", level: "C1" }],
            price: 100,
            rating: 5,
            availability: "Call to make an appointment",
            background: "Professional translator, Expertise in art",
            preferedSetting: "No preferences"
        };

        Translator.create(newTranslator, err => {
            if (err) throw err;
            console.log(`Created one translator`);
            User.findOne({ email: "test@wo.com" }).then(wo => {
                const newWo = {
                    user: wo.id,
                    location: "Berlin",
                    profileImageUrl:
                        "https://res.cloudinary.com/astridvarga/image/upload/v1536241349/testwo.png",
                    idNumber: "A15 697 I7"
                };

                WO.create(newWo, err => {
                    if (err) throw err;
                    console.log(`Created one WO`);

                    User.findOne({ email: "test@wo.com" }).then(woUser => {
                        User.findOne({ email: "test@professional.com" }).then(transUser => {
                            const newMeeting1 = meetings[0];
                            newMeeting1["wo"] = woUser.id;
                            newMeeting1["translator"] = transUser.id;

                            const newMeeting2 = meetings[1];
                            newMeeting2["wo"] = woUser.id;

                            Meeting.create(newMeeting1, err => {
                                if (err) throw err;
                                console.log(`Created first meeting`);

                                User.findOne({ email: "test@volunteer.com" }).then(transUser1 => {
                                    newMeeting2["translator"] = transUser1.id;

                                    Meeting.create(newMeeting2, err => {
                                        if (err) throw err;
                                        console.log(`Created second meeting`);

                                        Meeting.create(meetings[2], err => {
                                            if (err) throw err;
                                            console.log(`Created third meeting`);
                                            mongoose.connection.close();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
