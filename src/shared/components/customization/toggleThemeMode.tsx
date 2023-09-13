
import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/src/shared/components/ui/dropdown-menu';

interface Props{
  className?: string
}
const ThemeModeToggle = ({className}:Props) => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild className={`cursor-pointer ${className}`}>
        <div>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 dark:hidden" />
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 hidden dark:block transition-all dark:rotate-0 dark:scale-100" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeModeToggle;
