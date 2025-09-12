import "./styles.css";

// Consider two objects, for example

const dest = {
  name: "hopper",
  color: "white",
  body: {
    legs: 3,
    eyes: 2,
  },
  food: "fish",
};

const src = {
  name: "pirate",
  color: "gray",
  body: {
    limbs: {
      hands: 2,
      legs: 1,
    },
    eyes: 1,
  },
};

// The goal is to write a function to deep merge the two objects.

const merge = (de, source) => {
  const destination = de;

  function inner(dest, src) {
    Object.keys(src).forEach((attr) => {
      console.log("Source: ", attr);
      if (dest[attr]) {
        if (typeof dest[attr] == "object" && !Array.isArray(dest[attr])) {
          dest[attr] = inner(dest[attr], src[attr]);
        } else dest[attr] = src[attr];
      } else dest[attr] = src[attr];
    });
    return dest;
  }
  return inner(destination, source);
};

console.log(merge({}, src));
// Therefore, running the function merge(catBro, doggo) should return following result:

const res = {
  name: "pirate",
  color: "gray",
  body: {
    legs: 3,
    eyes: 1,
    limbs: {
      hands: 2,
      legs: 1,
    },
  },
  food: "fish",
};
