import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-facrute-fr',
  templateUrl: './facrute-fr.component.html',
  styleUrls: ['./facrute-fr.component.css']
})
export class FacruteFrComponent implements OnInit {

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
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 11},
      startY: 25,
      margin: {left: 15},
      columnStyles: {
        0: {cellWidth: 40, textColor: 0, cellPadding: 0},
        1: {cellWidth: 150, textColor: 0, cellPadding: 0,}
      },

      body: [
        ['Société :', 'MapsIt'],
        ['Matricule :', 'Mat008001245893558959963 '],
        ['Téléphone :', '70445266'],
        ['Adresse :', 'Monastir skanes ']],
      theme: 'plain',
      tableWidth: 'wrap'
    });
    const testText1 = 'Liste des factures';
    doc.setFontSize(24);
    doc.text(testText1, doc.internal.pageSize.width / 2 + 70, (doc as any).lastAutoTable.finalY + 25, {align: 'right'});
    doc.addImage('assets/Images/Logowind.png', 'png', doc.internal.pageSize.width - 120, 15, 50, 50);
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12},
      headStyles: {fillColor: [102, 102, 102]},
      bodyStyles: {textColor: [0, 0, 0]},
      startY: 120,
      columnStyles: {
        0: {cellWidth: 100},
        1: {cellWidth: 80},
        2: {cellWidth: 80},
        3: {cellWidth: 80},
        4: {cellWidth: 80},
        5: {cellWidth: 80},
      },
      head: [[' Fournisseur', ' Référence', 'Date ', 'État ', 'Total HT ', 'Total TTC ']],
      body: [
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Brouillon', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Validée', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Validée', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Brouillon', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Validée', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Brouillon', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Validée', '500', '560'],
        [' Domino\'s Pizza ', 'REF100', '02/05/2021', 'Validée', '500', '560']
      ],
      theme: 'striped',
      tableWidth: 'auto',
    });
    autoTable(doc, {
      styles: {font: 'Amiri', fontSize: 12},
      // startY: 450,
      showHead: 'never',
      margin: {
        left: 40
      },
      columnStyles: {
        0: {cellWidth: 160, fillColor: [245, 245, 245], textColor: [0, 0, 0]},
        1: {cellWidth: 160, textColor: [40, 40, 40]}
      },

      body: [
        ['Qté Réelle', '1200'],
        [' Total HT ', '20.0'],
        ['Total TVA', '40.25'],
        ['Total TTC', '452.054']
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
      doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10);   //key is the interal pageSize function
      const str1 = 'Utilisateur :  Nadi Belgassem , E-mail : MapsIt@topnet.tn ' + ', date d\'impression :' + day;
      doc.setFontSize(14);
      doc.text(str1, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, {align: 'center'});   //key is the interal pageSize function
    }
    // doc.autoPrint({variant: 'non-conform'}),
    doc.save('factureFr.pdf');
  }

}
