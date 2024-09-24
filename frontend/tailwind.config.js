const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    ["./src/**/*.{html,js}"],
    flowbite.content(),
    "./node_modules/flowbite/**/*.js"
  ],
  plugins: [
    // ...
    flowbite.plugin(),
    require('flowbite/plugin')
  ],
};