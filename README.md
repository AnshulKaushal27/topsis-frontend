# 🎯 TOPSIS Web Frontend

A clean, user-friendly web interface for **TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)** analysis. Upload datasets, configure parameters, and get ranked results via email—all through an intuitive static website.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

- 📤 **CSV File Upload** – Easy drag-and-drop or file selection
- ⚙️ **Parameter Configuration** – Input weights and impacts for criteria
- 📧 **Email Delivery** – Automatic result delivery to your inbox
- ✅ **Real-time Validation** – Client-side validation with helpful error messages
- 🎨 **Modern UI** – Clean academic-themed design with responsive layout
- 🚀 **Zero Build Setup** – Pure static files, no dependencies
- 🌐 **Fully Deployed** – Production-ready on Netlify

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript (Vanilla)** | Form handling, validation, API communication |
| **FastAPI (Backend)** | TOPSIS processing (external service) |
| **Netlify** | Static hosting and deployment |

---

## 📂 Project Structure

```
topsis-frontend/
├── index.html       # Main HTML file with form and UI
├── styles.css       # Styling and responsive design
├── script.js        # Frontend logic and API integration
├── README.md        # This file
└── .gitignore       # Git configuration
```

### File Overview

| File | Purpose |
|------|---------|
| `index.html` | Form structure, upload interface, result display |
| `styles.css` | Modern academic theme, fully responsive (mobile-friendly) |
| `script.js` | Form validation, API calls, user feedback handling |

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build tools required

### Local Setup

**Option 1: Direct File Open**
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

**Option 2: Local Server**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then open `http://localhost:8000` in your browser.

---

## 📋 How to Use

### Step 1: Upload CSV File

Prepare a CSV with this format:

```csv
Criteria1,Criteria2,Criteria3,Criteria4
10,20,15,25
15,18,14,22
12,22,16,20
```

**Requirements:**
- First row: Column headers (criteria names)
- Remaining rows: Numeric data for each alternative
- All values must be numeric

### Step 2: Enter Weights

Comma-separated numeric values (one per criterion):

```
0.4, 0.3, 0.2, 0.1
```

**Notes:**
- Must match the number of columns in your CSV
- Values are normalized automatically by the backend
- Use any positive numbers (they don't need to sum to 1)

### Step 3: Specify Impacts

Comma-separated impact type (one per criterion):

```
+, +, -, +
```

**Impact Types:**
- `+` (benefit) – Higher values are better
- `-` (cost) – Lower values are better

**Example:** For laptop comparison:
- Price: `-` (lower is better)
- Processor Speed: `+` (higher is better)
- Battery Life: `+` (higher is better)

### Step 4: Enter Email

Provide your email to receive results:

```
your.email@example.com
```

### Step 5: Submit

Click **"Analyze with TOPSIS"** and wait for results. A loading indicator will appear while the backend processes your request.

---

## 🔗 Backend Integration

### API Endpoint

```
POST https://topsis-backend-1o38.onrender.com/api/topsis/run
```

### Request Format

The frontend sends multipart form data:

```javascript
FormData {
  file: [CSV File Object],
  weights: "0.4, 0.3, 0.2, 0.1",
  impacts: "+, +, -, +",
  email: "user@example.com"
}
```

### Response Format

**Success (HTTP 200):**
```json
{
  "status": "success",
  "message": "TOPSIS analysis completed successfully",
  "result_id": "abc123def456"
}
```

**Error (HTTP 400/500):**
```json
{
  "status": "error",
  "message": "Error description",
  "error_code": "INVALID_FILE"
}
```

### Error Handling

Common errors and solutions:

| Error | Cause | Fix |
|-------|-------|-----|
| Invalid CSV format | Malformed file | Check CSV structure |
| Weights/impacts mismatch | Count doesn't match columns | Recount criteria and parameters |
| Missing email | Email field empty | Provide valid email address |
| Backend unreachable | Server down or network issue | Check internet connection and backend status |

---

## 🌍 Deployment

### Deploy to Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add TOPSIS frontend"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Leave build settings empty (static site)
   - Click "Deploy"

3. **Your site is live!**
   ```
   [https://playful-sable-d77221.netlify.app]
   ```

### Deploy to GitHub Pages

1. **Enable in repository settings:**
   - Go to Settings → Pages
   - Select main branch as source
   - Save

2. **Access at:**
   ```
   [https://github.com/AnshulKaushal27/topsis-frontend]
   ```

### Other Options

- **Vercel** – Similar to Netlify, automatic from GitHub
- **AWS S3 + CloudFront** – Enterprise-level hosting
- **Traditional Hosting** – Upload via FTP to any web server

---

## ⚙️ Configuration

### Change Backend URL

Edit the API endpoint in `script.js`:

```javascript
// Line ~50 in script.js
const BACKEND_URL = '[https://topsis-backend-1o38.onrender.com/]';
```

### Customize UI Theme

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --success-color: #27ae60;
  --error-color: #e74c3c;
  --bg-color: #ecf0f1;
}
```

---

## 📚 API Documentation

### Complete Endpoint Reference

**Endpoint:** `POST /api/topsis/run`

**Content-Type:** `multipart/form-data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | ✅ | CSV file with alternatives and criteria |
| `weights` | String | ✅ | Comma-separated weights (e.g., "0.4, 0.3, 0.2, 0.1") |
| `impacts` | String | ✅ | Comma-separated impacts (e.g., "+, +, -, +") |
| `email` | String | ✅ | Email for result delivery |

**Example cURL Request:**

```bash
curl -X POST https://topsis-backend-1o38.onrender.com/api/topsis/run \
  -F "file=@data.csv" \
  -F "weights=0.4, 0.3, 0.2, 0.1" \
  -F "impacts=+, +, -, +" \
  -F "email=user@example.com"
```

---

## 🐛 Troubleshooting

### Upload Button Not Responding
- Ensure you're using a modern browser
- Check browser console for errors (F12)
- Clear cache and refresh

### "Backend Unreachable" Error
- Verify the backend URL in `script.js`
- Check backend server status
- Confirm internet connection

### Email Not Received
- Check spam/junk folder
- Verify email address was entered correctly
- Check backend logs for delivery errors

### CSV Validation Fails
- Ensure proper CSV format (comma-separated)
- Check for special characters in headers
- Verify all data values are numeric

---

## 📂 Dependencies

**Zero external dependencies!** This is pure vanilla HTML, CSS, and JavaScript.

---

## 📄 License

This project is licensed under the **MIT License** – see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m "Add awesome feature"`)
5. Push to your branch (`git push origin feature/awesome-feature`)
6. Open a Pull Request

### Code Style
- Use semantic HTML5
- Follow existing CSS conventions
- Write clear, commented JavaScript
- Keep functions focused and reusable


---


Made with ❤️ for data-driven decision making | [Give it a ⭐ if you find it helpful!](https://github.com/AnshulKaushal27/topsis-frontend)
