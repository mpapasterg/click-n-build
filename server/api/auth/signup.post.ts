export default defineEventHandler(async (event) => {
  // Extract credentials from form data
  const credentials: FormData = await readFormData(event);
  const email: string | undefined = credentials.get("email")?.toString();
  const username: string | undefined = credentials.get("email")?.toString();
  const password: string | undefined = credentials.get("password")?.toString();

  // Check if all credentials were sent
  if (email === undefined || username === undefined || password === undefined) {
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid Credentials",
      },
    });
  }

  // Check credentials structure
  const result = SignUpPostRequestSchema.safeParse({
    email,
    username,
    password,
  });
  if (!result.success) {
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid credentials",
      },
    });
  }

  // Check if user with given email exists
  if (email === mockEmail) {
    throw createError({
      statusCode: sanitizeStatusCode(409),
      statusMessage: sanitizeStatusMessage("Conflict"),
      data: {
        message: "User with specified email already exists",
      },
    });
  }

  const auth: Auth = {
    email,
    username,
  };
  setResponseStatus(
    event,
    sanitizeStatusCode(201),
    sanitizeStatusMessage("Created")
  );
  return auth;
});
