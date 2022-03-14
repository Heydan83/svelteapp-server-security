export const TextColorTypes = {
  PRIMARY: { name: "PRIMARY", class: "text-primary" },
  SECONDARY: { name: "SECONDARY", class: "text-secondary" },
  SUCCESS: { name: "SUCCESS", class: "text-success" },
  DANGER: { name: "DANGER", class: "text-danger" },
  WARNING: { name: "WARNING", class: "text-warning" },
  INFO: { name: "INFO", class: "text-info" },
  LIGHT: { name: "LIGHT", class: "text-light" },
  DARK: { name: "DARK", class: "text-dark" },
};

export const getClassFromTextColorType = (type) => {
  for (const property in TextColorTypes) {
    const prop = TextColorTypes[property];
    if (prop.name === type) {
      return prop.class;
    }
  }

  return "";
};

export const noNeedCredentials = (routh) => {
  const publicURLs = ["/", "/login"];

  return publicURLs.includes(routh);
};
