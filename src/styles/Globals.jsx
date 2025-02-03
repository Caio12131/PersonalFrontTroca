/* File: src/styles/Globals.jsx */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  //define as cores do root
  :root {
    // Core
    --background: ${({ theme }) => theme.background};
    --main: ${({ theme }) => theme.main};
    --headline: ${({ theme }) => theme.headline};
    --textColor: ${({ theme }) => theme.textColor};
    // Buttons
    --buttonText: ${({ theme }) => theme.buttonText};
    --buttonBorder: ${({ theme }) => theme.buttonBorder};
    --buttonStandard: ${({ theme }) => theme.buttonStandard};
    --buttonStandardHover: ${({ theme }) => theme.buttonStandardHover};
    --buttonPrimary: ${({ theme }) => theme.buttonPrimary};
    --buttonPrimaryHover: ${({ theme }) => theme.buttonPrimaryHover};
    --buttonSecondary: ${({ theme }) => theme.buttonSecondary};
    --buttonSecondaryHover: ${({ theme }) => theme.buttonSecondaryHover};
    --buttonBackgroundDisabled: ${({ theme }) => theme.buttonBackgroundDisabled};
    // Others
    --tertiary: ${({ theme }) => theme.tertiary};
    --extra: ${({ theme }) => theme.extra};
    // Additional
    --transitionSpeed: ${({ theme }) => theme.transitionSpeed};
    --boxShadow: ${({ theme }) => theme.boxShadow};
    --borderColor: ${({ theme }) => theme.borderColor};
    --backgroundAccent: ${({ theme }) => theme.backgroundAccent};
    --backgroundAccentTransparent: ${({ theme }) => theme.backgroundAccentTransparent};
    --success: ${({ theme }) => theme.success};
    --error: ${({ theme }) => theme.error};
    --warning: ${({ theme }) => theme.warning};
    --info: ${({ theme }) => theme.info};
  }
`;
