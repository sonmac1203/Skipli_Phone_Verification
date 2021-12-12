const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(admin.credential.applicationDefault());

const db = admin.firestore();

const express = require("express");
const app = express();
const Twilio = require("twilio");

const accountSid = functions.config().twilio.accountsid;
const authToken = functions.config().twilio.authtoken;
const fromPhoneNum = functions.config().twilio.phonenumber;

const client = new Twilio(accountSid, authToken);

const cors = require("cors");

app.use(express.json({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "API connected" });
});

app.post("/create", async (req, res) => {
  const accessCode = Math.floor(100000 + Math.random() * 900000); // generate a random 6-digit code
  try {
    const toPhoneNumber = req.body.phoneNumber;
    await client.messages.create({
      body: "Here is your 6-digit access code: " + accessCode,
      to: toPhoneNumber,
      from: fromPhoneNum,
    });
    await db.collection("phone").doc(toPhoneNumber).set({ accessCode });
    return res.status(200).json({ msg: "SMS sent to your phone!!!" });
  } catch (error) {
    return res.status(500).json({ msg: "Please try again!!!" });
  }
});

app.post("/validate", async (req, res) => {
  try {
    const { phoneNumber, accessCode } = req.body;
    const ref = db.collection("phone").doc(phoneNumber);
    const doc = await ref.get();
    const currentCode = doc.data().accessCode;
    if (accessCode === currentCode.toString()) {
      await ref.delete();
      return res.status(200).json({ msg: "Congratulations!!!" });
    } else {
      return res.status(400).json({ msg: "Incorrect access code!!!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error!!!" });
  }
});

exports.api = functions.https.onRequest(app);
