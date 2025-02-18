# Smart Console Remover

## Overview
Smart Console Remover is a Visual Studio Code extension that helps developers manage `console.log` statements efficiently. It allows you to **remove, comment, or uncomment** console statements in JavaScript and TypeScript files, ensuring cleaner and more maintainable code.

## Features
- **Remove Console Logs**: Deletes all `console.log`, `console.warn`, `console.error`, `console.debug`, and `console.info` statements.
- **Comment/Uncomment Console Logs**: Instead of removing, you can comment them out or bring them back when needed.
- **Supports Multiline Console Statements**: Ensures that console statements spanning multiple lines are properly handled.
- **Works with Popular Frameworks**: Supports JavaScript, TypeScript, React, Vue, Angular, and other libraries.
- **Right-Click Context Menu**: Easily access the extension's functionality from the right-click menu.
- **Modification Count**: Displays how many console logs have been modified.

## Installation
1. Open **VS Code**.
2. Go to the **Extensions Marketplace** (`Ctrl+Shift+X`).
3. Search for `Smart Console Remover`.
4. Click **Install**.

Alternatively, you can install manually using the `.vsix` file:
```sh
code --install-extension smart-console-remover.vsix
```

## Usage
### 1. Using the Command Palette
1. Press `Ctrl+Shift+P`.
2. Type `Remove Console Logs`.
3. Select an option:
   - Remove Console Logs
   - Comment Console Logs
   - Uncomment Console Logs

### 2. Using the Right-Click Menu
1. Open a JavaScript or TypeScript file.
2. Right-click anywhere in the editor.
3. Choose the **Smart Console Remover** option.
4. Select your preferred action.

## Configuration
By default, the extension works with `.js`, `.jsx`, `.ts`, `.tsx` files. You can configure it in your **settings.json**.

## Contributing
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/smart-console-remover.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the extension in development mode:
   ```sh
   npm run watch
   ```
4. Open VS Code and press `F5` to start debugging.

## Known Issues
- Some nested console statements might not be detected correctly.
- If you find any issues, please report them on [GitHub](https://github.com/your-repo/smart-console-remover/issues).

## License
MIT License

