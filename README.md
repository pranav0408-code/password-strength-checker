# Password Strength Checker & Generator

A browser-based tool that analyzes password strength, estimates how long a password would take to crack, and generates secure random passwords.

## Features
- Real-time strength meter and crack-time estimate using the [zxcvbn](https://github.com/dropbox/zxcvbn) library
- Improvement suggestions for weak passwords
- Random password generator using the browser's Web Crypto API (`crypto.getRandomValues`)
- Configurable length (8–64) and character sets
- One-click copy to clipboard

## Tech Stack
HTML, CSS, JavaScript, zxcvbn

## How to Run
No build step is needed.
1. Clone the repository: `git clone <repo-url>`
2. Open `index.html` in a browser.

## Security Notes
- All checks run locally in the browser; passwords are never sent to a server.
- Generated passwords use a cryptographically secure random source with rejection sampling to avoid modulo bias.

## Project Structure
```
├── index.html   # Page layout
├── style.css    # Styling
├── script.js    # Strength checker and generator logic
└── README.md
```

## Author
Pranav More
