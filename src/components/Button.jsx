function Button({
  children,
  className,
  onClick = () => {},
  disabled = false,
  ...rest
}) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
