import { css } from 'lit-element'

export const AppTheme = css`
  :host {
    --primary-color: #826960;
    --secondary-color: #92715c;
    --third-color: #d6cec2;
    --fourth-color: #f4f4f4;
    --primary-accent-color: #ffae35;
    --secondary-accent-color: #f57f68;
    --primary-dark-color: #333;
    --secondary-dark-color: #525c63;
    --third-dark-color: #919eab;
    --primary-dark-opacity15-color: rgba(0, 0, 0, 0.15);

    --app-drawer-width: 200px;

    --paper-radio-button-size: 12px;
    --paper-radio-button-label-color: var(--primary-text-color);
    --paper-radio-button-label-spacing: 3px;
    --paper-radio-button-checked-color: var(--secondary-color);
    --paper-radio-button-checked-ink-color: var(--secondary-color);
    --paper-radio-button-unchecked-color: #bdbdbd;
    --paper-radio-button-unchecked-ink-color: #bdbdbd;
    --paper-badge-background: rgba(0, 0, 0, 0.2);
    --paper-badge-margin-left: -25px;
    --paper-input-container-focus-color: var(--secondary-color);
    --paper-toolbar-background: transparent;
    --paper-listbox-background-color: var(--primary-color);

    --paper-tabs-selection-bar-color: transparent;

    /* material design component themes */
    --mdc-theme-on-primary: white;
    --mdc-theme-primary: tomato;
    --mdc-theme-on-secondary: white;
    --mdc-theme-secondary: tomato;
  }
`
