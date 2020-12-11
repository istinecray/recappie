import getJson from "utilities/getJson";

const fetcher = (url) => fetch(url).then(getJson);

export default fetcher;
