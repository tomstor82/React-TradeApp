# Install babel including React preset, locally in project folder (preferred):
npm install --save-dev @babel/core @babel/cli @babel/preset-react
# Start compiling with react preset and output to external file, use the --out-file or -o option:
npx babel --presets @babel/preset-react TradeApp.jsx -o TradeApp.js
# To compile a file every time that you change it, use the --watch or -w option:
npx babel --preset @babel/preset-react script.jsx --watch --out-file script-compiled.js

# More at https://babeljs.io/docs/en/babel-cli#using-plugins