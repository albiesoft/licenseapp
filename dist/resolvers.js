"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2 = __importStar(require("argon2"));
const nodemailer = __importStar(require("nodemailer"));
const uuid_1 = require("uuid");
const User_1 = require("./entity/User");
const License_1 = require("./entity/License");
const Nuller_1 = require("./entity/Nuller");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info@instasky.io',
        pass: 'God7nW5B78bSStww0PMSkYA0lwiZP8'
    }
});
const mailOptions = {
    from: 'info@instasky.io',
    to: 'albert@albiesoft.com',
    subject: 'Nuller Signup',
    html: ''
};
exports.resolvers = {
    Query: {
        me: (_, __, { req }) => __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            return yield User_1.User.findOne(req.session.userId);
        }),
        mylicense: (_, { license }) => __awaiter(this, void 0, void 0, function* () {
            return yield License_1.License.findOne({ where: { license } });
        })
    },
    Mutation: {
        register: (_, { firstname, lastname, email, password }) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassowrd = yield argon2.hash(password);
            yield User_1.User.create({
                firstname,
                lastname,
                email,
                password: hashedPassowrd
            }).save();
            return true;
        }),
        login: (_, { email, password }, { req }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            const valid = yield argon2.verify(user.password, password);
            if (!valid) {
                return null;
            }
            req.session.userId = user.id;
            return user;
        }),
        createlicense: (_, { domain }) => __awaiter(this, void 0, void 0, function* () {
            const license = yield License_1.License.findOne({ where: { domain } });
            if (license) {
                if (license.used) {
                    Nuller_1.Nuller.create({
                        domain
                    }).save();
                    mailOptions.html = `<h1>New License!</h1><p>Domain: ${domain}</p>`;
                    transporter.sendMail(mailOptions);
                    return null;
                }
            }
            return yield License_1.License.create({
                domain,
                license: uuid_1.v4(),
                used: true
            }).save();
        }),
        signlicense: (_, { domain, license }) => __awaiter(this, void 0, void 0, function* () {
            const lc = yield License_1.License.findOne({ where: { domain } });
            const signNuller = () => __awaiter(this, void 0, void 0, function* () {
                const nuller = yield Nuller_1.Nuller.findOne({ where: { domain } });
                if (!nuller) {
                    Nuller_1.Nuller.create({
                        domain,
                        license
                    }).save();
                    mailOptions.html = `<h1>Nuller Signed Up!</h1><p>Domain: ${domain}</p>`;
                    yield transporter.sendMail(mailOptions);
                }
            });
            const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
            const valid = uuidV4Regex.test(license);
            if (!lc || license != lc.license || !valid) {
                signNuller();
                console.log(license);
                console.log(lc);
                console.log(valid);
                return false;
            }
            return true;
        })
    }
};
//# sourceMappingURL=resolvers.js.map