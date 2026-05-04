const generateUsername = (name) => {
  const base = name.toLowerCase().trim().replace(/\s+/g, "");
  const random = Math.floor(Math.random() * 1000);
  return `${base}${random}`;
};
module.exports = {generateUsername}