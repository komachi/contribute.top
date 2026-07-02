import { Box, Container } from "@chakra-ui/react";
import type { Metadata } from "next";
import Footer from "@/common/Footer";
import Header from "@/common/Header";
import { Provider } from "@/components/ui/provider";
import { cannonicalUrl, title } from "@/data/config";

export const metadata: Metadata = {
  metadataBase: new URL(cannonicalUrl),
  title,
  description: "Help crowdsourcing projects in open data and citizen science",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: title,
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Container>
            <Box minH="100vh" display="flex" flexDirection="column">
              <Box flex="1">
                <Header />
                {children}
              </Box>
              <Box as="footer" py={6}>
                <Footer />
              </Box>
            </Box>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
