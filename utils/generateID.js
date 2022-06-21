const generateID = () => {
  const generatedNumbers = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1)
  return generatedNumbers
}
export default generateID
