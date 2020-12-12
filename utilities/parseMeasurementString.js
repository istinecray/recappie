export const parseMeasurementString = (measurementString) => {
  let measurement = measurementString;

  if (measurement.includes("/")) {
    const [numerator, denominator] = measurement.split("/");
    measurement = (numerator / denominator).toFixed(5);
  }

  return parseFloat(measurement);
};
