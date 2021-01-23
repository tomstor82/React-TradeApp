# Install babel including React preset, locally in project folder
npm install --save-dev @babel/core @babel/cli @babel/preset-react
# Start compiling with react preset and output (-o / --out-file) to external file
npx babel --presets @babel/preset-react TradeApp.jsx -o TradeApp.js
