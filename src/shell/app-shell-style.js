import { css } from 'lit-element'

export const style = css`
  :host {
    display: flex;
    flex-direction: column;
  }

  app-drawer {
    z-index: 100;
  }

  app-drawer div {
    height: 100vh;
  }

  shell-drawer {
    height: 100vh;
    -webkit-overflow-scrolling: touch;
  }

  main {
    flex: 1;

    display: flex;
    flex-direction: column;

    height: 100vh;
  }

  main > * {
    display: none;
  }

  main > *[active] {
    flex: 1;

    display: flex;
    flex-direction: column;
  }

  .meta {
    pointer-events: none;
    font-size: 0.5em;
    opacity: 0.5;
    user-select: none;
    cursor: default;
    position: fixed;
    bottom: 8px;
    right: 8px;
  }

  /* Wide layout */
  @media (min-width: 768px) {
    main {
      margin-left: var(--app-drawer-width);
    }

    main[forceNarrow] {
      margin-left: 0;
    }
  }
`
