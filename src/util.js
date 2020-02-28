const assignArrayToDeepObject = (inputArray = [], templateObject = {}) => {
  let output = {};
  for (const arrayElem of inputArray) {
    let template = JSON.stringify({ ...templateObject }, null, 4);
    for (const [index, value] of Object.entries(arrayElem)) {
      template = template.replace(`{{${index}}}`, value);
    }
    output = mergeObjectWithoutMergingArray(output, JSON.parse(template));
  }
  return output;
};

const mergeObjectWithoutMergingArray = (input, toMerged) => {
  if (JSON.stringify(input) === "{}") {
    let x = { ...input, ...toMerged };
    console.log(x);
    return x;
  }
  for (const p of Object.keys(input)) {
    let a = input[p];
    for (const index of Object.keys(a)) {
      if (Array.isArray(a[index])) {
        a[index].push(toMerged[p][index][0]);
      }
    }
  }
  return input;
};

module.exports = {
  assignArrayToDeepObject
};
