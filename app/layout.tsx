import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import '../styles.css';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";
import { generateMetadata } from './utils/metadata';
import { Send, Globe } from "lucide-react";

const banner = <Banner storageKey="some-key">Upcoming action-learning journey: Accra, Ghana @ May 18 2025</Banner>

const navbar = (
  <Navbar
    logo={
      <div>
        <Image src="/logo_colour_w_text.svg" width={140} height={60} alt="Prisma Logo" />
      </div>
    }
    chatIcon={<Send size={20} />}
    chatLink={"https://t.me/+9-UF8k9H8dBjNWFk"}
    children={
      <div className="flex gap-4">
        {/* Website */}
        <a href="https://www.prisma.events" target="_blank" rel="noopener noreferrer">
          <Globe size={20} />
        </a>
      </div>
    }
    projectLink={"https://github.com/prisma-collective/"}
  />
);

const footer = <Footer>Prisma © {new Date().getFullYear()}</Footer>

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { mdxPath?: string[] };
}) {
  const metadata = await generateMetadata({ params }); // Generate dynamic metadata

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/prisma-collective/docs"
          footer={footer}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
          editLink={null}
          nextThemes={{ defaultTheme: "dark" }}
        >
          {children}
          <Analytics />
        </Layout>
      </body>
    </html>
  );
}
