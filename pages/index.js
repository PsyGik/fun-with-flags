import styles from "../styles/Home.module.css";
import FeatureControl from "../components/feature-control";

const Fallback = () => <div>No flags are active</div>;

export default function Home() {
  return (
    <div className={styles.container}>
      <FeatureControl flags={["featureX"]} fallback={Fallback()}>
        <h1>Feature X</h1>
      </FeatureControl>

      <FeatureControl flags={["featureY", "featureZ"]} fallback={Fallback()}>
        <h1>Feature Y</h1>
        <h1>Feature Z</h1>
      </FeatureControl>
    </div>
  );
}
