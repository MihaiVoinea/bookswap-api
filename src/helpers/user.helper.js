exports.getNameFromUsername = username => {
  let name = username.match(/([A-Z])\w+/gi).join(' ');
  if (name === null) {
    name = username;
  }
  return name;
};

exports.getFirstameFromUsername = username => {
  let name = username.match(/([A-Z])\w+/gi)[0];
  if (name === null) {
    name = username;
  }
  return name;
};
