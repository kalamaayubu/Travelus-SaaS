import html2canvas from "html2canvas-pro";

export const saveTicketAsImage = async (
  element: HTMLElement,
  ticketNumber?: string,
) => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: "#0F1115", // Matches your soft-dark theme
      scale: 3, // High DPI for scanning
      logging: false,
      useCORS: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = image;
    link.download = `SafariBridge-${ticketNumber}.png`;
    link.click();
    return true;
  } catch (err) {
    console.error("Download failed", err);
    return false;
  }
};
