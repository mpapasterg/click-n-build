export default defineEventHandler((event) => {
  const response: ServerErrorResponse = {
    message: "API endpoint not found",
  };
  return Response.json(response, {
    status: 404,
    statusText: "Not Found",
  });
});
