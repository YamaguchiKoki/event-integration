import { CloudFrontRequestEvent, CloudFrontRequestHandler, Context } from "aws-lambda";

const hashPayload = async (payload: string) => {
  const encoder = new TextEncoder().encode(payload);
  const hash = await crypto.subtle.digest("SHA-256", encoder);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
};

// sigv4署名はCloudfront OACに移譲し、lambda@edgeではリクエストボディのハッシュ計算を行いその結果をヘッダーに追加する
export const handler: CloudFrontRequestHandler = async (
  event: CloudFrontRequestEvent,
  _context: Context,
) => {
  console.log("event=" + JSON.stringify(event));

  const request = event.Records[0].cf.request;
  console.log("originalRequest=" + JSON.stringify(request));

  if (!request.body?.data) {
    return request;
  }

  const body = request.body.data;
  const decodedBody = Buffer.from(body, "base64").toString("utf-8");

  request.headers["x-amz-content-sha256"] = [
    { key: "x-amz-content-sha256", value: await hashPayload(decodedBody) },
  ];

  console.log("hashedRequest=" + JSON.stringify(request));
  return request;
}
