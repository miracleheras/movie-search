/** @format */

import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[calc(100vh-40px)]">{children}</div>
    </div>
  );
};

export const withMainLayout =
  (Page: React.FC): React.FC =>
  () => {
    return (
      <MainLayout>
        <Page />
      </MainLayout>
    );
  };
