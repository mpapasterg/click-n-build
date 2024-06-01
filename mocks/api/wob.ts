import { http, type RequestHandler } from "msw";

export const handlers: Array<RequestHandler> = [
  http.get(WoBGetURL, ({ request, params, cookies }) => {}),
];
