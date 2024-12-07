# stakingwifey - Your Decentralized Social Identity

stakingwifey is a modern mobile application built with React Native and Expo that enables users to manage their decentralized social identity using the Reclaim Protocol. The app provides a seamless way to verify and share credentials while maintaining privacy and security.

## Features

- **Decentralized Identity Management**: Secure credential verification using Reclaim Protocol
- **Profile Creation**: Easy-to-use interface for creating and managing user profiles
- **Credential Verification**: Support for various verification types including:
  - Email verification
  - LinkedIn profile verification
  - GitHub contributions
  - Educational credentials
- **Social Exploration**: Discover and connect with other users
- **Dark Mode**: Built-in dark theme for better user experience
- **Responsive Design**: Works seamlessly across different device sizes

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Components**: Native components with custom styling
- **Icons**: Ionicons
- **Date Handling**: @react-native-community/datetimepicker
- **Form Elements**: @react-native-picker/picker

## Project Structure

app/
├── index.tsx # Home screen
├── profile.tsx # Profile management
├── explore.tsx # Discovery and exploration
├── user/
│ ├── [id]/
│ │ └── index.tsx # Dynamic user profile pages
│ └── \_layout.tsx # User route layout
└── \_layout.tsx # Root layout configuration
