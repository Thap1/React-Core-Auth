export function handleError(code, responseMessage) {
  switch (code) {
    case "900029":
      console.log("Error:::::900029");
      break;
    case "900090":
      console.log("Error:::::900090");
      break;
    case "900063":
      console.log("Error:::::900063");
      break;
    case "910006":
      console.log("Error:::::910006");
      break;

    default:
      break;
  }
}
