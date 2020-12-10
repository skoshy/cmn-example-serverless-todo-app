export default function handler(req, res): void {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(`${Date.now()}`);
}
