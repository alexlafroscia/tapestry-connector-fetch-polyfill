const METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"]);

function isValidMethod(input: string): input is Method {
  return METHODS.has(input);
}

type ValidatedInput = {
  url: string;
  method: Method | undefined;
  body: string | null;
  headers: Record<string, string> | null;
};

export function validateInput(
  input: RequestInfo | URL,
  init?: RequestInit
): ValidatedInput {
  let url: string,
    method: Method | undefined,
    body: string | null = null,
    headers: Record<string, string> | null = {};

  if (typeof input === "string") {
    url = input;
  } else {
    throw new Error("`fetch` must be called with a `string` URL");
  }

  if (init?.method) {
    if (isValidMethod(init.method)) {
      method = init.method;
    } else if (init.method) {
      throw new Error("`method` must be a recognized HTTP method");
    }
  }

  if (init?.body) {
    if (typeof init.body === "string") {
      body = init.body;
    } else {
      throw new Error("`body` must be a string");
    }
  }

  if (init?.headers) {
    if (Array.isArray(init.headers)) {
      headers = Object.fromEntries(init.headers);
    } else {
      // TODO: handle `Headers` instance?
      // @ts-expect-error
      headers = init.headers;
    }
  }

  return {
    url,
    method,
    body,
    headers,
  };
}
