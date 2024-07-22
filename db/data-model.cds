namespace my.bookshop;
using cuid from '@sap/cds/common';
using managed from '@sap/cds/common';

entity Books : cuid, managed {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}