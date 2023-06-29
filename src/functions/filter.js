export const getCategory = (data) => {
    const attributeName = "categories";
    let newVal = data.map((curElem) => {
        return curElem[attributeName];
      });
    newVal = newVal.map((curElem) => {
        return curElem[0].name;
    })
    return ["все", ...new Set(newVal)];
  };
  
      