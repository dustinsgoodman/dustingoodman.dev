function FooterLink({ href, children, ...rest }) {
  return (
    <a
      {...rest}
      href={href}
      className="block p-1 text-gray-500 dark:text-blue-100 hover:text-blue-500 focus:text-blue-500 dark:hover:text-sky-400 dark:focus:text-sky-400 text-base uppercase no-underline border-b border-transparent hover:border-blue-500 dark:hover:border-sky-400"
    >
      {children}
    </a>
  );
}

export default FooterLink;
