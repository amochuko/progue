import http from 'http'

export default function request(url: string) {
  return new Promise((resolve) => {
    http.get({ path: url }, (resp) => {
      let data = "";
      resp.on("data", (_data) => (data += _data));
      resp.on("end", () => resolve(data));
    });
  });
}
