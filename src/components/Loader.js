/**
 * Module to display loading.
 * @returns JSX UI
 */
export default function Loader(props) {
    return (
        <>
            {(props.show) ?
                <div className="text-center">
                    <i>...loading data...</i>
                    <br/>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                </div> : ''
            }
        </>
    );
}
