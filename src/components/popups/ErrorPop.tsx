import "./ErrorPop.css"
import Popup from "reactjs-popup"

interface ErrorPopupProps {
    open: boolean;
    status:number;
    message: string;
    onClose: () => void;
}


const ErrorPopup = ({ open, status, message, onClose }: ErrorPopupProps) => (
    <Popup open={open} closeOnDocumentClick onClose={onClose} modal>
        <div className="error-modal">
            <div className="error-content">
                <h2>Error</h2>
                <h6>"status: "+{status}</h6>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </Popup>
);
export default ErrorPopup;