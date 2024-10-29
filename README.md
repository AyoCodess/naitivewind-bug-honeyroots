# Installation Guide for HoneyRoots v3 Mobile App

Reference Repo: https://github.com/t3-oss/create-t3-turbo/tree/main

Git issue: https://github.com/nativewind/nativewind/issues/1169


Follow these steps to set up and run the mobile app:

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed (version specified in `.nvmrc`).
2. **pnpm**: This project uses `pnpm` as the package manager. Install it globally if you haven't already:
   ```bash
   npm install -g pnpm
   ```

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd naitivewind-bug-honeyroots
   ```

2. **Install Dependencies**:
   Use `pnpm` to install all dependencies for the monorepo at root:
   ```bash
   pnpm install

3. **Create dev build for IOS (same for android, refer to package.json for commands)**:
   Navigate to the mobile app directory and start the app:
   ```bash
   cd apps/mobile
   pnpm prebuild-i
   pnpm local-dev-i-s
   ```

4. **Run the Mobile App**:
   Navigate to the mobile app directory and start the app:
   ```bash
   cd apps/mobile
   pnpm start
   ```

   This will start the Expo development server. You can then use the Expo Go app on your mobile device or an emulator to view the app.

## Additional Commands

- **Clean the Project**:
  To clean the project and remove all cached files (do this at the root):
  ```bash
  npx npkill
  ```




