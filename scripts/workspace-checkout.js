import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs, { readdirSync } from 'fs';
import enquirer from 'enquirer';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Destructure AutoComplete from enquirer
const { AutoComplete } = enquirer;

// Define paths for the VS Code settings file and the apps directory
const relativeFilePath = '../.vscode/settings.json';
const absoluteFilePath = path.join(__dirname, relativeFilePath);
const appsPath = path.join(__dirname, '../packages/@befide');

// List of apps to always exclude
const excludedApps = [];

// Read the VS Code settings file
fs.readFile(absoluteFilePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let jsonData;
  try {
    // Parse the JSON data from the settings file
    jsonData = JSON.parse(data);
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
    return;
  }

  // Determine initially selected apps based on settings
  const initial = Object.keys(jsonData['files.exclude'])
    .filter((app) => !jsonData['files.exclude'][app])
    .map((app) => app.split('/')[1]);

  // Read the apps directory and filter out excluded apps
  const apps = readdirSync(appsPath, { withFileTypes: true })
    .filter((direct) => {
      return direct.isDirectory() && !excludedApps.includes(direct.name);
    })
    .map((direct) => direct.name);

  // Create a prompt for selecting apps to display
  const prompt = new AutoComplete({
    name: 'apps',
    message:
      'Press arrow keys to navigate and space to select/deselect apps. Press enter to confirm.',
    multiple: true,
    choices: [...apps],
    initial: initial.filter((app) => !excludedApps.includes(app))
  });

  // Get the user's selection
  const answer = await prompt.run();

  // Update the VS Code settings based on the user's selection
  apps.forEach((app) => {
    jsonData['files.exclude'][`packages/@befide/${app}`] = !answer.includes(app);
  });

  const updatedJsonData = JSON.stringify(jsonData, null, 2);

  // Write the updated settings back to the file
  fs.writeFile(absoluteFilePath, updatedJsonData, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing to file:', writeErr);
      return;
    }
    console.log('Checkout successful.');
  });
});
