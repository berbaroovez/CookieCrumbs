export default async (url, token) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin", //using CORS to make sure is the same origin
  });

  return res.json();
};
