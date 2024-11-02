export function ActionButton({
  children,
  type = 'button',
  description = '',
  ...props
}) {
  const classes = `py-2 px-3 text-end inline-block ${
    type === 'submit' ? 'submit-button' : ''
  }`;

  return (
    <button className={classes} type="button" {...props}>
      <span className="uppercase text-md font-bold">{children}</span>
      {description && (
        <>
          <br /> <span className="text-sm">{description}</span>
        </>
      )}
    </button>
  );
}
