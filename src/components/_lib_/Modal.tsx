import { useRef, PropsWithChildren } from 'react';
import tw, { styled } from 'twin.macro';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import { IS_BROWSER } from 'src/constants';

/**
 * Initializes React Modal whenever it's included in a page
 */
const setUpReactModal = (() => {
  let initialized = false;

  return () => {
    if (IS_BROWSER && !initialized) {
      const nextRoot = document.getElementById('__next');
      if (nextRoot) {
        // set the root doc element to next root
        // this enforces aria-hidden on it when modal is shown
        ReactModal.setAppElement(nextRoot);
      }
      // remove default styles, as we do this ourselves
      ReactModal.defaultStyles = {};

      initialized = true;
    }
  };
})();

type ModalWithoutExtraProps = (props: PropsWithChildren<ReactModalProps>) => JSX.Element;

interface ModalExtraProps {
  originalClassName: string;
}

const _Modal = ({
  shouldCloseOnOverlayClick = true,
  originalClassName = '',
  className = '',
  portalClassName = '',
  ...props
}: PropsWithChildren<ReactModalProps & ModalExtraProps>) => {
  useRef(setUpReactModal()); // ensure react modal is set up appropriately

  return (
    <ReactModal
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      portalClassName={`${className} ${portalClassName}`}
      className={originalClassName}
      {...props}
    />
  );
}

export const Modal = styled(_Modal as ModalWithoutExtraProps).attrs(props => ({
  ...props,
  closeTimeoutMS: props.closeTimeoutMS ?? 200,
  originalClassName: props.className,
}))`
  .ReactModal__Overlay {
    ${tw`fixed top-0 left-0 h-screen w-screen bg-white bg-opacity-75 grid justify-items-center items-center opacity-0 transition-opacity ease-in-out`}
    transition-duration: ${props => props.closeTimeoutMS}ms;
  }

  .ReactModal__Content {
    ${tw`ease-in-out outline-none p-4 bg-white shadow-md`}
  }

  .ReactModal__Overlay--after-open{
    ${tw`opacity-100`}
  }

  .ReactModal__Overlay--before-close{
    ${tw`opacity-0`}
  }
`;
