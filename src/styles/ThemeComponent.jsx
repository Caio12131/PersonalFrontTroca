import React, { useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import styled from 'styled-components';

const ThemeS = styled.button`
    border: 1px solid var(--buttonBorder);
    height: 100%;
    width: 60px;
    background: var(--extra);
    color: var(--buttonText);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
    #modeIcon {
      height: 25px;
      width: 25px;
    }
    #modeIconDark {
      height: 25px;
      width: 25px;
      color: #121212;
    }
    &:hover {
      cursor: pointer;
      background: var(--buttonStandardHover);
    }
`;

function ThemeComponent() {
  const { theme, setTheme } = UserAuth();

  const setMode = (mode) => {
    window.localStorage.setItem('themeNutritionApp', mode);
    setTheme(mode);
  };

  /* cria função para chamar o setMode e trocar o tema */
  const themeToggler = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeNutritionApp');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeS
      type="button"
      onClick={themeToggler}
    >
      <abbr title="Mode">
        {theme === 'light'
          ? <MdDarkMode id="modeIconDark" />
          : <MdLightMode id="modeIcon" />}
      </abbr>
    </ThemeS>
  );
}

export default ThemeComponent;
