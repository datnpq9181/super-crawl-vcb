const axios = require("axios");
const fetch = require("node-fetch");

async function captcha_solver(img_base64) {
  const url = "https://mggtd.com/solve_captcha";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: img_base64,
    }),
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function saveImageFromBase64String(base64String, filename) {
  const fs = require("fs");
  const path = require("path");
  const data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const buf = Buffer.from(data, "base64");
  fs.writeFileSync(path.join(__dirname, filename), buf);
}

async function main() {
  let total = 0;
  for (let i = 0; i < 6000; i++) {
    let captcha_url = `https://digiapp.vietcombank.com.vn/utility-service/v1/captcha/84be6416-b31c-d159-4349-1aa8414be731`;
    const image = await axios.get(captcha_url, {
      responseType: "arraybuffer",
      timeout: 5000,
    });
    const img_base64 = Buffer.from(image.data).toString("base64");
    const captcha = await captcha_solver(img_base64);
    if (captcha.result) {
      total += 1;
      console.log(captcha.result);
      saveImageFromBase64String(
        img_base64,
        `./captcha-vcb/${captcha.result}.png`
      );
    }
  }

  console.log("------------------");
  console.log(`Total: ${total}`);
  console.log("------------------");
}

main();
