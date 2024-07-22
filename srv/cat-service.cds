using my.bookshop as my from '../db/data-model';

service CatalogService {
 entity Books as projection on my.Books excluding {
        createdBy,
        modifiedBy
    } actions {
        action addReview(text : String) returns String;
    };
  action submitTitle(title : String) returns String;
}
