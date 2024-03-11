export function generateError(errMsg: string, errInfo: string) {
  return /* svg */`
    <svg width="400" height="140" xmlns="http://www.w3.org/2000/svg">
      <rect fill="#F3F4F6" rx="4.5" stroke="#e4e2e2" stroke-opacity="1" width="100%" height="100%"></rect>
      <text x="10" y="50" text-anchor="start" fill="red">
        ${errInfo}
      </text>
      <text x="10" y="80" fill="red" font-size="10">
        ${errMsg}
      </text>
    </svg>
  `
}
