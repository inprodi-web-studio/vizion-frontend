const downloadPdf = async (response, name, isURL) => {
    let url;

    if (!isURL) {
        url = window.URL.createObjectURL(response);
    } else {
        url = response;
    }
    
    const a = document.createElement("a");

    a.style.display = "none";
    a.href = url;
    a.download = name || "download.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

export default downloadPdf;