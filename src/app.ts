import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import { ResponseDto } from "./dto/ResponseDto";

dotenv.config();

const router = express();
const port = process.env.PORT;
const token = process.env.TOKEN;
const profile_link = `https://www.strava.com/api/v3/athlete?access_token=${token}`;
console.log(profile_link);

router.get("/", async (req: Request, res: Response): Promise<ResponseDto> => {
  const options: RequestInit = {
    method: "GET",
  };

  fetch(profile_link, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
  try {
    let responseFetch = await fetch(profile_link, options);
    let response = (await responseFetch.json()) as ResponseDto;
    res.status(200).json(response);
    return response;
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Internal Server Error.` });
  }
});

router.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
