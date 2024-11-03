'use client'
// React
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalRoot = useRef(typeof document !== 'undefined' ? document.getElementById('modal-root') || document.createElement('div') : null)

    useEffect(() => {
        const root = modalRoot.current
        if (root && typeof document !== 'undefined') {
            document.body.appendChild(root)
            return () => {
                document.body.removeChild(root)
            }
        }
    }, [])

    return isOpen && modalRoot.current
        ? ReactDOM.createPortal(
            <div className={'fixed overflow-y-scroll lg:no-scrollbar z-[999] top-0 left-0 h-screen w-screen bg-primary-dark-gray/20'} onClick={onClose}>
                <div className='flex overflow-y-scrollbar items-center justify-center w-full lg:h-full' onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>,
            modalRoot.current
        )
        : null
}

export default Modal
