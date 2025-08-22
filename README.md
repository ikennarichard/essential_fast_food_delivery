# **Essential Fast Food Delivery**

**📗 Table of Contents**

- 📖 [About the Project](#about-project)
  - 🛠 [Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - 🚀 [Live Demo](#live-demo)
- 💻 [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- 👥 [Authors](#authors)
- 🔭 [Future Features](#future-features)
- 🤝 [Contributing](#contributing)
- ⭐️ [Show your support](#support)
- 🙏 [Acknowledgements](#acknowledgements)
- ❓ [FAQ](#faq)
- 📝 [License](#license)

## 📖 Essential Fast Food Delivery <a name="about-project"></a>

**Essential Fast Food Delivery** is a modern cross-platform mobile application that connects customers with their favorite fast food restaurants for quick and reliable food delivery services.

**Essential Fast Food Delivery** is a comprehensive food delivery platform built with Expo React Native that provides seamless ordering experience, real-time order tracking, and efficient delivery management system.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://expo.dev/">Expo</a></li>
    <li><a href="https://reactnative.dev/">React Native</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
    <li><a href="https://docs.expo.dev/router/introduction/">Expo Router</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://appwrite.io/">Appwrite</a></li>
    <li><a href="https://appwrite.io/docs/server/functions">Appwrite Cloud Functions</a></li>
  </ul>
</details>

<details>
  <summary>Database</summary>
  <ul>
    <li><a href="https://appwrite.io/docs/server/databases">Appwrite Database</a></li>
    <li><a href="https://appwrite.io/docs/server/storage">Appwrite Storage</a></li>
  </ul>
</details>

<details>
  <summary>Services</summary>
  <ul>
    <li><a href="https://sentry.io/">Sentry</a></li>
    <!-- <li><a href="https://developers.google.com/maps">Google Maps API</a></li>
    <li><a href="https://stripe.com/">Stripe</a></li> -->
  </ul>
</details>

### Key Features <a name="key-features"></a>

- **Multi-Restaurant Support** - Browse and order from multiple fast food restaurants

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://expo.dev/@yourusername/essential-fast-food-delivery)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites <a name="prerequisites"></a>

In order to run this project you need:

- Node.js (v18 or higher)
- pnpm package manager
- Expo CLI
- Appwrite account (cloud or self-hosted)
- Sentry account
- Google Maps API key
- Stripe account

```bash
# Install pnpm globally
npm install -g pnpm

# Install Expo CLI
pnpm install -g @expo/cli
```

### Setup <a name="setup"></a>

Clone this repository to your desired folder:

```bash
git clone https://github.com/yourusername/essential_fast_food_delivery.git
cd essential_fast_food_delivery
```

### Install <a name="install"></a>

Install this project with:

```bash
pnpm install
```

Create your environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### Usage <a name="usage"></a>

To run the project, execute the following command:

```bash
# Start development server
pnpm start

# Run on iOS simulator
pnpm run ios

# Run on Android emulator
pnpm run android
```

### Run tests <a name="run-tests"></a>

To run tests, run the following command:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Run type checking
pnpm run type-check
```

### Deployment <a name="deployment"></a>

You can deploy this project using:

```bash
# Install EAS CLI
pnpm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for production
eas build --platform all

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

👤 **Your Name**

- GitHub: [@yourusername](https://github.com/ikenna)
- Twitter: [@yourusername](https://twitter.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- **AI-Powered Recommendations** - Smart meal suggestions based on user preferences
- **Voice Ordering** - Order food using voice commands
- **Loyalty Program** - Reward system for frequent customers

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project, please give it a ⭐️ and share it with your friends!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank:

- Microverse for the project inspiration
- The Expo team for the amazing development platform
- Appwrite team for the excellent backend services
- The React Native community for continuous support

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ❓ FAQ <a name="faq"></a>

- **Do I need a paid Appwrite account to run this project?**
  - No, you can use Appwrite's free tier or self-host Appwrite for development.

- **Can I run this on physical devices during development?**
  - Yes, use the Expo Go app to scan the QR code from `pnpm start` command.

- **How do I configure push notifications?**
  - Push notifications are handled through Expo's notification service. Configure your credentials in the Expo dashboard.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
