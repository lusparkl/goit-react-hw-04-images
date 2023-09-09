import { ModalWindow, Overlay } from "./Modal.styled";
import { useEffect } from "react";

export const Modal = ({ modalInfo, modalClose }) => {


    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [])


    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            this.props.modalClose();
        }
    };


    return (
        <Overlay onClick={(e) => { if (e.target === e.currentTarget) modalClose() }}>
            <ModalWindow>
                <img src={modalInfo.largeImageURL} alt={modalInfo.tags} />
            </ModalWindow>
        </Overlay>
    );
}

