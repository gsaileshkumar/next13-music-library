import client from "@solely/simple-fm";

const lastFmApi = new client(process.env.LAST_FM_API_KEY ?? "");
export default lastFmApi;
