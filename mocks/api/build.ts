import { http, RequestHandler, type ResponseResolver } from "msw";
import { requiresAuthentication } from "../middleware/auth";

export const handlers: Array<RequestHandler> = [
  http.post(
    BuildPostURL,
    requiresAuthentication((accessToken, { request, params, cookies }) => {})
  ),
  http.post(
    BuildPostPostURL,
    requiresAuthentication((accessToken, { request, params, cookies }) => {})
  ),
  http.post(
    BuildPurchasePostURL,
    requiresAuthentication((accessToken, { request, params, cookies }) => {})
  ),
  http.post(
    BuildRatePostURL,
    requiresAuthentication((accessToken, { request, params, cookies }) => {})
  ),
  http.get(
    BuildGenerateGetURL,
    requiresAuthentication((accessToken, { request, params, cookies }) => {})
  ),
];
