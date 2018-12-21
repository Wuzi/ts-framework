import { BaseServerOptions, Job, Logger, LoggerInstance } from "ts-framework-common";
import { RequestComponentOptions, RouterComponentOptions, SecurityComponentOptions } from "../components";
import ReplServer from "../repl";

export interface ServerOptions extends BaseServerOptions {
  /* Base server options */
  port: string | number;
  repl?: ReplServer;

  /* Logger options */
  logger?: LoggerInstance;

  /* Sentry options */
  sentry?: {
    dsn: string;
  };

  /* Security options */
  security?: SecurityComponentOptions;

  /* Request options */
  request?: RequestComponentOptions;

  /* Router options */
  router?: RouterComponentOptions;

  /* Startup options */
  startup?: {
    pipeline: Job[];
  };
}
