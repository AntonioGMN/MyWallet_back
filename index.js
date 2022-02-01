import express from "express";

const serve = express();

serve.listen(5000, () => console.log("ouvindo"));
