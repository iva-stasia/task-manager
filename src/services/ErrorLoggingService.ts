class ErrorLog {
  private readonly date: Date;

  public get details(): string {
    return `${this.message} - ${this.date.toISOString()}`;
  }

  constructor(private readonly message: string) {
    this.date = new Date();
  }
}

class ErrorLoggingService {
  private static instance: ErrorLoggingService;
  private readonly errors: ErrorLog[] = [];

  public get details(): string[] {
    return this.errors.map((error) => error.details);
  }

  private constructor() {}

  public static getInstance(): ErrorLoggingService {
    if (!ErrorLoggingService.instance) {
      ErrorLoggingService.instance = new ErrorLoggingService();
    }

    return ErrorLoggingService.instance;
  }

  public addErrorLog(message: string): void {
    const errorLog = new ErrorLog(message);
    this.errors.unshift(errorLog);
  }
}

export default ErrorLoggingService;
