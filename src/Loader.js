const Loader = () =>
{
    const style = ".spinner {\n" +
        "  width: 40px;\n" +
        "  height: 40px;\n" +
        "\n" +
        "  position: relative;\n" +
        "  margin: 100px auto;\n" +
        "}\n" +
        "\n" +
        ".double-bounce1, .double-bounce2 {\n" +
        "  width: 100%;\n" +
        "  height: 100%;\n" +
        "  border-radius: 50%;\n" +
        "  background-color: #212223;\n" +
        "  opacity: 0.6;\n" +
        "  position: absolute;\n" +
        "  top: 0;\n" +
        "  left: 0;\n" +
        "  \n" +
        "  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n" +
        "  animation: sk-bounce 2.0s infinite ease-in-out;\n" +
        "}\n" +
        "\n" +
        ".double-bounce2 {\n" +
        "  -webkit-animation-delay: -1.0s;\n" +
        "  animation-delay: -1.0s;\n" +
        "}\n" +
        "\n" +
        "@-webkit-keyframes sk-bounce {\n" +
        "  0%, 100% { -webkit-transform: scale(0.0) }\n" +
        "  50% { -webkit-transform: scale(1.0) }\n" +
        "}\n" +
        "\n" +
        "@keyframes sk-bounce {\n" +
        "  0%, 100% { \n" +
        "    transform: scale(0.0);\n" +
        "    -webkit-transform: scale(0.0);\n" +
        "  } 50% { \n" +
        "    transform: scale(1.0);\n" +
        "    -webkit-transform: scale(1.0);\n" +
        "  }\n" +
        "}"
    return (
        <div
            className="spinner_container"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
                <style>{style}</style>
            </div>
        </div>
    )
}

export default Loader