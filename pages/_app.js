import "../styles/globals.css";
import { FeatureFlagProvider } from "../context/feature-flag.context";

function MyApp({ Component, pageProps }) {
  return (
    <FeatureFlagProvider>
      <Component {...pageProps} />
    </FeatureFlagProvider>
  );
}

export default MyApp;
