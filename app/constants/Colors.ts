export const Colors = {
  // Primary colors
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  primaryLight: '#6BA5E7',

  // Background colors
  background: {
    primary: '#1a1a1a',
    secondary: '#2a2a2a',
    tertiary: '#333333',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#9f9f9f',
    tertiary: '#666666',
  },

  // Status colors
  status: {
    success: '#4CAF50',
    error: '#FF5252',
    warning: '#FFC107',
    info: '#2196F3',
  },

  // Border colors
  border: {
    primary: '#333333',
    secondary: '#444444',
  },

  // Verification status colors
  verification: {
    verified: '#4CAF50',
    pending: '#FFC107',
    unverified: '#666666',
  },

  // Button colors
  button: {
    primary: '#4A90E2',
    secondary: '#2a2a2a',
    disabled: '#666666',
  },

  // Specific UI element colors
  input: {
    background: '#2a2a2a',
    placeholder: '#666666',
    text: '#FFFFFF',
  },
} as const;

// Theme configuration
export const theme = {
  dark: true,
  colors: {
    primary: Colors.primary,
    background: Colors.background.primary,
    card: Colors.background.secondary,
    text: Colors.text.primary,
    border: Colors.border.primary,
    notification: Colors.status.info,
  },
};
