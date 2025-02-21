import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Moon, SunDim } from 'lucide-react';
import { TooltipContainer } from '../ui/tooltip';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button disabled variant="secondary-ghost" size="icon" rounded="full">
        <SunDim />
      </Button>
    );
  }

  const ThemeIcon = theme === 'dark' ? Moon : SunDim;
  const themeLabel = theme === 'dark' ? 'To Light Mode' : 'To Dark Mode';

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <TooltipContainer side="right" label={themeLabel}>
      <Button
        variant="secondary-ghost"
        size="icon"
        rounded="full"
        onClick={toggleDarkMode}
      >
        <ThemeIcon />
        <span className="sr-only">{themeLabel}</span>
      </Button>
    </TooltipContainer>
  );
};

export default ThemeSwitch;
