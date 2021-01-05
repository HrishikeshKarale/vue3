export default function arrayFunctions(array, value) {
  const remove = () => {
    const index = exists();
    return index > -1 ? array.splice(index, 1) : false;
  };

  const exists = () => {
    return array.indexOf(value);
  };

  return { remove, exists };
}
