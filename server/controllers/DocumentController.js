const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const Document = require('../models/DocumentModel'); // Se asume que este modelo devuelve el objeto con toda la info

// Genera un PDF con la información del apartamento y del arrendador
exports.generatePDF = (req, res) => {
const { id } = req.params;
// Obtener los datos del apartamento
Document.getApartmentById(id, (err, apartment) => {
    if (err || !apartment) {
    console.error('Error fetching apartment:', err);
    return res.status(500).send('Error generando el PDF');
    }
    console.log('Apartment:', apartment);

    // Crear el documento PDF
    const doc = new PDFDocument();

    // Configurar los headers de la respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=apartamento_${id}.pdf`);

    // Conectar el PDF con la respuesta HTTP
    doc.pipe(res);

    // Agregar contenido al PDF
    doc.fontSize(20)
    .text(`Apartamento: ${apartment.direccion_apt}`, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14)
    .text(`Barrio: ${apartment.barrio}`)
    .text(`Latitud: ${apartment.latitud_apt}`)
    .text(`Longitud: ${apartment.longitud_apt}`);
    doc.moveDown();
    
    doc.text(`Información adicional: ${apartment.info_add_apt}`);
    doc.moveDown();
    
    // Sección para la información del arrendador
    doc.fontSize(16).text('Información del arrendador:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(14)
    .text(`Nombre: ${apartment.user_name} ${apartment.user_lastname}`)
    .text(`Email: ${apartment.user_email}`)
    .text(`Teléfono: ${apartment.user_phonenumber}`);
    
    // Finalizar el PDF
    doc.end();
});
};

// Genera un Excel con la información del apartamento y del arrendador
exports.generateExcel = (req, res) => {
const { id } = req.params;
Document.getApartmentById(id, (err, apartment) => {
    if (err || !apartment) {
    console.error('Error fetching apartment:', err);
    return res.status(500).send('Error generando el Excel');
    }

    // Crear un nuevo libro de Excel y una hoja
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Apartamento');

    // Definir las columnas de la hoja
    worksheet.columns = [
    { header: 'Campo', key: 'campo', width: 30 },
    { header: 'Valor', key: 'valor', width: 50 }
    ];

    // Agregar filas con la información del apartamento
    worksheet.addRow({ campo: 'Dirección', valor: apartment.direccion_apt });
    worksheet.addRow({ campo: 'Barrio', valor: apartment.barrio });
    worksheet.addRow({ campo: 'Latitud', valor: apartment.latitud_apt });
    worksheet.addRow({ campo: 'Longitud', valor: apartment.longitud_apt });
    worksheet.addRow({ campo: 'Información adicional', valor: apartment.info_add_apt });
    worksheet.addRow({ campo: '', valor: '' }); // Fila vacía para separar secciones

    // Agregar filas con la información del arrendador
    worksheet.addRow({ campo: 'Información del arrendador', valor: '' });
    worksheet.addRow({ campo: 'Nombre', valor: `${apartment.user_name} ${apartment.user_lastname}` });
    worksheet.addRow({ campo: 'Email', valor: apartment.user_email });
    worksheet.addRow({ campo: 'Teléfono', valor: apartment.user_phonenumber });

    // Configurar los headers de la respuesta para Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=apartamento_${id}.xlsx`);

    // Escribir el libro de Excel en la respuesta
    workbook.xlsx.write(res)
    .then(() => {
        res.end();
    })
    .catch(err => {
        console.error('Error escribiendo el archivo Excel:', err);
        res.status(500).send('Error generando el Excel');
    });
});
};
