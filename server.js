import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.text({ type: "*/*" }));

app.post("/", async (req, res) => {
  const apiURL = "https://bapeauth.com/dashboard/auth/api.php";

  try {
    const forwardRes = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.API_KEY 
      },
      body: req.body
    });

    const text = await forwardRes.text();
    res.status(forwardRes.status).send(text);
  } catch (err) {
    console.error("Forward error:", err);
    res.status(500).send("Proxy error");
  }
});

app.listen(10000, () => {
  console.log("Secure HTTP Proxy running on port 10000");
});
