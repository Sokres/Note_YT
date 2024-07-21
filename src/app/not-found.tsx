import Link from "next/link";

export default function NotFoundRoot() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-100 py-10 dark:bg-gray-900">
      <LightIcon />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        404
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Страница не наедена
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}

function LightIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="50px"
      viewBox="0,0,255.98012,255.98012"
      className="className"
    >
      <g
        fill="#5ba288"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
      >
        <g transform="scale(5.12,5.12)">
          <path d="M24.8125,0c-0.33984,0.0625 -0.625,0.30078 -0.75,0.625l-10,24c-0.125,0.30859 -0.08594,0.66016 0.10156,0.9375c0.1875,0.27734 0.5,0.44141 0.83594,0.4375h7.625l-7.46875,22.4375l-0.09375,0.25c-0.16406,0.47656 0.05078,1 0.50391,1.22266c0.45313,0.22266 1,0.07422 1.27734,-0.34766l19,-29c0.21094,-0.30859 0.23047,-0.71094 0.05469,-1.03906c-0.17969,-0.32812 -0.52344,-0.53125 -0.89844,-0.52344h-7.46875l7.875,-17.59375c0.13672,-0.30859 0.10938,-0.66406 -0.07422,-0.94922c-0.18359,-0.28125 -0.49609,-0.45312 -0.83203,-0.45703h-9.5c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM25.6875,2h7.28125l-7.875,17.59375c-0.13672,0.30859 -0.10937,0.66406 0.07422,0.94922c0.18359,0.28125 0.49609,0.45313 0.83203,0.45703h7.125l-13.75,21l5.5625,-16.6875c0.09766,-0.30078 0.05078,-0.63281 -0.13672,-0.89453c-0.18359,-0.25781 -0.48047,-0.41406 -0.80078,-0.41797h-7.5z"></path>
        </g>
      </g>
    </svg>
  );
}
