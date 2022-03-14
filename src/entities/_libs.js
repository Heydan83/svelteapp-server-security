export const requestStatus = {
  NO_REQUEST: "NO_REQUEST",
  REQUESTING: "REQUESTING",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_ERROR: "REQUEST_ERROR",
};

export const inLineMessageTypes = {
  PRIMARY: { name: "PRIMARY", class: "alert-primary" },
  SECONDARY: { name: "SECONDARY", class: "alert-secondary" },
  SUCCESS: { name: "SUCCESS", class: "alert-success" },
  DANGER: { name: "DANGER", class: "alert-danger" },
  WARNING: { name: "WARNING", class: "alert-warning" },
  INFO: { name: "INFO", class: "alert-info" },
  LIGHT: { name: "LIGHT", class: "alert-light" },
  DARK: { name: "DARK", class: "alert-dark" },
};

export const getClassFromInLineMessageTypes = (type) => {
  for (const property in inLineMessageTypes) {
    const prop = inLineMessageTypes[property];
    if (prop.name === type) {
      return prop.class;
    }
  }

  return "";
};

export const timeToCloseInLineMessage = 3000;

export const httpRequestStatus = {
  OK: 200,
};
