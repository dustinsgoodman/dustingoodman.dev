import { useState } from 'preact/hooks';
import { SunIcon, MoonIcon } from '@/components/Icons';

function DarkModeToggle({ className = '' }) {
  const [isDark, setIsDark] = useState(localStorage.getItem('darkMode') === 'true');
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('darkMode', newIsDark);
    const html = document.querySelector('html')
    if (newIsDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  };

  return (
    <button className={className} onClick={toggleDarkMode}>
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default DarkModeToggle;
