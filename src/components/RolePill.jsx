function RolePill({ children }) {
  return (
    <span className="relative flex items-center font-black rounded-sm text-blue-100 dark:text-blue-900 bg-neutral-900 dark:bg-blue-100 px-2 py-1 z-[2] md:text-xl">
      {children}
    </span>
  );
}

export default RolePill;
