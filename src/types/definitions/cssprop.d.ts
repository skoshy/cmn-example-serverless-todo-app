/// <reference types="styled-components/cssprop" />
// Add support for css prop

declare namespace React {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
