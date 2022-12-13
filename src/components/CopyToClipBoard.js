/**
 * Module to text copy to clipboard
 * @returns JSX UI
 */
export default function CopyToClipBoard(props) {
    const copyToClipBoard = function (text) {
        console.log(text);
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <button className="btn btn-sm" onClick={function () { copyToClipBoard(props.textToCopy) }}>
                <i className="bi bi-clipboard-plus"></i>
            </button>
        </>
    );
}
