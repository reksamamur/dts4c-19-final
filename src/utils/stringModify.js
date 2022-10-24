const replaceString = (value) =>
  value.replace(/[^a-zA-Z0-9]/g, " ").toLowerCase();
const replaceWhitespaceString = (value) =>
  value.replace(/\s+/g, "-").toLowerCase();
const replaceDashString = (value) => value.replace(/-/g, " ").toLowerCase();

export { replaceDashString, replaceString, replaceWhitespaceString };
