import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-bill-operation',
  templateUrl: './facture-ar-v2.component.html',
  styleUrls: ['./facture-ar-v2.component.css']
})
export class FactureArV2Component implements OnInit {

  constructor() {
  }

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
      styles: {font: 'Amiri', fontSize: 13, halign: 'right'},
      startY: 25,
      margin: {left : 220},
      columnStyles: {
        0: {cellWidth: 280, textColor: 0, cellPadding: 0},
        1: {cellWidth: 65, textColor: 0, cellPadding: 0}
      },
      body: [
        ['0878855', ': الفاتورة رقم'],
        ['02/08/2020', ': التاريخ']],
      theme: 'plain',
      tableWidth: 'wrap'
    });
    doc.addImage('assets/Images/Logowind.png', 'png', 20, 15, 50, 50);
    doc.line(30, 85, 560, 85); // horizontal line
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 14, halign: 'right'},
      startY: 100,
      margin: {left : 335},
      columnStyles: {
        0: {cellWidth: 100, textColor: 0, cellPadding: 0},
        1: {cellWidth: 100, textColor: 0, cellPadding: 0}
      },
      head: [[{content: 'الزبون', colSpan: 2, styles: {halign: 'right', fontSize: 16, cellPadding: 0, fontStyle: 'bold' }}]],
      body: [
        ['سالم', 'الاسم'],
        ['تونس', 'العنوان'],
        ['09058856', 'المعرف الوحيد']
      ],
      theme: 'plain',
    });

    autoTable(doc, {
      // styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 1},
      styles: {font: 'Amiri', fontSize: 12, halign: 'right', textColor : 1},
      // headStyles: {fillColor: [128, 128, 128]},
      startY: 250,
      columnStyles: {
        0: {cellWidth: 80},
        1: {cellWidth: 80},
        2: {cellWidth: 80},
        3: {cellWidth: 80},
        4: {cellWidth: 140},
        5: {cellWidth: 60},
      },
      headStyles: { fillColor: [102, 102, 102], textColor : [255,255,255]},
      head: [[' السعر إجمالي ', ' نسبة الخصم ', 'السعر الفردي ', 'الكمية  ', 'المنتج ', 'الكود  ']],
      body: [
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000'],
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000'],
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000'],
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000'],
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000'],
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000'],
        ['980', '800', '800', 'جيدة', 'Description', 'Ref1000']
      ],
      theme: 'striped',
      tableWidth: 'auto',

    });
    const y = (doc as any).lastAutoTable.finalY + 20;
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'right', textColor: 1},
      //  styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 2, overflow: 'linebreak'},
      // margin: {right: 375},
      startY: y,
      margin: {left: 150},
      columnStyles: {
        0: {cellWidth: 80},
        1: {cellWidth: 80, fillColor: [245, 245, 245], textColor: [0, 0, 0]}
      },
      body: [
        ['980', 'الاسم'],
        ['980', 'العنوان'],
        ['980', 'المعرف الوحيد']
      ],
      theme: 'grid',
    });
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'right', overflow: 'linebreak'},
      margin: {left: 375},
      startY: y,
      columnStyles: {
        0: {cellWidth: 80},
        1: {cellWidth: 80, fillColor: [245, 245, 245], textColor: [0, 0, 0]}
      },
      body: [
        ['980', 'الاسم'],
        ['980', 'العنوان'],
        ['980', 'المعرف الوحيد']
      ],
      theme: 'grid',
    });
    doc.setFontSize(18);
    const testText3 = ': تم إيقاف  الفاتورة عند المجموع';
    doc.text(testText3, doc.internal.pageSize.width - 30, (doc as any).lastAutoTable.finalY + 40, {align: 'right'});
    const testText4 = ': رقم خارج النطاق! دينار تونسي وخمسة مئة وثلاثة وستون مليم';
    doc.text(testText4, doc.internal.pageSize.width - 30, (doc as any).lastAutoTable.finalY + 70, {align: 'right'});

    doc.setFontSize(15);
    const testText5 = 'توقيع وختم ';
    doc.text(testText5, doc.internal.pageSize.width - 30, (doc as any).lastAutoTable.finalY + 120, {align: 'right'});
    const testText6 = 'الملاحظات';
    doc.text(testText6, doc.internal.pageSize.width / 2, (doc as any).lastAutoTable.finalY + 120, {align: 'right'});

    const pages = doc.getNumberOfPages();
    doc.setFontSize(10);
    for (let j = 1; j < pages + 1; j++) {
      doc.setPage(j);
      const str = 'العنوان الهاتف: البريد الإلكتروني:';
      doc.setFontSize(10);
      doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 25, {align: 'center'});   //key is the interal pageSize function
      doc.setDrawColor(0, 0, 0);  // draw red lines
      doc.line(30, doc.internal.pageSize.height - 35, 560, doc.internal.pageSize.height - 35); // horizontal line
      const stra = 'العنوان الهاتف: البريد الإلكتروني';
      doc.setFontSize(10);
      doc.text(stra, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, {align: 'center'});
    }
    doc.save('FactureAR_v2.pdf');
  }

}
