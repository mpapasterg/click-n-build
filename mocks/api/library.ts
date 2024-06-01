import { http, type RequestHandler } from "msw";

export const handlers: Array<RequestHandler> = [
  http.get(LibraryGetURL, ({ request, params, cookies }) => {}),
];
