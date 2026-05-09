import type { Metadata } from "next"; 
import { Rubik_Mono_One } from "next/font/google"; 
import "@/styles/globals.css";
 
const rubikMonoOne = Rubik_Mono_One({ 
  subsets: ["latin"], 
  weight: ["400"], 
  variable: "--font-rubikmonoone", 
  display: "swap", 
}); 
 
export const metadata: Metadata = { 
  title: "Maurice Halsberghe", 
  description: "Portfolio by Maurice Halsberghe", 
}; 
 
export default function RootLayout({ 
  children, 
}: Readonly<{ 
  children: React.ReactNode; 
}>) { 
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${rubikMonoOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  ); 
}