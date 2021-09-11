export const numberFormat = (number) => number
.toString()
.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
