import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'system'
interface ThemeContextValue { theme: Theme; setTheme: (t: Theme) => void; resolved: 'dark' | 'light' }
const ThemeContext = createContext<ThemeContextValue>({ theme: 'system', setTheme: () => {}, resolved: 'dark' })

function getSystemTheme(): 'dark' | 'light' { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
function applyTheme(resolved: 'dark' | 'light') { document.documentElement.classList.toggle('dark', resolved === 'dark'); document.documentElement.classList.toggle('light', resolved === 'light'); document.documentElement.style.colorScheme = resolved }

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system')
  const resolved = theme === 'system' ? getSystemTheme() : theme
  const setTheme = useCallback((t: Theme) => { setThemeState(t); localStorage.setItem('theme', t) }, [])
  useEffect(() => { applyTheme(resolved) }, [resolved])
  useEffect(() => { if (theme !== 'system') return; const mq = window.matchMedia('(prefers-color-scheme: dark)'); const h = () => applyTheme(getSystemTheme()); mq.addEventListener('change', h); return () => mq.removeEventListener('change', h) }, [theme])
  return <ThemeContext.Provider value={{ theme, setTheme, resolved }}>{children}</ThemeContext.Provider>
}

export function useTheme() { return useContext(ThemeContext) }