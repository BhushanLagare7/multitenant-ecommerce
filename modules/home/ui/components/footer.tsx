/**
 * Footer component
 * @description A component that renders the footer.
 * @returns {JSX.Element} A JSX element that renders the footer component
 */
export const Footer = () => {
  return (
    <footer className="flex justify-between p-6 font-medium border-t">
      <div className="flex gap-2 items-center">
        <p>funroad, Inc. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
