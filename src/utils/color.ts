const code: { [key: string]: string } = {
  RET: '#dc3545',
  DES: '#ffc107',
  SFA: '#007bff',
  TR: '#17a2b8'
}

export const pickColorByCodeType = (typeCode: string) => {
  return code[typeCode]
}
