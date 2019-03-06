const colors = {
  RET: '#dc3545',
  DES: '#ffc107',
  SFA: '#007bff',
  TR: '#17a2b8'
}

type Colors = typeof colors

export function pickColorByCodeType<K extends keyof Colors>(
  typeCode: K
): K extends keyof Colors ? Colors[K] : undefined {
  return (colors as any)[typeCode]
}
