const Loader = ({ text = "Loading...", fullPage = false }) => {
    return (
        <div className={`loader-wrapper ${fullPage ? "full-page" : ""}`.trim()}>
            <div className="loader-spinner" aria-hidden="true" />
            {text && <span>{text}</span>}
        </div>
    );
};

export default Loader;