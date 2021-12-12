import fs from "fs-extra";

const FILE_PATH = `./data/flags.json`;

const readFile = () => fs.readJSON(FILE_PATH);

const assertConditions = (flag, request) => {
  const { cookies, headers } = request;
  return flag.conditions.every((condition) => {
    switch (condition.type) {
      case "COOKIES":
        return condition.value === cookies[condition.name];
      case "HEADERS":
        return condition.value === headers[condition.name];
      case "DATE":
        return condition.value <= new Date().getTime();
      case "BOOLEAN":
        return condition.value;
    }
  });
};

const getFeatureFlags = async (request) => {
  const flags = await readFile();
  const activeFlags = flags.reduce((acc, flag) => {
    const isActive = assertConditions(flag, request);
    return isActive ? acc.concat(flag.name) : acc;
  }, []);
  return activeFlags;
};

export default async function handler(req, res) {
  const flag = await getFeatureFlags(req);
  if (flag.length > 0) {
    return res.status(200).json(flag);
  }
  return res.status(404).json({ message: "No flags found" });
}
