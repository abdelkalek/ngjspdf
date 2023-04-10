import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-facture-frv2',
  templateUrl: './facture-frv2.component.html',
  styleUrls: ['./facture-frv2.component.css']
})
export class FactureFrv2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public openPDF(): void {
    const font = environment.fontA;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addFileToVFS('Amiri-Regular.ttf', font);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri'); // set font
    doc.setFontSize(18);
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 13, halign: 'left'},
      startY: 25,
      columnStyles: {
        0: {cellWidth: 50, textColor: 0, cellPadding: 0},
        1: {cellWidth: 65, textColor: 0, cellPadding: 0}
      },
      body: [
        ['Facture N° :', '2021/00002'],
        ['Date :', '2021/06/11']],
      theme: 'plain',
      tableWidth: 'wrap'
    });
    doc.addImage('assets/Images/Logowind.png', 'png', doc.internal.pageSize.width - 120, 15, 50, 50);
    doc.line(30, 85, 560, 85); // horizontal line
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 14, halign: 'left'},
      startY: 100,
      margin: {left : 50},
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      columnStyles: {
        0: {cellWidth: 120, textColor: 0},
        1: {cellWidth: 110, textColor: 0}
      },
      head: [[{content: 'Fournisseur', colSpan: 2, styles: {halign: 'center'}}]],
      body: [
        ['Nom', 'Abdelkhalek Guedri'],
        ['Adresse', 'Mahdia'],
        ['CIN', '14214937']
      ],
      theme: 'striped',
    });

    autoTable(doc, {
      // styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 1},
      styles: {font: 'Amiri', fontSize: 12, halign: 'right', textColor : 1},
      // headStyles: {fillColor: [128, 128, 128]},
      startY: 250,
      columnStyles: {
        0: {cellWidth: 40},
        1: {cellWidth: 80},
        2: {cellWidth: 80},
        3: {cellWidth: 80},
        4: {cellWidth: 80},
        5: {cellWidth: 80},
      },
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      head: [['Code ', 'Désignation ', 'Quantité ', 'P.U  ', 'Remise ', 'TVA  ', 'Total HT']],
      body: [
        ['120 ', 'Iphone ', '250 ', '200  ', '20% ', '7  %', '45'],
        ['120 ', 'Iphone ', '250 ', '200  ', '20% ', '7  %', '45'],
        ['120 ', 'Iphone ', '250 ', '200  ', '20% ', '7  %', '45'],
        ['120 ', 'Iphone ', '250 ', '200  ', '20% ', '7  %', '45']
      ],
      theme: 'striped',
      tableWidth: 'auto',

    });
    const y = (doc as any).lastAutoTable.finalY + 20;
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'left', overflow: 'linebreak'},
      margin: {left: 375},
      startY: y,
      columnStyles: {
        0: {cellWidth: 80, fillColor: [245, 245, 245], textColor: [0, 0, 0]},
        1: {cellWidth: 80}
      },
      body: [
        ['Total HT', '500'],
        ['Total TVA', '200,000'],
        ['Total TTC', '500,000'],
        ['TIMBRE FISCAL', '500,000'],
        ['NET À PAYER', '200,000']
      ],
      theme: 'grid',
    });
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'left', textColor: 1},
      //  styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 2, overflow: 'linebreak'},
      // margin: {right: 375},
      startY: y,
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      margin: {left: 50},
      columnStyles: {
        0: {cellWidth: 40},
        1: {cellWidth: 80, },
        2: {cellWidth: 80, }
      },
      head: [['', 'Base TVA', 'Total TVA']],
      body: [
        ['100%', '4', '2000'],
        ['7%', '57', '2500'],
        ['4%', '57', '3400'],
        ['2%', '360', '1500'],
        ['7%', '75', '1400']],
      theme: 'grid',
    });
    doc.setFontSize(13);
    const testText3 = 'ARRÊTER LA PRÉSENTE FACTURE À LA SOMME :\n' +
      'NUMBER OUT OF RANGE! DINAR TUNISIEN ET CINQ CENT ET SOIXANTE-TROIX MILLIMES';
    doc.text(testText3, 25, (doc as any).lastAutoTable.finalY + 40, {align: 'left'});
    doc.setFontSize(15);
    const testText5 = 'Signature et cachet  ';
    doc.text(testText5, 25, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
    const testText6 = 'Notes';
    doc.text(testText6, doc.internal.pageSize.width / 2, (doc as any).lastAutoTable.finalY + 120, {align: 'left'});
    const pages = doc.getNumberOfPages();
    doc.setFontSize(10);
    for (let j = 1; j < pages + 1; j++) {
      doc.setPage(j);
      const str = ' Bir El Hafey 5136 - SidiBouzid, TUNISIE - Téléphone: 21 828 389 - E-mail: abdelkalek@gmail.com';
      doc.setFontSize(10);
      doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 25, {align: 'center'});   //key is the interal pageSize function
      doc.setDrawColor(0, 0, 0);  // draw red lines
      doc.line(30, doc.internal.pageSize.height - 35, 560, doc.internal.pageSize.height - 35); // horizontal line
      const stra = 'au Capital: - C.D: -Code TVA: 1234567/M/A/B/000';
      doc.setFontSize(10);
      doc.text(stra, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, {align: 'center'});
    }
    doc.save('FacturefR_v2.pdf');
  }
}
