console.log("cc");
//Book class : Represents a book
 class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
 }


//UI class : Handle UI Tasks
class UI{
    static displayBooks(){
    
        const books = Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list= document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML=
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
static showAlert(message,className){
    const div = document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container =document.querySelector('.container')
    const form=document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(()=>document.querySelector('.alert').remove(),3000)
}
    static clearFields(){
        document.querySelector('#title')='';
        document.querySelector('#author')='';
        document.querySelector('#isbn')='';
    }
}


//Store Class : Handles Storages
class Store{
    static getBooks(){
   let books;
   if (localStorage.getItem('books')===null){
    books=[];
   } else{
    books= JSON.parse(localStorage.getItem('books'));
   }
   return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
        
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn=== isbn){
                books.splice(index,1)
            }
        });
        localStorage.setItem('books' ,JSON.stringify(books));
    }
}


//Events: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);


//Events: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e) => 
{
    //prevent action submit
    e.preventDefault();


    //Get form Value
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    //Validation
 if(title===''|| author==='' || isbn ===''){
     UI.showAlert('Please fill in all fields','danger');
 }else{

     //Instatiation Book
    
     const book = new Book(title,author,isbn);
   
     //Add book to UI
     UI.addBookToList(book);
     //Add book to store
     Store.addBook(book);
     //Show success message
UI.showAlert('Book Added','success')

     //Clear fields
     UI.clearFields();
 }
    });
 



//Event:Remove a Book
document.querySelector('#book-list').addEventListener('click',(e) => 
{
    //Remove book from UI

UI.deleteBook(e.target);

    //Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

//ShowAlert message
UI.showAlert('Book Remove','success')
});