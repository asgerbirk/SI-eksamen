import express from "express";

const app = express();

app.use(express.static("public"));

//Content-Type: text/event-stream: Fortæller browseren, at svaret er en SSE-strøm.
//Cache-Control: no-cache: Forhindrer browseren i at cache svaret, hvilket er vigtigt for realtidsdata.
//Connection: keep-alive: Holder forbindelsen åben, så serveren kan fortsætte med at sende data.
app.get("/synchronize-time", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  setInterval(() => sendTime(res), 1000);
});

function sendTime(res) {
  const time = new Date().toISOString();
  res.write(`data: ${time}\n\n`);
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
