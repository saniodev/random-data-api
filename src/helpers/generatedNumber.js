const generateNumericId = (length) => {
  const characters = "0123456789";
  let numericId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    numericId += characters[randomIndex];
  }

  return numericId;
};

module.exports = { generateNumericId };
