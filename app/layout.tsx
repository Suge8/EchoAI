import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Noto_Sans_SC } from 'next/font/google';

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ch">
      <head />
      
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
          notoSansSC.variable
        )}
      >

        {/* 里面的都可以切换主题 */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>

          {/* 根布局    固定视口高度，不允许滚动，flex 用于侧边栏和右侧界面水平布局 */}
          <div className="flex h-screen">

            {/* 侧边栏 */}
            <Sidebar />

            {/* 右侧界面   flex-col 用于导航栏，主内容，页脚的垂直布局*/}
            <div className="flex-1 flex flex-col ">

              {/* 导航栏 */}
              <Navbar />

              {/* 主内容区域 - 允许内容滚动 */}
              <main className="flex-1 flex overflow-y-auto">
                {children}
              </main>

              {/* 页脚 - 固定在底部 */}
              <footer className="w-full flex items-center justify-center pb-2">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://quqi.pro"
                  title="QuQi AI"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">QuQi AI</p>
                </Link>
              </footer>

            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
