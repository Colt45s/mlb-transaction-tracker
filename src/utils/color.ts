const colors = {
  RET: '#dc3545',
  DES: '#ffc107',
  SFA: '#007bff',
  TR: '#17a2b8'
} as const;

type Colors = typeof colors;

export function pickColorByCodeType<K extends string>(
  typeCode: K
): K extends keyof Colors ? Colors[K] : undefined {
  return (colors as any)[typeCode];
}
