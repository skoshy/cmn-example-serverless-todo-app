import 'twin.macro';

export const Select = () => {
  return (
    <select tw="rounded border appearance-none border-brand-300 py-2 focus:outline-none focus:border-brand-500 pl-3 pr-10">
      <option>SM</option>
      <option>M</option>
      <option>L</option>
      <option>XL</option>
    </select>
  )
}
