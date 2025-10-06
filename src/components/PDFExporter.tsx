import { jsPDF } from 'jspdf';
import font from '../../public/fonts/NotoSans-Regular.ttf?url';

interface Site {
  name: string;
  image: string;
  region: string;
  category: string;
  description: string;
}

interface Weather {
  forecast: string;
  temperature: number;
  humidity: number;
  windSpeed: string;
}

interface PDFExporterProps {
  site: Site;
  weather: Weather;
  activities: string[];
  foods: string[];
  packingItems: string[];
}

const PDFExporter: React.FC<PDFExporterProps> = ({ site, weather, activities, foods, packingItems }) => {
  const exportToPDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      let y = 15;

      // Helper: ArrayBuffer a Base64
      const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      };

      // Registrar Noto Sans
      const fontBytes = await fetch(font).then(res => res.arrayBuffer());
      pdf.addFileToVFS('NotoSans-Regular.ttf', arrayBufferToBase64(fontBytes));
      pdf.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
      pdf.setFont('NotoSans', 'normal');

      const colors = {
        primary: { r: 4, g: 120, b: 87 },
        light: { r: 248, g: 250, b: 252 },
        dark: { r: 15, g: 23, b: 42 },
      };

      // HEADER
      pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
      pdf.rect(0, 0, pageWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.text('PachaWayra', pageWidth / 2, 13, { align: 'center' });
      y += 10;

      // IMAGEN
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = site.image;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        pdf.addImage(img, 'JPEG', 20, y, pageWidth - 40, 50, undefined, 'FAST');
        y += 58;
      } catch {
        pdf.setFillColor(colors.light.r, colors.light.g, colors.light.b);
        pdf.roundedRect(20, y, pageWidth - 40, 50, 3, 3, 'F');
        pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
        pdf.setFontSize(10);
        pdf.text('Image not available', pageWidth / 2, y + 25, { align: 'center' });
        y += 58;
      }

      // INFO BÁSICA
      pdf.setFillColor(colors.light.r, colors.light.g, colors.light.b);
      pdf.roundedRect(20, y, pageWidth - 40, 20, 3, 3, 'F');
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
      pdf.setFontSize(10);
      pdf.text(`📍 ${site.region}, Peru`, 25, y + 7);
      pdf.text(`🏷️ ${site.category}`, pageWidth / 2, y + 7, { align: 'center' });
      pdf.text(`📅 ${new Date().toLocaleDateString()}`, pageWidth - 25, y + 7, { align: 'right' });
      y += 28;

      // DESCRIPCIÓN
      pdf.setFontSize(9);
      pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
      const descriptionLines = pdf.splitTextToSize(site.description, pageWidth - 40);
      pdf.text(descriptionLines, 20, y);
      y += descriptionLines.length * 5 + 5;

      // CLIMA
      if (weather) {
        pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
        pdf.roundedRect(20, y, pageWidth - 40, 10, 3, 3, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.text('Weather Forecast', 25, y + 7);
        y += 12;

        pdf.setFillColor(colors.light.r, colors.light.g, colors.light.b);
        pdf.roundedRect(20, y, pageWidth - 40, 10, 2, 2, 'F');
        pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
        pdf.setFontSize(9);
        const weatherIcon =
          weather.forecast === 'rainy'
            ? '🌧️'
            : weather.forecast === 'cloudy'
            ? '☁️'
            : weather.forecast === 'snowy'
            ? '❄️'
            : '☀️';
        pdf.text(
          `${weatherIcon} ${weather.temperature}°C | 💧 ${weather.humidity}% | 💨 ${weather.windSpeed}`,
          25,
          y + 7
        );
        y += 18;
      }

      // LISTADOS LIMPIOS (SIN LÍNEAS NEGRAS)
      const addListSection = (title: string, items: string[], icon: string) => {
        pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
        pdf.roundedRect(20, y, pageWidth - 40, 10, 3, 3, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.text(title, 25, y + 7);
        y += 15;

        pdf.setFontSize(9);
        pdf.setTextColor(colors.dark.r, colors.dark.g, colors.dark.b);
        items.forEach(item => {
          pdf.text(`${icon} ${item}`, 25, y);
          y += 6;
        });
        y += 8;
      };

      addListSection('Recommended Activities', activities, '🎯');
      addListSection('Local Food & Drinks', foods, '🍽️');
      addListSection('Packing Guide', packingItems, '🎒');

      // FOOTER
      pdf.setFillColor(colors.primary.r, colors.primary.g, colors.primary.b);
      pdf.rect(0, 287, pageWidth, 13, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.text('Generated by PachaWayra • Happy Travels!', pageWidth / 2, 292, { align: 'center' });
      pdf.text(new Date().toLocaleDateString(), pageWidth - 15, 292, { align: 'right' });

      pdf.save(`pachawayra-${site.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={exportToPDF}
      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
    >
      <span className="font-bold text-lg">Export as PDF</span>
    </button>
  );
};

export default PDFExporter;