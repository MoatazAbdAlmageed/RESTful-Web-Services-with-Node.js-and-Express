## import db

- `mongo bookAPI < bookData.js`
- Windows `mongoimport --db bookAPI --collection books <bookData.json --jsonArray`

## queires

- `http://localhost:4000/api/books?read=true&title=five&d=d`
- `http://localhost:4000/api/books/5e9ab42497a12f65d872d663`
