import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer, SetupServerApi } from "msw/node";

// Define node API server mock
const server: SetupServerApi = setupServer();

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
