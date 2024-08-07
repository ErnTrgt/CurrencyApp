import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    InputLabel,
    FormControl,
    Box,
    Paper,
} from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

function Currency() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState("");

    let token = "fca_live_FXhn90pUyFbfVTdrOWM2D7FM3b9wcfnXrzIYN0tO";
    let baseUrl = "https://api.freecurrencyapi.com/v1/latest";

    const exchange = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}?apikey=${token}&base_currency=${fromCurrency}`
            );
            const result = (response.data.data[toCurrency] * amount).toFixed(2);
            setResult(result);
        } catch (error) {
            console.error("An error occurred: ", error);
            setResult("An error occurred");
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const currencies = [
        { code: "USD", symbol: "$" },
        { code: "EUR", symbol: "€" },
        { code: "TRY", symbol: "₺" },
        { code: "GBP", symbol: "£" },
        { code: "JPY", symbol: "¥" },
        { code: "AUD", symbol: "A$" },
        { code: "CAD", symbol: "C$" },
        { code: "CHF", symbol: "CHF" },
        { code: "CNY", symbol: "¥" },
        { code: "SEK", symbol: "kr" },
        { code: "NZD", symbol: "NZ$" },
    ];

    return (
        <Container
            maxWidth='lg'
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                    borderRadius: "15px",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    width: "90%",
                    maxWidth: "600px",
                }}
            >
                <Typography variant='h4' gutterBottom>
                    Currency Exchange Application
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                        marginBottom: 2,
                    }}
                >
                    <TextField
                        label='Amount'
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        variant='outlined'
                        size='medium'
                        sx={{ width: "132px" }}
                    />
                    <FormControl size='medium' sx={{ width: "132px" }}>
                        {" "}
                        <InputLabel>From</InputLabel>
                        <Select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            label='From Currency'
                        >
                            {currencies.map((currency) => (
                                <MenuItem
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} - {currency.symbol}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FaArrowRight
                        style={{ cursor: "pointer", fontSize: "24px" }}
                        onClick={swapCurrencies}
                    />
                    <FormControl size='medium' sx={{ width: "132px" }}>
                        {" "}
                        <InputLabel>To</InputLabel>
                        <Select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            label='To Currency'
                        >
                            {currencies.map((currency) => (
                                <MenuItem
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code} - {currency.symbol}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label='Result'
                        value={result}
                        variant='outlined'
                        size='medium'
                        InputProps={{ readOnly: true }}
                        sx={{ width: "132px" }}
                    />
                </Box>

                <Button
                    variant='contained'
                    color='success'
                    onClick={exchange}
                    sx={{
                        marginTop: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                        },
                        "&:active": {
                            transform: "scale(0.98)",
                        },
                    }}
                >
                    Convert
                </Button>
                <hr />
                <Typography variant='h5' gutterBottom>
                    ERNTRGT
                </Typography>
            </Paper>
        </Container>
    );
}

export default Currency;
