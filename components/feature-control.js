import { useFeatureFlags } from "../context/feature-flag.context";

const FeatureControl = ({
  flags = [],
  strict = false,
  children,
  fallback = null,
}) => {
  const { activeFlags } = useFeatureFlags();
  const activate = strict
    ? flags.every((f) => activeFlags.includes(f))
    : flags.some((f) => activeFlags.includes(f));
  return activate ? children : fallback;
};

export default FeatureControl;
