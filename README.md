# URL Shortener Frontend

![GitHub](https://img.shields.io/github/license/Yasg-uru/Url_shortner)
![GitHub issues](https://img.shields.io/github/issues/Yasg-uru/Url_shortner)
![GitHub stars](https://img.shields.io/github/stars/Yasg-uru/Url_shortner)
![GitHub last commit](https://img.shields.io/github/last-commit/Yasg-uru/Url_shortner)

A production-ready frontend for the **URL Shortener** application, built with **React**, **TypeScript**, and **Tailwind CSS**. This project provides a seamless user interface for shortening URLs, managing user authentication, and visualizing analytics. It is designed to be fast, responsive, and easy to integrate with the backend API.

---

## Live Links

- **Live Demo**: [https://url-shortner-frontend-virid.vercel.app/](https://url-shortner-frontend-virid.vercel.app/)  
  Experience the URL shortener in action! Shorten URLs, manage your links, and view analytics.

- **API Documentation**: [https://url-shortner-aeg8.onrender.com/api-docs/](https://url-shortner-aeg8.onrender.com/api-docs/)  
  Explore the API endpoints, request/response schemas, and usage examples.

- **GitHub Repository**: [https://github.com/Yasg-uru/url-shortner-frontend](https://github.com/Yasg-uru/url-shortner-frontend)  
  View the source code, contribute, or report issues.

---

## Features

- **URL Shortening**: Convert long URLs into short, manageable links.
- **Custom Aliases**: Option to create custom short URLs.
- **User Authentication**: Secure authentication using **Google OAuth 2.0** and **JWT**.
- **Analytics Dashboard**: Visualize clicks, unique users, device types, and more using **Recharts**.
- **Responsive Design**: Fully responsive UI for desktop, tablet, and mobile devices.
- **Toast Notifications**: Display success, error, and warning messages using **React Toastify**.
- **Dark Mode**: Built-in dark mode support using **Tailwind CSS** and **DaisyUI**.
- **API Integration**: Seamless integration with the backend API using **Axios**.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yasg-uru/Url_shortner.git
   cd Url_shortner/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.com
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build the project for production:
   ```bash
   npm run build
   ```

---

## Usage

### Development
Run the development server:
```bash
npm run dev
```
Visit `http://localhost:5173` to view the application.

### Production
Build the project for production:
```bash
npm run build
```
Serve the built files using a static server:
```bash
npm run preview
```

---

## Tech Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Routing**: React Router DOM
- **State Management**: React Context API
- **API Integration**: Axios
- **Charts**: Recharts
- **Notifications**: React Toastify
- **Icons**: Lucide React, React Icons
- **Build Tool**: Vite
- **Linting**: ESLint
- **Formatting**: Prettier

---

## Folder Structure

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, etc.
│   ├── components/          # Reusable UI components
│   ├── context/             # React Context for global state
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Application pages
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Vite environment types
├── .env                     # Environment variables
├── .eslintrc.js             # ESLint configuration
├── .prettierrc.js           # Prettier configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

---

## Environment Variables

| Variable              | Description                          | Default Value          |
|-----------------------|--------------------------------------|------------------------|
| `VITE_API_BASE_URL`   | Base URL for the backend API         | `https://your-backend-api.com` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID             | `your_google_client_id` |

---

## API Integration

The frontend integrates with the backend API using **Axios**. All API requests are centralized in the `services` folder for better maintainability.

### Example API Service
```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const shortenUrl = async (longUrl: string, customAlias?: string, topic?: string) => {
  const response = await api.post("/api/shorten", { longUrl, customAlias, topic });
  return response.data;
};

export const getAnalytics = async (alias: string) => {
  const response = await api.get(`/api/analytics/${alias}`);
  return response.data;
};
```

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## Author

👤 **Yash Choudhary**

- GitHub: [Yasg-uru](https://github.com/Yasg-uru)
- Email: [your-email@example.com](mailto:your-email@example.com)

---

## Show Your Support

Give a ⭐️ if you like this project!

---

## Acknowledgments

- Special thanks to the **React** and **Tailwind CSS** communities.
- Inspired by popular URL shorteners like **Bitly** and **TinyURL**.

---

## Roadmap

- [ ] Add support for custom domains.
- [ ] Implement bulk URL shortening.
- [ ] Add more authentication providers (e.g., GitHub, Facebook).
- [ ] Enhance analytics with real-time dashboards.

---

## Feedback

If you have any feedback or suggestions, please open an issue or reach out to the author.

---

**Happy Coding!** 🚀

---

Let me know if you need further assistance! 🚀