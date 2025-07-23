const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCVPDF() {
  console.log('Starting CV PDF generation...');

  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Read HTML file
    const htmlPath = path.join(__dirname, '..', 'static', 'cv-formal.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Set page content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    const pdfPath = path.join(__dirname, '..', 'static', 'sugeng_sulistiyawan_resume.pdf');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    console.log(`✅ CV PDF generated successfully: ${pdfPath}`);

    // Copy to public directory if it exists
    const publicPdfPath = path.join(__dirname, '..', 'public', 'sugeng_sulistiyawan_resume.pdf');
    if (fs.existsSync(path.dirname(publicPdfPath))) {
      fs.copyFileSync(pdfPath, publicPdfPath);
      console.log(`✅ PDF copied to public directory: ${publicPdfPath}`);
    }

  } catch (error) {
    console.error('❌ Error generating CV PDF:', error);
    process.exit(1);
  }
}

// Run the function
generateCVPDF();
