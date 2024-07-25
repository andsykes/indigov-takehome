# Running the server
to run the server, from within the `constituent-management-service` directory, run:
```npm start```

# Visitng homepage
http://localhost:3000/

# Adding constituents
There's no UI (yet) to Add, so simply use curl:

```curl -X POST http://localhost:3000/constituents/add -H "Content-Type: application/json" -d '{"firstName":"Andrew", "lastName": "Sykes", "address": "123 fake st", "email": "andrew@yes.com"}'```

# List Constituents
Use the link on the homepage, or visit http://localhost:3000/constituents

# Export Constituents
Use the link on the homepage, or visit http://localhost:3000/constituents/export
