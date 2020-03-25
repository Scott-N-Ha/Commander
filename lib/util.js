const Util = {
  distance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },

  length(vector) {
    return Util.distance([0, 0], vector);
  },

  scale(vector, amount) {
    return [vector[0] * amount, vector[1] * amount];
  },

  direction(vector) {
    const length = Util.length(vector);
    return Util.scale(vector, 1 / length);
  },
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
}

export default Util;