"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/node");
const ts_framework_common_1 = require("ts-framework-common");
const HttpCode_1 = require("./http/HttpCode");
const HttpError_1 = require("./http/HttpError");
class ErrorReporter {
    constructor(errorDefinitions, options = {}) {
        this.errorDefinitions = errorDefinitions;
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    static middleware(errorDefinitions, options) {
        const reporter = new ErrorReporter(errorDefinitions, options);
        return function errorReporterMiddleware(app) {
            app.use((req, res) => reporter.notFound(req, res));
            app.use((error, req, res, next) => reporter.unknownError(error, req, res, next));
            app.use(Sentry.Handlers.errorHandler());
        };
    }
    notFound(req, res) {
        // Build error message
        const message = "The resource was not found"
            + this.options.group404 ? "." : `: ${req.method.toUpperCase()} ${req.originalUrl}`;
        // Build error instance
        const error = new HttpError_1.default(message, 404, {
            method: req.method,
            originalUrl: req.originalUrl
        });
        // Log to console
        this.logger.warn(error);
        // Respond with error
        res.error(error);
    }
    unknownError(error, req, res, next) {
        let serverError;
        // Prepare error instance
        if (error && error.inner && error.inner instanceof HttpError_1.default) {
            // Fix for OAuth 2.0 errors, which encapsulate the original one into the "inner" property
            serverError = error.inner;
        }
        else if (error && error instanceof HttpError_1.default) {
            serverError = error;
        }
        else {
            serverError = new HttpError_1.default(error.message || error, error.status || HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR, {
                code: error.code ? error.code : undefined
            });
            serverError.stack = error.stack || serverError.stack;
        }
        // Log to console
        this.logger.error(serverError);
        // Respond with error
        res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
    }
}
exports.ErrorReporter = ErrorReporter;
exports.default = ErrorReporter.middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLDZEQUE2RDtBQUM3RCw4Q0FBbUQ7QUFDbkQsZ0RBQXlDO0FBZXpDLE1BQWEsYUFBYTtJQUt4QixZQUFZLGdCQUFrQyxFQUFFLFVBQWdDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFrQyxFQUFFLE9BQTZCO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCLEVBQUUsR0FBaUI7UUFDMUMsc0JBQXNCO1FBQ3RCLE1BQU0sT0FBTyxHQUFHLDRCQUE0QjtjQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJGLHVCQUF1QjtRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUN4QyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixxQkFBcUI7UUFDckIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVUsRUFBRSxHQUFnQixFQUFFLEdBQWlCLEVBQUUsSUFBYztRQUMxRSxJQUFJLFdBQXNCLENBQUM7UUFFM0IseUJBQXlCO1FBQ3pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssWUFBWSxtQkFBUyxFQUFFO1lBQzVELHlGQUF5RjtZQUN6RixXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQWtCLENBQUM7U0FDeEM7YUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksbUJBQVMsRUFBRTtZQUM5QyxXQUFXLEdBQUcsS0FBa0IsQ0FBQztTQUNsQzthQUFNO1lBQ0wsV0FBVyxHQUFHLElBQUksbUJBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxJQUFJLDJCQUFnQixDQUFDLHFCQUFxQixFQUFFO2dCQUMxRyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUzthQUMxQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztTQUN0RDtRQUVELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUvQixxQkFBcUI7UUFDckIsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN4RyxDQUFDO0NBQ0Y7QUE1REQsc0NBNERDO0FBRUQsa0JBQWUsYUFBYSxDQUFDLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVscGVycy9yZXNwb25zZVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBIdHRwU2VydmVyRXJyb3JzIH0gZnJvbSBcIi4vaHR0cC9IdHRwQ29kZVwiO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tIFwiLi9odHRwL0h0dHBFcnJvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yUmVwb3J0ZXJPcHRpb25zIHtcbiAgc2VudHJ5PzogU2VudHJ5Lk5vZGVDbGllbnQ7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBncm91cDQwND86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JEZWZpbml0aW9ucyB7XG4gIFtjb2RlOiBzdHJpbmddOiB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRXJyb3JSZXBvcnRlciB7XG4gIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIG9wdGlvbnM6IEVycm9yUmVwb3J0ZXJPcHRpb25zO1xuICBlcnJvckRlZmluaXRpb25zOiBFcnJvckRlZmluaXRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnMsIG9wdGlvbnM6IEVycm9yUmVwb3J0ZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmVycm9yRGVmaW5pdGlvbnMgPSBlcnJvckRlZmluaXRpb25zO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBtaWRkbGV3YXJlKGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnMsIG9wdGlvbnM6IEVycm9yUmVwb3J0ZXJPcHRpb25zKTogKEFwcGxpY2F0aW9uKSA9PiB2b2lkIHtcbiAgICBjb25zdCByZXBvcnRlciA9IG5ldyBFcnJvclJlcG9ydGVyKGVycm9yRGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiBlcnJvclJlcG9ydGVyTWlkZGxld2FyZShhcHApIHtcbiAgICAgIGFwcC51c2UoKHJlcSwgcmVzKSA9PiByZXBvcnRlci5ub3RGb3VuZChyZXEsIHJlcykpO1xuICAgICAgYXBwLnVzZSgoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSA9PiByZXBvcnRlci51bmtub3duRXJyb3IoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSk7XG4gICAgICBhcHAudXNlKFNlbnRyeS5IYW5kbGVycy5lcnJvckhhbmRsZXIoKSk7XG4gICAgfTtcbiAgfVxuXG4gIG5vdEZvdW5kKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlKSB7XG4gICAgLy8gQnVpbGQgZXJyb3IgbWVzc2FnZVxuICAgIGNvbnN0IG1lc3NhZ2UgPSBcIlRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kXCIgXG4gICAgICArIHRoaXMub3B0aW9ucy5ncm91cDQwNCA/IFwiLlwiIDogYDogJHtyZXEubWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cmVxLm9yaWdpbmFsVXJsfWA7XG4gICAgXG4gICAgLy8gQnVpbGQgZXJyb3IgaW5zdGFuY2VcbiAgICBjb25zdCBlcnJvciA9IG5ldyBIdHRwRXJyb3IobWVzc2FnZSwgNDA0LCB7XG4gICAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgICBvcmlnaW5hbFVybDogcmVxLm9yaWdpbmFsVXJsXG4gICAgfSk7XG5cbiAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3IpO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yKGVycm9yKTtcbiAgfVxuXG4gIHVua25vd25FcnJvcihlcnJvcjogYW55LCByZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pIHtcbiAgICBsZXQgc2VydmVyRXJyb3I6IEh0dHBFcnJvcjtcblxuICAgIC8vIFByZXBhcmUgZXJyb3IgaW5zdGFuY2VcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IuaW5uZXIgJiYgZXJyb3IuaW5uZXIgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcbiAgICAgIC8vIEZpeCBmb3IgT0F1dGggMi4wIGVycm9ycywgd2hpY2ggZW5jYXBzdWxhdGUgdGhlIG9yaWdpbmFsIG9uZSBpbnRvIHRoZSBcImlubmVyXCIgcHJvcGVydHlcbiAgICAgIHNlcnZlckVycm9yID0gZXJyb3IuaW5uZXIgYXMgSHR0cEVycm9yO1xuICAgIH0gZWxzZSBpZiAoZXJyb3IgJiYgZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcbiAgICAgIHNlcnZlckVycm9yID0gZXJyb3IgYXMgSHR0cEVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IG5ldyBIdHRwRXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgZXJyb3Iuc3RhdHVzIHx8IEh0dHBTZXJ2ZXJFcnJvcnMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCB7XG4gICAgICAgIGNvZGU6IGVycm9yLmNvZGUgPyBlcnJvci5jb2RlIDogdW5kZWZpbmVkXG4gICAgICB9KTtcbiAgICAgIHNlcnZlckVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2sgfHwgc2VydmVyRXJyb3Iuc3RhY2s7XG4gICAgfVxuXG4gICAgLy8gTG9nIHRvIGNvbnNvbGVcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihzZXJ2ZXJFcnJvcik7XG5cbiAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICByZXMuZXJyb3IgPyByZXMuZXJyb3Ioc2VydmVyRXJyb3IpIDogcmVzLnN0YXR1cyhzZXJ2ZXJFcnJvci5zdGF0dXMgfHwgNTAwKS5qc29uKHNlcnZlckVycm9yLnRvSlNPTigpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvclJlcG9ydGVyLm1pZGRsZXdhcmU7XG4iXX0=