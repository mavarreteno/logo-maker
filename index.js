const fs = require("fs");
const inquirer = require("inquirer"); // npm i inquirer@8.2.4

function generateLogoSVG(shape, text, color) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">`;

 
  svg += `<rect width="100%" height="100%" fill="white" />`;

  // Draw the shape
  const shapeSize = 200;
  const shapeX = (300 - shapeSize) / 2;
  const shapeY = (300 - shapeSize) / 2;

  if (shape === "circle") {
    svg += `<circle cx="${300 / 2}" cy="${300 / 2}" r="${
      shapeSize / 2
    }" fill="${color}" />`;
  } else if (shape === "square") {
    svg += `<rect x="${shapeX}" y="${shapeY}" width="${shapeSize}" height="${shapeSize}" fill="${color}" />`;
  } else if (shape === "triangle") {
    const trianglePoints = `${shapeX},${shapeY + shapeSize};${
      shapeX + shapeSize
    },${shapeY + shapeSize};${shapeX + shapeSize / 2},${shapeY}`;
    svg += `<polygon points="${trianglePoints}" fill="${color}" />`;
  } else {
    console.error(
      "Invalid shape. Supported shapes are circle, square, and triangle."
    );
    process.exit(1);
  }

  // Add text
  if (text) {
    const fontSize = 40;
    const fontX = (300 - fontSize * text.length) / 2;
    const fontY = 300 / 2 + fontSize / 2;
    svg += `<text x="${fontX}" y="${fontY}" font-family="Arial" font-size="${fontSize}px" fill="white" text-anchor="middle">${text}</text>`;
  }

  svg += `</svg>`;

  // Write the SVG data to the file
  fs.writeFile("logo.svg", svg, (err) => {
    if (err) {
      console.error("Error writing SVG file:", err);
    } else {
      console.log("Generated logo.svg");
    }
  });
}

const shapeOptions = ["circle", "square", "triangle"];

inquirer
  .prompt([
    {
      type: "list",
      name: "shape",
      message: "Choose a shape:",
      choices: shapeOptions,
    },
    {
      type: "input",
      name: "text",
      message: "Enter text (up to three characters):",
      validate: (input) => input.length <= 3,
    },
    {
      type: "input",
      name: "color",
      message: 'Enter color :',
    },
  ])
  .then((answers) => {
    const { shape, text, color } = answers;
    generateLogoSVG(shape, text, color);
  });
