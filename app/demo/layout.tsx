import React from 'react';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="bg-gray-100 min-h-screen">
            {/* We are already inside RootLayout which has DemoProvider, but if we need a separate context scope or overlay, we can add it here. 
          Actually, RootLayout already wraps children in DemoProvider. 
          So we just pass children through.
      */}
            {children}
        </section>
    );
}
