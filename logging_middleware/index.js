"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const Log = async (stack, level, pkg, message) => {
    const payload = {
        stack,
        level,
        package: pkg,
        message,
    };
    try {
        const response = await fetch("http://20.207.122.201/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // The API is a protected route. Make sure to provide a valid token.
                // Assuming an environment variable for token depending on context (e.g. process.env in node or NEXT_PUBLIC on frontend)
                "Authorization": `Bearer ${typeof process !== "undefined" && process?.env?.LOGGING_TOKEN
                    ? process.env.LOGGING_TOKEN
                    : ""}`,
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            console.error(`Logging Middleware Failed: ${response.status} ${response.statusText}`);
        }
    }
    catch (error) {
        console.error("Failed to send log to Evaluation Service:", error);
    }
};
exports.Log = Log;
//# sourceMappingURL=index.js.map