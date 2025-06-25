export function cleanInputValue(formattedValue: string): string {
  return formattedValue.replace(/,/g, '')
}

export const handleInputValidation = (
  value: string,
  field: 'send' | 'receive',
  onChange: (value: string) => void,
  setEditingField: (field: 'send' | 'receive') => void
) => {
  const cleanValue = cleanInputValue(value)
  if (/^\d*\.?\d*$/.test(cleanValue) || cleanValue === '') {
    setEditingField(field)
    onChange(cleanValue)
  }
}
