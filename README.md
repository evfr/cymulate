1. create a few users with "http://localhost:3000/signup" POST comm.
    body for example: {
        "id": 1861,
        "name": "u4",
        "pass": "pass4",
        "email": "c@v.com",
    }

2. then sign in with a user to get a token "http://localhost:3000/login", you'll receive a jwt:
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0OCwibmFtZSI6InUyIiwiZW1haWwiOiJlQHYuY29tIiwicGFzcyI6IiJ9LCJpYXQiOjE2ODg5MDYyOTQsImV4cCI6MTY4ODk5MjY5NH0.JLaIenowf-8_IdAACfnYj5pftGKcH2PFlOLYwUSn6LU"
    }

    add this token to every request that requires authentication:
    request headers should look like this:
        Authorization - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0OCwibmFtZSI6InUyIiwiZW1haWwiOiJlQHYuY29tIiwicGFzcyI6IiJ9LCJpYXQiOjE2ODg5MDYyOTQsImV4cCI6MTY4ODk5MjY5NH0.JLaIenowf-8_IdAACfnYj5pftGKcH2PFlOLYwUSn6LU

3. to get all users run GET "http://localhost:3000/users" (requires authorization token)
4. to get specific user details run GET "http://localhost:3000/:id" (requires authorization token)
5. to get user posts run GET "http://localhost:3000/posts" (requires authorization token)
6. to get friends posts run GET "http://localhost:3000/posts/friends" (requires authorization token)
7. to add a post run POST "http://localhost:3000/posts" (requires authorization token)
    body for example:
    {  
        "text": "post111"
    }

8. to update your own post run PUT "http://localhost:3000/posts/:id" (requires authorization token)
    body for example:
    {  
        "text": "post111"
    }
9. to delete your own post run DELETE "http://localhost:3000/posts/:id" (requires authorization token)
10. to send a friend request run POST "http://localhost:3000/friends/request"
    body for example:
    {  
        "friendId": 1861
    }
11. to accept a friend request run POST "http://localhost:3000/friends/accept"
    body for example:
    {  
        "friendId": 1861
    }

12. to reject a friend request run POST "http://localhost:3000/friends/reject"
    body for example:
    {  
        "friendId": 1861
    }


13. to get a list of the user's friends run GET "http://localhost:3000/friends"

14. example of GET list of users:
curl --location --request GET 'http://localhost:3000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0OCwibmFtZSI6InUyIiwiZW1haWwiOiJlQHYuY29tIiwicGFzcyI6IiJ9LCJpYXQiOjE2ODg5MDYyOTQsImV4cCI6MTY4ODk5MjY5NH0.JLaIenowf-8_IdAACfnYj5pftGKcH2PFlOLYwUSn6LU' \
--data-raw ''

15. example of POST signup:
curl --location --request POST 'http://localhost:3000/signup' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "name": "u4",
    "pass": "pass4",
    "email": "c@v.com"
 }'

 16. example of login
curl --location --request POST 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "name": "u2",
    "pass": "pass2"
 }'

 17. example of DELETE post:
 curl --location --request DELETE 'http://localhost:3000/posts/7347' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0OCwibmFtZSI6InUyIiwiZW1haWwiOiJlQHYuY29tIiwicGFzcyI6IiJ9LCJpYXQiOjE2ODg5MDYyOTQsImV4cCI6MTY4ODk5MjY5NH0.JLaIenowf-8_IdAACfnYj5pftGKcH2PFlOLYwUSn6LU' \
--data-raw ''