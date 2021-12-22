function HeaderLink({ href, children }) {
  return (
    <a
      href={href}
      className="block leading-6 text-gray-500 dark:text-blue-100 hover:no-underline text-base uppercase py-1 border-b border-transparent hover:border-blue-500 dark:hover:border-sky-400 hover:text-blue-500 focus:text-blue-500 dark:hover:text-sky-400 dark:focus:text-sky-400"
    >
      {children}
    </a>
  );
}

export default HeaderLink;
