import React from 'react'

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M11.5 6.5c0-1.781-.969-3.406-2.5-4.313a4.937 4.937 0 0 0-5 0A4.961 4.961 0 0 0 1.5 6.5c0 1.813.938 3.438 2.5 4.344a4.938 4.938 0 0 0 5 0c1.531-.906 2.5-2.531 2.5-4.344Zm-.969 5.125A6.548 6.548 0 0 1 6.5 13 6.495 6.495 0 0 1 0 6.5C0 2.937 2.906 0 6.5 0 10.063 0 13 2.938 13 6.5a6.597 6.597 0 0 1-1.406 4.063l4.187 4.156c.281.312.281.781 0 1.062-.312.313-.781.313-1.062 0l-4.188-4.156Z"
      />
    </svg>
  )
}
