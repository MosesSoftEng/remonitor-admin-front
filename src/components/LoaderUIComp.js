/**
 * Module to display loading.
 * @returns JSX UI
 */
export default function LoaderUIComp(props) {
    return (
        <>
            {(props.show) ?
                <div className="text-center">
                    loading...
                </div> : ''
            }
        </>
    );
}
