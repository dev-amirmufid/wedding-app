const ScrollScreen = (props) => {
    return (
        <div
            className={`${
                !props?.height ? "h-[calc(100vh-210px)]" : ""
            } overflow-auto ${props?.className}`}
            style={{
                height: props.height,
            }}
        >
            {props.children}
        </div>
    );
};

export default ScrollScreen;
