export function ActionButton({
  children,
  color = 'green',
  description = '',
  ...props
}) {
  const colors = {
    green: 'text-green-900 border-green-800 text',
    red: 'text-red-900 border-red-800',
  };

  const classes = `py-2 px-3 text-end border-4 rounded-md ${colors[color]}`;

  return (
    <button className={classes}>
      <span className="uppercas text-md font-bold">{children}</span>
      {description && (
        <>
          <br /> <span className="text-sm">{description}</span>
        </>
      )}
    </button>
  );
}
