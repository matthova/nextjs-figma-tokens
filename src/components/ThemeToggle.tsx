'use client'

import * as React from 'react';
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-4">
      <button className={`border border-onbackground p-2 rounded-md ${theme === 'light' && 'bg-primary text-onprimary'}`} onClick={() => setTheme('light')}>Light</button>
      <button className={`border border-onbackground p-2 rounded-md ${theme === 'dark' && 'bg-primary text-onprimary'}`} onClick={() => setTheme('dark')}>Dark</button>
      <button className={`border border-onbackground p-2 rounded-md ${theme === 'system' && 'bg-primary text-onprimary'}`} onClick={() => setTheme('system')}>System</button>
    </div>
  );
}