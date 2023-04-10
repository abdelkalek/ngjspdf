import {Component, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './facture-ar.component.html',
  styleUrls: ['./facture-ar.component.css']
})
export class FactureArComponent implements OnInit {

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
    doc.addImage('assets/Images/Logowind.png', 'png', 20, 15, 50, 50);
    doc.setLanguage('ar-SA');
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 11, halign: 'right'},
      startY: 25,
      margin: {left : 200},
      columnStyles: {
        0: {cellWidth: 280, textColor: 0, cellPadding: 0},
        1: {cellWidth: 65, textColor: 0, cellPadding: 0}
      },
      body: [
        ['الشركة التونسية للكهرباء و الغاز', ':الشركة'],
        ['0000120335', ': رقم التسجيل'],
        ['73 221 544', ' : رقم الهاتف'],
        ['38 نهج كمال أتاتورك - 1080 تونس', ': العنوان']
     ],
      theme: 'plain',
      tableWidth: 'wrap'
    });
    const testText1 = 'قائمة الفواتير';
    doc.setFontSize(24);
    doc.text(testText1, doc.internal.pageSize.width / 2, (doc as any).lastAutoTable.finalY + 25, {align: 'center'});   //key is the interal pageSize function
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'right'},
      startY: (doc as any).lastAutoTable.finalY + 70,
      headStyles: {fillColor: [102, 102, 102]},
      bodyStyles: {textColor: [0, 0, 0]},
      columnStyles: {
        0: {cellWidth: 100},
        1: {cellWidth: 80},
        2: {cellWidth: 80},
        3: {cellWidth: 80},
        4: {cellWidth: 80},
        5: {cellWidth: 80},
      },
      head: [[' TTC إجمالي ', ' HT إجمالي  ', 'الحالة ', 'التاريخ ', 'المرجع ', 'المزود ']],
      body: [
        ['980', '800', 'جيدة', '2021-06-14', 'Ref1000', 'سليمان'],
        ['980', '800', 'جيدة', '2021-06-14', 'Ref1000', 'سامي'],
        ['980', '800', 'متوسطة', '2021-06-14', 'Ref1000', 'يوسف'],
        ['980', '800', 'جيدة', '2021-06-14', 'Ref1000', 'آدم'],
        ['980', '800', 'متوسطة', '2021-06-14', 'Ref1000', 'أيّوب'],
        ['980', '800', 'متوسطة', '2021-06-14', 'Ref1000', 'حمزه '],
        ['980', '800', 'متوسطة', '2021-06-14', 'Ref1000', 'بسام '],
        ['980', '800', 'متوسطة', '2021-06-14', 'Ref1000', 'مراون '],
        ['980', '800', 'مسودة', '2021-06-14', 'Ref1000', 'تامر '],
        ['980', '800', 'مسودة', '2021-06-14', 'Ref1000', 'زهير ']
      ],
      theme: 'striped',
      tableWidth: 'auto',

    });
    doc.setLanguage('ar');
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12, halign: 'right', overflow: 'linebreak'},
      margin: {
        left: 375
      },
      columnStyles: {
        0: {cellWidth: 80},
        1: {cellWidth: 80, fillColor: [245, 245, 245], textColor: [0, 0, 0]}
      },
      body: [
        ['100', 'الكمية الفعلية'],
        ['7000', 'HT إجمالي '],
        ['5400', 'TVA إجمالي '],
        ['3000', 'TTC إجمالي ']
      ],
      theme: 'grid',
    });
    const pages = doc.getNumberOfPages();
    doc.setFontSize(10);
    for (let j = 1; j < pages + 1; j++) {
      doc.setPage(j);
      // ['E-mail', 'MapsIt@topnet.tn'],
      //   ['Utilisateur', 'Nadi '],
      //   ['Date', '02/09/2020 ']
      const str = j.toString() + ' / ' + pages;
      doc.setFontSize(14);
      const currentDate = new Date();
// ('00' + this.editForm.get(['dueDate'])!.value.month).slice(-2)
      const day = currentDate.getFullYear() + '/' + ('00' + (currentDate.getMonth() + 1)).slice(-2) + '/' +
        ('00' + (currentDate.getDate())).slice(-2) + ' - ' + ('00' + (currentDate.getHours())).slice(-2) +
        ':' + ('00' + (currentDate.getMinutes())).slice(-2) + ':'
        + ('00' + (currentDate.getSeconds())).slice(-2);
      doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 11);   //key is the interal pageSize function
      const str1 = 'المستخدم:عبدالخالق ، البريد الإلكتروني:  , تاريخ الطباعة :' + day;
      doc.processArabic(str1);
      doc.setFontSize(14);
      doc.text(str1, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 24, {align: 'center'});   //key is the interal pageSize function
    }
    // doc.autoPrint({variant: 'non-conform'}),
    doc.save('factureAr.pdf');
  }
}
