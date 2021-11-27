import React, { useState, useRef, useEffect } from "react";
import BookService from "../services/book.service"


export default function Home(props) {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        BookService.bookList().then(
            (data) => {
                setBookList(data)
            },
            (error) => {
                console.log(error)
            }
        )
    }, []);

    return (
        <div>
            {bookList.map((res, index) => {
                return (
                    <p key={index}>
                        {res.title} - {res.book_author}
                    </p>
                );
            })}
        </div>
    );
}