function FooterLink({ href, children, ...rest }) {
  return (
    <a
      {...rest}
      href={href}
      className="block border-b border-transparent p-1 text-base uppercase text-gray-500 no-underline hover:border-blue-600 hover:text-blue-600 focus:text-blue-600 dark:text-blue-100 dark:hover:border-sky-400 dark:hover:text-sky-400 dark:focus:text-sky-400"
    >
      {children}
    </a>
  );
}

export default FooterLink;
