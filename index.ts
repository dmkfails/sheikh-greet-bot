import { TwitterClient } from "twitter-api-client";
import { utcToZonedTime, format } from "date-fns-tz";
import { config } from "dotenv";

config();

const date = new Date();
const timezone = "Asia/Kolkata";
const zonedDate = utcToZonedTime(date, timezone);
const hour = format(zonedDate, "k");

let status = null;
if (hour == "6") {
  status = "Kaalai Vanakkam Makka";
} else if (hour == "22") {
  status = "Good Night Kaavis 🚩🚩🚩🚩";
}

try {
  const twitterClient = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_SECRET,
  });

  const data = await twitterClient.tweets.statusesUpdate({
    status: status,
  });

  console.log(data);
} catch (e) {
  console.error(e);
}
