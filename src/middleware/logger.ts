import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const { method, url, hostname, ip, headers, body, query, params } = req;

  console.log("========== [Request Logger] ==========");
  console.log(`🕒 Timestamp     : ${timestamp}`);
  console.log(`🔗 Method        : ${method}`);
  console.log(`🌐 URL           : ${url}`);
  console.log(`🏠 Hostname      : ${hostname}`);
  console.log(`📍 IP Address    : ${ip}`);
  console.log(`🧭 User-Agent    : ${headers["user-agent"]}`);

  if (Object.keys(body || {}).length) {
    console.log("📦 Body          :", sanitize(body));
  }

  if (Object.keys(query || {}).length) {
    console.log("🔎 Query Params  :", query);
  }

  if (Object.keys(params || {}).length) {
    console.log("🧩 Route Params  :", params);
  }

  console.log("======================================");

  next();
};

// Optional: mask sensitive fields
function sanitize(data: any) {
  const clone = { ...data };
  if ("password" in clone) clone.password = "***";
  if ("token" in clone) clone.token = "***";
  return clone;
}

export default logger;


// import { NextFunction, Request, Response } from "express"

// const logger = (req: Request, res: Response, next: NextFunction) => {
//     console.log("Logger Starts____________");
//     console.log(req.url, req.hostname, req.method)
//     // console.log("Request", req);
//     if (req.body) {
//         console.log("Request Body", req.body);
//     }
//     if (req.query) {
//         // console.log("Request Query", req.query);
//     }
//     if (req.params) {
//         // console.log("Request Params", req.params);
//     }
//     console.log("Logger Ends____________");
    
//     next();
// }

// export default logger