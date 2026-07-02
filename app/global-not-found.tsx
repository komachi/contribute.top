import type { Metadata } from "next";
import type { FC } from "react";
import { Provider } from "@/components/ui/provider";
import NotFound from "./not-found";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const GlobalNotFound: FC = () => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <NotFound />
        </Provider>
      </body>
    </html>
  );
};

export default GlobalNotFound;
