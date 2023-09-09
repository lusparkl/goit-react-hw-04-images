import { ModalWindow, Overlay } from "./Modal.styled";
import { Component } from "react";

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            this.props.modalClose();
        }
    };

    render() {
        const { modalInfo, modalClose } = this.props;

        return (
            <Overlay onClick={(e) => { if (e.target === e.currentTarget) modalClose() }}>
                <ModalWindow>
                    <img src={modalInfo.largeImageURL} alt={modalInfo.tags} />
                </ModalWindow>
            </Overlay>
        );
    }
}
