import { validateInput } from "./request.js";
import { TapestrySafeResponse } from "./response.js";

type Fetch = typeof fetch;

const tapestrySafeFetch: Fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<TapestrySafeResponse> => {
  try {
    const request = validateInput(input, init);
    const result = await sendRequest(
      request.url,
      request.method,
      request.body,
      request.headers
    );

    return new TapestrySafeResponse(result);
  } catch (e) {
    return new TapestrySafeResponse(e);
  }
};

export default tapestrySafeFetch;
