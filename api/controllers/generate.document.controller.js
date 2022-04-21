
const pdfMakePrinter = require('pdfmake/src/printer');
var path = require('path');
//const pdf = require('html-pdf');
const image = require('./data.util')

module.exports.generate_pdf = ((req, res) => {
  let arrayStudent = req.body.students;
  let grafico = req.body.imgGraphic;
  let arrayPercentage = req.body.percentage;
  let arrayQuantity = req.body.quantity;

  arrayPercentage.reverse();
  arrayQuantity.reverse();

  //let arrayStudents = [['Nombre','Fecha inicio','Fecha termino','Resp. Correctas', 'Resp. Incorrectas', 'Resp. Omitidas', 'Porcentaje', 'Nivel de logro']]
  let arrayStudents = [['Nombre', 'Resp. Correctas', 'Resp. Incorrectas', 'Resp. Omitidas', 'Porcentaje', 'Nivel de logro']]

  arrayStudent.forEach(element => {
    //arrayStudents.push([element.nombre, element.fechaInicio, element.fechaTermino, element.respCorrectas, element.respIncorrectas, element.respOmitidas, element.porcentaje, element.nivelLogro])
    arrayStudents.push([element.nombre, element.respCorrectas, element.respIncorrectas, element.respOmitidas, element.porcentaje, element.nivelLogro])
  });

  let arrayPercentages = [];
  arrayPercentage.forEach(element => {
    arrayPercentages.push([element.level, String(element.percentage) + '%']);
    
  });

  




  let arrayQuantities = [];
  arrayQuantity.forEach(element => {
    arrayQuantities.push([element.level, String(element.quantity)])
    
  });
  
  arrayPercentages.push(['Nivel de logro', 'Porcentaje(%)']);
  arrayQuantities.push(['Nivel de logro', 'Cantidad(N)']);

  arrayPercentages.reverse();
  arrayQuantities.reverse();



  const docDefinition = {
    compress: false,
    info: {
      title: 'Informe Santillana ',
      author: 'Santillana',
      subject: 'informe santillana',
      keywords: 'informe santillana',
    },
    images: {
      santillana: image.santillana,
      graphics: grafico
    },
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    content: [
      {
        image: 'santillana',
        angle: 0,
        fit: [100, 100]


      },
      { text: 'Informe de resultados', style: 'header'},
      { text: 'Alumnos', style: 'subheader' },
      {
        layout: 'lightHorizontalLines',
        style: 'tableExample2',
        table: {
          headerRows: 1,
          body: arrayStudents
        }
      }, {
        text: '* : Alumnos que no rindieron evaluación', style: 'subheader', fontSize: 10
      },
      {
        text: ' Distribución de estudiantes según niveles de logro', style: 'subheader', pageBreak: 'before'
      },
      {
        image: 'graphics',
        fit: [500, 500]
      }, {
        text: 'Porcentaje por niveles de logros', alignment: 'center', style: 'boldSubHeader'
      },
      {
        layout: 'lightHorizontalLines',
        style: 'tableGrafico',
        widths: ['auto', 'auto'],
        table: {
          headerRows: 1,
          body: arrayPercentages
        },

      },
      {
        text: 'Cantidad de alumnos por niveles de logros', alignment: 'center', style: 'boldSubHeader'
      },
      {
        style: 'tableGrafico',
        widths: ['auto', 'auto'],
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          body: arrayQuantities
        },

      },{
        text: '** Gráfica basada en los alumnos que realizaron la evaluación', style: 'subheader', fontSize: 10
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      boldSubHeader:{
        bold: true,
        fontSize: 14
      },
      tableExample: {
        margin: [0, 5, 0, 30]
      },
      tableExample2: {
        bold: false,
        fontSize: 10,
        margin: [10, 5, 0, 15]
      },
      tableGrafico: {
        bold: false,
        fontSize: 10,
        margin: [200, 5, 0, 15]
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: 'blue',
        fillOpacity: 0.3
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };


  generatePdf(docDefinition, (response) => {
    res.send({
      data: response
    });
  });
})



module.exports.generate_pdf_graphic = ((req, res) => {
  let grafico = req.body.imgGraphic;
  let arrayPercentage = req.body.percentage;
  let arrayQuantity = req.body.quantity;

  arrayPercentage.reverse();
  arrayQuantity.reverse();
  let arrayPercentages = [];
  
  arrayPercentage.forEach(element => {
    arrayPercentages.push([element.level, String(element.percentage) + '%']);
    
  });
  arrayPercentages.push(['Nivel de logro', 'Porcentaje(%)']);
  arrayPercentages.reverse();
  

  let arrayQuantities = [];
  
  arrayQuantity.forEach(element => {
    arrayQuantities.push([element.level, String(element.quantity)])
    
  });
  arrayQuantities.push(['Nivel de logro', 'Cantidad(N)']);
  arrayQuantities.reverse()
  
  



  const docDefinition = {
    compress: false,
    info: {
      title: 'Informe Santillana Grafico',
      author: 'Santillana',
      subject: 'informe santillana',
      keywords: 'informe santillana',
    },
    images: {
      santillana: image.santillana,
      graphics: grafico
    },
    content: [
      {
        image: 'santillana',
        angle: 0,
        fit: [100, 100]


      },
      {
        text: ' Distribución de estudiantes según niveles de logro', style: 'subheader'
      },
      {
        image: 'graphics',
        fit: [500, 500]
      }, {
        text: 'Porcentaje por niveles de logros', alignment: 'center', style: 'boldSubHeader'
      },
      {
        layout: 'lightHorizontalLines',
        style: 'tableGrafico',
        widths: ['auto', 'auto'],
        table: {
          headerRows: 1,
          body: arrayPercentages
        },

      },
      {
        text: 'Cantidad de alumnos por niveles de logros', alignment: 'center', style: 'boldSubHeader'
      },
      {
        style: 'tableGrafico',
        widths: ['auto', 'auto'],
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          body: arrayQuantities
        },

      },{
        text: '** Gráfica basada en los alumnos que realizaron la evaluación', style: 'subheader', fontSize: 10
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      boldSubHeader:{
        bold: true,
        fontSize: 14
      },
      tableExample: {
        margin: [0, 5, 0, 30]
      },
      tableExample2: {
        bold: false,
        fontSize: 10,
        margin: [10, 5, 0, 15]
      },
      tableGrafico: {
        bold: false,
        fontSize: 10,
        margin: [200, 5, 0, 15]
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: 'blue',
        fillOpacity: 0.3
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };


  generatePdf(docDefinition, (response) => {
    res.send({
      data: response
    });
  });
})

function generatePdf(docDefinition, callback) {
  try {
    const fontDescriptors = {
      Roboto: {
        normal: path.join(__dirname, '../..', 'public', '/fonts/Calibri.ttf'),
        bold: path.join(__dirname, '../..', 'public', '/fonts/CALIBRIB.TTF'),
        italics: path.join(__dirname, '../..', 'public', '/fonts/CALIBRII.TTF'),
        bolditalics: path.join(__dirname, '../..', 'public', '/fonts/CALIBRIZ.TTF')
      }
    }

    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      //callback('data:application/pdf;base64,' + result.toString('base64'));
      callback(result.toString('base64'));
      //callback(Buffer.concat(chunks));
    });

    doc.end();

  } catch (err) {
    throw (err);
  }
};

// Metodo permite generar PDF pero hay que revisar el css
// module.exports.generate_pdfs = ((req, res) => {

//   let config = {

//     "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
//     "orientation": "landscape", // portrait or landscape

//     // Page options
//     "border": {
//       "top": "2in",            // default is 0, units: mm, cm, in, px
//       "right": "1in",
//       "bottom": "2in",
//       "left": "1.5in"
//     },             // default is 0, units: mm, cm, in, px


//     paginationOffset: 1,       // Override the initial pagination number
//     "header": {
//       "height": "45mm",
//       "contents": '<div style="text-align: center;">Author: Santillana</div>'
//     }

//   }

//   let arrayStudent = req.body.students;
//   let grafico = req.body.imgGraphic;
//   let arrayPercentage = req.body.percentage;
//   let arrayQuantity = req.body.quantity;

//   let tableStudent = tableStudents();
//   let tableInformation = informationProccesed()



//   let content = `
//   <!doctype html>
//       <html>
//          <head>
//               <meta charset="utf-8">
//               <title>Reporte Pleno</title>
//               <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
//           </head>
//           <body style="width: 30%">
//               <h1>Informe Santillana Pleno</h1>
//               <p>Alumnos</p>
//               ${tableStudent}
//               <h2>Datos procesados</h2>
//               <h4>Gr&aacute;fico por niveles de logro</h4>
//               <img src="${grafico}" height="500px" width="500px" alt="Red dot"/>
//               ${tableInformation}
//             </body>
//       </html>`;




//     pdf.create(content, config).toBuffer(function(err, buffer){

//       res.json({
//         data: buffer.toString('base64')
//       })
//     })


//   function tableStudents(){
//       let table = String('')
//       arrayStudent.forEach(element => {
//           table = table.concat(`<tr>
//           <td>${element.nombre}</td>
//           <td>${element.fechaInicio}</td>
//           <td>${element.fechaTermino}</td>
//           <td>${element.respCorrectas}</td>
//           <td>${element.respIncorrectas}</td>
//           <td>${element.respOmitidas}</td>
//           <td>${element.porcentaje}%</td>
//           <td>${element.nivelLogro}</td>
//         </tr>`)
//       });

//       let tableStudent = `<table table class="table table-bordered table-sm" table-responsive  style="margin: 0 auto">
//       <thead>
//         <th>Nombre</th>
//         <th>Fecha Inicio</th>
//         <th>Fecha Termino</th>
//         <th>Respuestas correctas</th>
//         <th>Respuestas incorrectas</th>
//         <th>Respuestas omitidas</th>
//         <th>Porcentaje</th>
//         <th>Nivel de logro</th>
//       </thead>
//       <tbody>
//         ${table}
//       </tbody>
//     </table>
//     <span>* Alumnos que no rindieron la evaluaci&oacute;n</span>`;

//     return tableStudent;
//   }


//   function informationProccesed(){
//           let informationPercentage = String('');
//           arrayPercentage.forEach(element => {
//               informationPercentage = informationPercentage.concat(`
//                     <tr>
//                       <td>${element.level}(%)</td>
//                       <td>${element.percentage}%</td>
//                     </tr>
//               `)
//           })

//           let informationQuantity = String('');
//           arrayQuantity.forEach(element => {
//              informationQuantity = informationQuantity.concat(
//                   `<tr>
//                       <td>${element.level}(N)</td>
//                       <td>${element.quantity}</td>
//                   </tr>`)
//           })

//           let tableInformation = `                        
//           <table class="table table-bordered" id="tblInfografia" table-responsive>
//           <tbody>
//             ${informationPercentage}
//             <tr><td colspan="2"></td></tr>
//             ${informationQuantity}
//           </tbody>
//         </table>`;

//         return tableInformation;

//   }



//   // let arrayStudent = req.body.students;
//   // let grafico = req.body.imgGraphic;
//   // let arrayPercentage = req.body.percentage;
//   // let arrayQuantity = req.body.quantity;

//   // const htmlStudent = 

//   // function createPdfs(reporteHtml){

//   // }


// });




