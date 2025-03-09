# **Smart Console Remover**

A VS Code extension to remove or comment out `console.log` statements in JavaScript and TypeScript files.

---

## **Features**

✅ Remove all `console.log` statements  
✅ Comment out `console.log` instead of removing  
✅ Uncomment previously commented logs  
✅ Supports multi-line console statements  
✅ Supports custom logger patterns (e.g., `logger.log`, `winston.info`).
✅ Works with JavaScript, TypeScript, React, Vue, Angular, and other frameworks  

---

## **Usage**

### **1️⃣ Using Right-Click Menu**
- Right-click in a JavaScript/TypeScript file and select:
  - **"Remove Console Logs"**
  - **"Comment Console Logs"**
  - **"Uncomment Console Logs"**

### **2️⃣ Using Command Palette (`Ctrl+Shift+P`)**
- Search for:
  - `Remove Console Logs`
  - `Comment Console Logs`
  - `Uncomment Console Logs`

---

## **Examples**

### **1️⃣ Remove Console Logs**

**Before:**
```js
console.log("Debugging info:", data);
console.warn("This is a warning!");
console.error("Error detected!");
logger.log("Hello");
```

**After:**
```js
// All console logs are removed!
```

---

### **2️⃣ Comment Console Logs**

**Before:**
```js
console.log("Fetching data...");
console.log("Data received:", response);
logger.log("Hello");
```

**After:**
```js
// console.log("Fetching data...");
// console.log("Data received:", response);
// logger.log("Hello");
```

---

### **3️⃣ Handle Multi-line Console Statements**

**Before:**
```js
console.log(
  "Multiline",
  "console statement"
);
```

**After:**
```js
// console.log(
//   "Multiline",
//   "console statement"
// );
```

---

### **4️⃣ Uncomment Console Logs**

**Before:**
```js
// console.log("Fetching data...");
// console.warn("Something went wrong!");
// logger.log("Hello");
```

**After:**
```js
console.log("Fetching data...");
console.warn("Something went wrong!");
logger.log("Hello");
```

---

## **Installation**

1. Open **VS Code**
2. Go to **Extensions (`Ctrl+Shift+X`)**
3. Search for **Smart Console Remover**
4. Click **Install**

---

## **Configuration**

No additional configuration is needed. The extension automatically detects JavaScript and TypeScript files.

---

## **Contributing**

Contributions are welcome! Feel free to **open issues or PRs** on GitHub.

---

## **License**

MIT License
