export class TapestrySafeResponse implements Response {
  constructor(private response: Error | string) {}

  private _bodyUsed = false;

  get bodyUsed() {
    return this._bodyUsed;
  }

  get body(): ReadableStream<Uint8Array> {
    throw new Error("not implementable in the Tapestry environment");
  }

  get headers(): Headers {
    throw new Error("not implementable in the Tapestry environment");
  }

  get ok(): boolean {
    return typeof this.response === "string";
  }

  get redirected(): boolean {
    throw new Error("not implementable in the Tapestry environment");
  }

  get status(): number {
    throw new Error("not implementable in the Tapestry environment");
  }

  get statusText(): string {
    throw new Error("not implementable in the Tapestry environment");
  }

  get type(): ResponseType {
    throw new Error("not implementable in the Tapestry environment");
  }

  get url(): string {
    throw new Error("not implementable in the Tapestry environment");
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error("not implementable in the Tapestry environment");
  }

  async blob(): Promise<Blob> {
    throw new Error("not implementable in the Tapestry environment");
  }

  clone(): TapestrySafeResponse {
    return new TapestrySafeResponse(this.response);
  }

  async formData(): Promise<FormData> {
    throw new Error("not implementable in the Tapestry environment");
  }

  async json(): Promise<any> {
    const result = await this.text();

    return JSON.parse(result);
  }

  text(): Promise<string> {
    this._bodyUsed = true;

    if (typeof this.response === "string") {
      return Promise.resolve(this.response);
    } else {
      return Promise.reject("Cannot parse a Tapestry error response");
    }
  }
}
