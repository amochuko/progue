interface Props {
  copyright: string;
  styles?: React.CSSProperties;
  children?: React.ReactNode
}

/**
 * The Copyright components sets the copkyright on the footer of web
 * @param {string} copyright description
 * @param {string} styles optional styles
 * @param {HTMLBodyElement} children optional HTMLElemet
 * 
 * @returns HTMLElement
 */
export const Copyright = (props: Props) => (
  <p style={{ ...props.styles }}>
    © {new Date().getUTCFullYear().toString()} -{' '}
    {props.copyright && props.copyright}
  </p>
);
