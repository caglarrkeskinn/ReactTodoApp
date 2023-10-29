import { ReactNode, FC } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
      <head></head>
      <body>
        <h1>Awesome Todo App</h1>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
