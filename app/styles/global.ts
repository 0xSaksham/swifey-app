import { StyleSheet, Platform, Dimensions } from "react-native";
import { theme } from "../_layout";

const { width, height } = Dimensions.get("window");

const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  bodyText: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },

  // Cards
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Buttons
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "600",
  },

  // Forms
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: theme.spacing.md,
  },

  // Responsive layouts
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },

  // Utility classes
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullWidth: {
    width: "100%",
  },
  scrollPadding: {
    paddingHorizontal: theme.spacing.md,
  },
});

// Responsive breakpoints
export const breakpoints = {
  smallPhone: width < 350,
  phone: width < 414,
  tablet: width < 768,
};

// Helper function for responsive fontSize
export const responsiveFontSize = (size: number) => {
  if (breakpoints.smallPhone) return size * 0.8;
  if (breakpoints.phone) return size * 0.9;
  return size;
};

export default globalStyles;
