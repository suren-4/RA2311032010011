export type StackType = 'backend' | 'frontend';
export type LevelType = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogPayload {
  stack: StackType;
  level: LevelType;
  package: string;
  message: string;
}

export const executeLog = async (
  stack: StackType,
  level: LevelType,
  pkg: string,
  message: string
): Promise<void> => {
  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  const endpoint = 'http://20.207.122.201/evaluation-service/logs';
  // Use logical fallback for authorization token based on environment context
  const authToken = typeof process !== 'undefined' && process?.env?.LOGGING_TOKEN 
      ? process.env.LOGGING_TOKEN 
      : '';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn(`[Logging] Delivery failed (${response.status}): ${response.statusText}`);
    }
  } catch (error) {
    console.error('[Logging] Connection to telemetry failed:', error);
  }
};
