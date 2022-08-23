class FetchError extends Error {
  status: number;
  statusText: string;
  body: any;

  constructor(status: number, statusText: string, body: any) {
    super(statusText);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export default FetchError;
