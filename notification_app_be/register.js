"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function registerAndAuthenticate() {
    const REGISTRATION_URL = 'http://20.207.122.201/evaluation-service/register';
    const AUTH_URL = 'http://20.207.122.201/evaluation-service/auth';
    // --- FILL IN YOUR DETAILS HERE ---
    const registrationData = {
        email: "sk8406@srmist.edu.in",
        name: "Suren kumar",
        mobileNo: "9360620354",
        githubUsername: "suren-4",
        rollNo: "RA2311032010011",
        accessCode: "QkbpxH"
    };
    try {
        console.log("1. Registering with Test Server...");
        const regRes = await axios_1.default.post(REGISTRATION_URL, registrationData);
        console.log("\n Registration Successful!");
        console.log("SAVE THESE CREDENTIALS FOR YOUR RECORDS:");
        console.log(regRes.data);
        const { clientID, clientSecret } = regRes.data;
        console.log("\n2. Authenticating to get Bearer Token...");
        const authData = {
            ...registrationData,
            clientID,
            clientSecret
        };
        const authRes = await axios_1.default.post(AUTH_URL, authData);
        console.log("\n Authentication Successful! Your Bearer Token is:");
        console.log(authRes.data.access_token);
        console.log("\n--- INSTRUCTIONS ---");
        console.log("Copy the token above and use it to run the priority inbox script like this:");
        console.log(`set AUTH_TOKEN="${authRes.data.access_token}" && npx ts-node priority_inbox.ts`);
    }
    catch (error) {
        console.error("Error:");
        if (error.response) {
            console.error(error.response.data);
        }
        else {
            console.error(error.message);
        }
    }
}
registerAndAuthenticate();
