const express = require('express');
const cors = require('cors');
const { matchedData, validationResult, body } = require('express-validator');

const app = express();
app.use(cors(
    // {
    //     origin: [""],
    //     methods: ["POST","GET"],
    //     credentials: true
    // }
));
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Ticket Trip Book')
})

app.post('/', 
    [
        body("fullName")
            .isString()
            .withMessage("Name must be alphabet")
            .notEmpty()
            .withMessage("Name can't be empty"),
        body("phoneNumber")
            .isLength({ min:12, max: 14 })
            .withMessage("Phone Number must between 12-14 characters")
            .isNumeric()
            .withMessage("Phone Number must be number")
            .notEmpty()
            .withMessage("Phone Number can't be empty"),
        body("email")
            .isEmail()
            .withMessage("Email must contain @email.com")
            .notEmpty()
            .withMessage("Email can't be empty"),
        body("departure")
            .notEmpty()
            .withMessage("Departure can't be empty"),
        body("arrival")
            .notEmpty()
            .withMessage("Arrival can't be empty"),
        body("passengers")
            .isNumeric()
            .withMessage("Passengers must be number")
            .notEmpty()
            .withMessage("Passengers Date can't be empty"),
        body("date")
            .notEmpty()
            .withMessage("Date can't be empty"),
    ],
    (req, res) => {
        const result = validationResult(req);
        console.log(result);

        if (!result.isEmpty()) {
            return res.status(400).json({ status: 400, message: "Data not full fill yet", errors: result.array() });
          }

        const data = matchedData(req);
        console.log(data);
    res.status(201).json({ status: 201, message: "Data added", data: data });
})

app.listen(port, () => {
  console.log(`app listening on localhost:${port}`)
})
